import {
  trip as primaryTrip,
  tripStatus,
  checkInWindow,
  countdownTo,
  documentsRequired,
  documentComplete,
  outstandingCount,
  refundStages,
  type Trip,
  type TripStatus,
} from './trip';

/**
 * Trips is the layer above a single itinerary. It holds every booking and,
 * more importantly, works out the one thing worth doing next on each — the
 * "assistance" that turns a passive list into something that moves the
 * traveller forward.
 */

const HOUR = 3600_000;
const DAY = 24 * HOUR;

function iso(offsetMs: number) {
  return new Date(Date.now() + offsetMs).toISOString();
}

// ─── A second and third trip at other lifecycle stages ───

/** A domestic hop three weeks out — nothing to do yet. */
const upcomingTrip: Trip = {
  pnr: 'H8M3Q1',
  bookedOn: iso(-2 * DAY),
  fareName: 'Economy',
  totalPaid: 8900,
  currency: '₹',
  contactEmail: 'ramesh@example.com',
  contactPhone: '+91 98100 12345',
  separateTickets: false,
  baggageTagged: false,
  services: [],
  documents: [],
  payments: [
    {
      id: 'pay1',
      label: 'Flights · 1 traveller',
      amount: 8900,
      method: 'UPI',
      at: iso(-2 * DAY),
      status: 'paid',
      lines: [
        { label: 'Base fare', amount: 6800 },
        { label: 'Taxes and fees', amount: 1500 },
        { label: 'Convenience fee', amount: 600 },
      ],
    },
  ],
  segments: [
    {
      marketingFlight: 'AI 806',
      marketingCarrier: 'Air India',
      marketingCode: 'AI',
      carrierColor: '#CD2C2C',
      origin: 'DEL',
      originCity: 'New Delhi',
      originTerminal: 'T3',
      destination: 'BLR',
      destinationCity: 'Bengaluru',
      destinationTerminal: 'T1',
      departISO: iso(22 * DAY),
      arriveISO: iso(22 * DAY + 155 * 60_000),
      durationMin: 155,
      aircraft: 'Airbus A320neo',
      cabin: 'Economy',
      gate: null,
      international: false,
    },
  ],
  passengers: [
    {
      id: 'p1',
      name: 'Ramesh Mandal',
      type: 'adult',
      seat: '12C',
      meal: null,
      baggage: '15 kg check-in + 7 kg cabin',
      boardingSequence: null,
      checkedIn: false,
    },
  ],
};

/** A completed trip from last month — history. */
const pastTrip: Trip = {
  pnr: 'K2T9V4',
  bookedOn: iso(-40 * DAY),
  fareName: 'Economy Comfort',
  totalPaid: 15200,
  currency: '₹',
  contactEmail: 'ramesh@example.com',
  contactPhone: '+91 98100 12345',
  separateTickets: false,
  baggageTagged: true,
  services: [],
  documents: [],
  payments: [
    {
      id: 'pay1',
      label: 'Flights · 2 travellers',
      amount: 15200,
      method: 'Card',
      at: iso(-40 * DAY),
      status: 'paid',
      lines: [
        { label: 'Base fare', amount: 12000 },
        { label: 'Taxes and fees', amount: 2600 },
        { label: 'Convenience fee', amount: 600 },
      ],
    },
  ],
  segments: [
    {
      marketingFlight: '6E 512',
      marketingCarrier: 'IndiGo',
      marketingCode: '6E',
      carrierColor: '#2B2D6E',
      origin: 'BLR',
      originCity: 'Bengaluru',
      originTerminal: 'T1',
      destination: 'GOI',
      destinationCity: 'Goa',
      destinationTerminal: 'T2',
      departISO: iso(-12 * DAY),
      arriveISO: iso(-12 * DAY + 75 * 60_000),
      durationMin: 75,
      aircraft: 'Airbus A320',
      cabin: 'Economy',
      gate: '14',
      international: false,
    },
  ],
  passengers: [
    {
      id: 'p1',
      name: 'Ramesh Mandal',
      type: 'adult',
      seat: '8A',
      meal: 'Vegetarian',
      baggage: '20 kg check-in + 7 kg cabin',
      boardingSequence: 32,
      checkedIn: true,
    },
    {
      id: 'p2',
      name: 'Anita Mandal',
      type: 'adult',
      seat: '8B',
      meal: 'Vegetarian',
      baggage: '20 kg check-in + 7 kg cabin',
      boardingSequence: 33,
      checkedIn: true,
    },
  ],
};

/** The primary trip is the live one the itinerary screen already drives. */
export const allTrips: Trip[] = [primaryTrip, upcomingTrip, pastTrip];

// ─── Grouping ────────────────────────────────────────────

export type TripBucket = 'active' | 'upcoming' | 'past';

export function tripBucket(t: Trip, now: number): TripBucket {
  const status = tripStatus(t, now);
  if (status === 'arrived' || status === 'cancelled') return 'past';
  // Active = departing within 48h or already in motion
  const depart = new Date(t.segments[0].departISO).getTime();
  if (depart - now <= 48 * HOUR) return 'active';
  return 'upcoming';
}

export interface TripGroups {
  active: Trip[];
  upcoming: Trip[];
  past: Trip[];
}

export function groupTrips(trips: Trip[], now: number): TripGroups {
  const g: TripGroups = { active: [], upcoming: [], past: [] };
  for (const t of trips) g[tripBucket(t, now)].push(t);
  // Active and upcoming sort soonest-first; past most-recent-first
  g.active.sort(byDepart(true));
  g.upcoming.sort(byDepart(true));
  g.past.sort(byDepart(false));
  return g;
}

function byDepart(asc: boolean) {
  return (a: Trip, b: Trip) => {
    const da = new Date(a.segments[0].departISO).getTime();
    const db = new Date(b.segments[0].departISO).getTime();
    return asc ? da - db : db - da;
  };
}

// ─── The assistance engine ───────────────────────────────
//
// For any trip, what is the single most useful thing to do right now? This is
// what makes Trips more than a filing cabinet: it reads the same time-driven
// state the itinerary uses and turns it into one clear next step.

export type NextActionKind =
  | 'documents'
  | 'checkin'
  | 'boarding'
  | 'seat'
  | 'atAirport'
  | 'inFlight'
  | 'refund'
  | 'completed'
  | 'relax';

export interface NextAction {
  kind: NextActionKind;
  /** Short imperative for the card */
  label: string;
  /** One line of context */
  detail: string;
  icon: string;
  /** How loud the card should be */
  urgency: 'now' | 'soon' | 'calm';
  /** Where tapping the card should take the traveller */
  target: 'checkin' | 'boarding' | 'itinerary' | 'none';
}

export function nextAction(t: Trip, now: number): NextAction {
  const status = tripStatus(t, now);
  const seg = t.segments[0];
  const win = checkInWindow(seg);
  const toDepart = countdownTo(seg.departISO, now);

  if (status === 'cancelled') {
    const stages = refundStages(t, now);
    const active = stages.find((s) => s.state === 'active') ?? stages[stages.length - 1];
    return {
      kind: 'refund',
      label: 'Refund in progress',
      detail: active ? active.title : 'A refund has been recorded',
      icon: 'rotate-ccw',
      urgency: 'calm',
      target: 'itinerary',
    };
  }

  if (status === 'arrived') {
    return {
      kind: 'completed',
      label: 'Trip completed',
      detail: `${seg.originCity} to ${seg.destinationCity}`,
      icon: 'check-circle',
      urgency: 'calm',
      target: 'itinerary',
    };
  }

  if (status === 'departed') {
    return {
      kind: 'inFlight',
      label: 'In the air',
      detail: `Landing in ${t.segments[t.segments.length - 1].destinationCity}`,
      icon: 'navigation',
      urgency: 'calm',
      target: 'itinerary',
    };
  }

  if (status === 'boarding') {
    return {
      kind: 'boarding',
      label: 'Boarding now',
      detail: `Gate ${seg.gate ?? 'TBA'} · show your pass`,
      icon: 'credit-card',
      urgency: 'now',
      target: 'boarding',
    };
  }

  if (status === 'checkedIn') {
    return {
      kind: 'boarding',
      label: 'Boarding pass ready',
      detail: `Departs in ${toDepart.label}`,
      icon: 'credit-card',
      urgency: 'calm',
      target: 'boarding',
    };
  }

  if (status === 'checkinClosed') {
    return {
      kind: 'atAirport',
      label: 'Check in at the airport',
      detail: 'The online window has closed',
      icon: 'map-pin',
      urgency: 'soon',
      target: 'itinerary',
    };
  }

  if (status === 'checkinOpen') {
    // Documents block check-in on international routes
    if (documentsRequired(t)) {
      const missing = t.passengers.filter(
        (p) => p.type !== 'infant' && !documentComplete(
          t.documents.find((d) => d.passengerId === p.id),
          seg.departISO,
        ),
      );
      if (missing.length > 0) {
        return {
          kind: 'documents',
          label: 'Add passport details',
          detail: `${missing.length} traveller${missing.length > 1 ? 's' : ''} before check-in`,
          icon: 'credit-card',
          urgency: 'soon',
          target: 'checkin',
        };
      }
    }
    const closes = countdownTo(new Date(win.closesAt).toISOString(), now);
    return {
      kind: 'checkin',
      label: 'Check in now',
      detail: `Closes in ${closes.label}`,
      icon: 'check-square',
      urgency: 'now',
      target: 'checkin',
    };
  }

  // status === 'confirmed' — too early to check in
  const opens = countdownTo(new Date(win.opensAt).toISOString(), now);
  const noSeat = t.passengers.filter((p) => p.type !== 'infant' && !p.seat);
  if (noSeat.length > 0) {
    return {
      kind: 'seat',
      label: 'Choose your seats',
      detail: `${noSeat.length} traveller${noSeat.length > 1 ? 's' : ''} without a seat`,
      icon: 'grid',
      urgency: 'calm',
      target: 'itinerary',
    };
  }

  return {
    kind: 'relax',
    label: 'You are all set',
    detail: `Check-in opens in ${opens.label}`,
    icon: 'coffee',
    urgency: 'calm',
    target: 'itinerary',
  };
}

/** A short route string like "DEL → BLR" or "DEL → DXB → BLR". */
export function routeString(t: Trip): string {
  const codes = [t.segments[0].origin, ...t.segments.map((s) => s.destination)];
  return codes.join(' → ');
}

/** How many trips have something that needs the traveller now or soon. */
export function tripsNeedingAttention(trips: Trip[], now: number): number {
  return trips.filter((t) => {
    const a = nextAction(t, now);
    return a.urgency === 'now' || a.urgency === 'soon';
  }).length;
}
