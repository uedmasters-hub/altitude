import { useState, useEffect } from 'react';

/**
 * A confirmed booking, and the rules that decide what the traveller can do
 * with it right now. Almost everything on the itinerary screen is a function
 * of how far away departure is, so that lives here rather than in the view.
 */

// ─── Record ──────────────────────────────────────────────

export interface TripSegment {
  marketingFlight: string;
  marketingCarrier: string;
  marketingCode: string;
  carrierColor: string;
  operatingCarrier?: string;

  origin: string;
  originCity: string;
  originTerminal: string;
  destination: string;
  destinationCity: string;
  destinationTerminal: string;

  departISO: string;
  arriveISO: string;
  durationMin: number;
  aircraft: string;
  cabin: string;
  /** Published shortly before departure */
  gate: string | null;
  international: boolean;
}

export interface TripPassenger {
  id: string;
  name: string;
  type: 'adult' | 'child' | 'infant';
  seat: string | null;
  meal: string | null;
  baggage: string;
  /** Sequence number issued at check-in */
  boardingSequence: number | null;
  checkedIn: boolean;
}

export interface Trip {
  pnr: string;
  bookedOn: string;
  segments: TripSegment[];
  passengers: TripPassenger[];
  fareName: string;
  totalPaid: number;
  currency: string;
  contactEmail: string;
  contactPhone: string;
  /** Legs sold on separate tickets need separate check-in */
  separateTickets: boolean;
  /** Once bags are tagged, check-in can no longer be undone online */
  baggageTagged: boolean;
  /** Extras bought after the original booking */
  services: PurchasedService[];
  /** Every charge against this booking, newest last */
  payments: PaymentRecord[];
  /** Passport details captured for international check-in */
  documents: TravelDocument[];
  /** Set once the whole booking is cancelled */
  status?: 'cancelled';
  /** Refund details, present after cancellation */
  refund?: {
    amount: number;
    initiatedAt: string;
    method: string;
  };
}

// ─── Purchases ───────────────────────────────────────────

export interface PurchasedService {
  id: string;
  ancillaryId: string;
  name: string;
  passengerIds: string[];
  amount: number;
  purchasedAt: string;
}

export type PaymentStatus = 'paid' | 'failed' | 'refunded';

export interface PaymentLine {
  label: string;
  amount: number;
  note?: string;
}

export interface PaymentRecord {
  id: string;
  label: string;
  amount: number;
  method: string;
  at: string;
  status: PaymentStatus;
  /** What the charge was actually made up of */
  lines: PaymentLine[];
}

// ─── Travel documents ────────────────────────────────────

export interface TravelDocument {
  passengerId: string;
  passportNumber: string;
  nationality: string;
  issuingCountry: string;
  /** DD/MM/YYYY */
  expiry: string;
}

/** International departures need passport data before a pass can be issued. */
export function documentsRequired(t: Trip): boolean {
  return t.segments.some((s) => s.international);
}

export interface DocErrors {
  passportNumber?: string;
  nationality?: string;
  expiry?: string;
}

const PASSPORT_RE = /^[A-Z0-9]{6,12}$/i;

export function validateDocument(
  doc: TravelDocument,
  departISO: string,
): DocErrors {
  const e: DocErrors = {};

  if (!doc.passportNumber.trim()) e.passportNumber = 'Passport number is required';
  else if (!PASSPORT_RE.test(doc.passportNumber.trim()))
    e.passportNumber = 'Use 6 to 12 letters and numbers';

  if (!doc.nationality.trim()) e.nationality = 'Nationality is required';

  if (!doc.expiry.trim()) {
    e.expiry = 'Expiry date is required';
  } else {
    const m = doc.expiry.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) {
      e.expiry = 'Use the format DD/MM/YYYY';
    } else {
      const [, dd, mm, yyyy] = m;
      const exp = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
      if (
        exp.getDate() !== Number(dd) ||
        exp.getMonth() !== Number(mm) - 1
      ) {
        e.expiry = 'That date does not exist';
      } else {
        const depart = new Date(departISO);
        // Most destinations require six months of validity beyond arrival
        const sixMonthsOn = new Date(depart);
        sixMonthsOn.setMonth(sixMonthsOn.getMonth() + 6);
        if (exp < depart) e.expiry = 'This passport expires before you travel';
        else if (exp < sixMonthsOn)
          e.expiry = 'Most destinations need six months validity beyond travel';
      }
    }
  }

  return e;
}

export function documentComplete(
  doc: TravelDocument | undefined,
  departISO: string,
): boolean {
  if (!doc) return false;
  return Object.keys(validateDocument(doc, departISO)).length === 0;
}

// ─── Mock record ─────────────────────────────────────────
// Departure is pinned relative to now so the screen always shows a live
// countdown rather than a stale date.

const HOUR = 3600_000;
const DEPART_IN = 19.5 * HOUR;

function iso(offsetMs: number) {
  return new Date(Date.now() + offsetMs).toISOString();
}

export const trip: Trip = {
  pnr: 'X4K2P9',
  bookedOn: new Date(Date.now() - 26 * HOUR).toISOString(),
  fareName: 'Economy',
  totalPaid: 38460,
  currency: '₹',
  contactEmail: 'ramesh@example.com',
  contactPhone: '+91 98100 12345',
  separateTickets: false,
  baggageTagged: false,
  services: [],
  documents: [
    {
      passengerId: 'p1',
      passportNumber: 'M4521786',
      nationality: 'Indian',
      issuingCountry: 'India',
      expiry: '14/08/2031',
    },
    {
      passengerId: 'p2',
      passportNumber: 'M4521902',
      nationality: 'Indian',
      issuingCountry: 'India',
      expiry: '22/03/2030',
    },
  ],
  payments: [
    {
      id: 'pay1',
      label: 'Flights · 2 travellers',
      amount: 38460,
      method: 'UPI',
      at: new Date(Date.now() - 26 * HOUR).toISOString(),
      status: 'paid',
      lines: [
        { label: 'Base fare', amount: 27000, note: '2 adults × ₹13,500' },
        { label: 'Airline fuel charge', amount: 4800, note: '2 × ₹2,400' },
        { label: 'User development fee', amount: 2100, note: 'Levied by the airport' },
        { label: 'Passenger service fee', amount: 472, note: 'Levied by the airport' },
        { label: 'Aviation security fee', amount: 400, note: 'Government levy' },
        { label: 'Seat selection', amount: 1000, note: '32A and 32B' },
        { label: 'GST', amount: 2088, note: '5% on international economy' },
        { label: 'Convenience fee', amount: 600 },
      ],
    },
  ],
  segments: [
    {
      marketingFlight: 'EK 511',
      marketingCarrier: 'Emirates',
      marketingCode: 'EK',
      carrierColor: '#D71921',
      origin: 'DEL',
      originCity: 'New Delhi',
      originTerminal: 'T3',
      destination: 'DXB',
      destinationCity: 'Dubai',
      destinationTerminal: 'T3',
      departISO: iso(DEPART_IN),
      arriveISO: iso(DEPART_IN + 235 * 60_000),
      durationMin: 235,
      aircraft: 'Boeing 777-300ER',
      cabin: 'Economy',
      gate: null,
      international: true,
    },
  ],
  passengers: [
    {
      id: 'p1',
      name: 'Ramesh Mandal',
      type: 'adult',
      seat: '32A',
      meal: 'Vegetarian',
      baggage: '25 kg check-in + 7 kg cabin',
      boardingSequence: null,
      checkedIn: false,
    },
    {
      id: 'p2',
      name: 'Anita Mandal',
      type: 'adult',
      seat: '32B',
      meal: 'Vegetarian',
      baggage: '25 kg check-in + 7 kg cabin',
      boardingSequence: null,
      checkedIn: false,
    },
  ],
};

// ─── Status machine ──────────────────────────────────────

export type TripStatus =
  | 'cancelled'
  | 'confirmed'      // too early to check in
  | 'checkinOpen'
  | 'checkedIn'
  | 'checkinClosed'  // window missed, counter check-in only
  | 'boarding'
  | 'departed'
  | 'arrived';

export interface CheckInWindow {
  opensAt: number;
  closesAt: number;
  gateClosesAt: number;
}

/** Web check-in opens two days out and shuts earlier on international routes. */
export function checkInWindow(seg: TripSegment): CheckInWindow {
  const depart = new Date(seg.departISO).getTime();
  return {
    opensAt: depart - 48 * HOUR,
    closesAt: depart - (seg.international ? 4 * HOUR : 2 * HOUR),
    gateClosesAt: depart - (seg.international ? 45 : 25) * 60_000,
  };
}

export function tripStatus(t: Trip, now: number): TripStatus {
  if (t.status === 'cancelled') return 'cancelled';
  const first = t.segments[0];
  const last = t.segments[t.segments.length - 1];
  const depart = new Date(first.departISO).getTime();
  const arrive = new Date(last.arriveISO).getTime();
  const win = checkInWindow(first);

  if (now >= arrive) return 'arrived';
  if (now >= depart) return 'departed';
  if (now >= win.gateClosesAt) return 'boarding';

  const allCheckedIn = t.passengers
    .filter((p) => p.type !== 'infant')
    .every((p) => p.checkedIn);
  if (allCheckedIn) return 'checkedIn';

  if (now >= win.closesAt) return 'checkinClosed';
  if (now >= win.opensAt) return 'checkinOpen';
  return 'confirmed';
}

export const STATUS_META: Record<
  TripStatus,
  { label: string; tone: 'neutral' | 'good' | 'warn' | 'bad' }
> = {
  cancelled: { label: 'Cancelled', tone: 'bad' },
  confirmed: { label: 'Confirmed', tone: 'good' },
  checkinOpen: { label: 'Check-in open', tone: 'good' },
  checkedIn: { label: 'Checked in', tone: 'good' },
  checkinClosed: { label: 'Check-in closed', tone: 'warn' },
  boarding: { label: 'Boarding', tone: 'warn' },
  departed: { label: 'In the air', tone: 'neutral' },
  arrived: { label: 'Completed', tone: 'neutral' },
};

// ─── Countdown ───────────────────────────────────────────

export interface Countdown {
  ms: number;
  label: string;
  /** Short form for a chip */
  short: string;
}

export function countdownTo(iso: string, now: number): Countdown {
  const ms = new Date(iso).getTime() - now;
  const abs = Math.abs(ms);

  const days = Math.floor(abs / (24 * HOUR));
  const hours = Math.floor((abs % (24 * HOUR)) / HOUR);
  const mins = Math.floor((abs % HOUR) / 60_000);

  let label: string;
  let short: string;

  if (days > 0) {
    label = `${days} day${days > 1 ? 's' : ''} ${hours}h`;
    short = `${days}d ${hours}h`;
  } else if (hours > 0) {
    label = `${hours}h ${mins}m`;
    short = `${hours}h ${mins}m`;
  } else {
    label = `${mins} minute${mins === 1 ? '' : 's'}`;
    short = `${mins}m`;
  }

  return { ms, label, short };
}

/** Ticks fast when the number is small, slowly when it is not. */
export function useNow(): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

// ─── Formatting ──────────────────────────────────────────

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function timeOf(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function dateOf(iso: string): string {
  const d = new Date(iso);
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function longDateOf(iso: string): string {
  const d = new Date(iso);
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function dayOffset(fromISO: string, toISO: string): number {
  const a = new Date(fromISO);
  const b = new Date(toISO);
  const aDay = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const bDay = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round((bDay - aDay) / (24 * HOUR));
}

export function durationLabel(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

// ─── Post-booking ancillaries ────────────────────────────
//
// Scope note: everything here attaches to the flight itself. Hotels, cabs
// and activities are a different product and belong to a later phase.

export interface Ancillary {
  id: string;
  icon: string;
  name: string;
  blurb: string;
  price: number;
  /** Per traveller rather than per booking */
  perPassenger: boolean;
  /** Cannot be added once this many hours remain */
  cutoffHours: number;
  /** Saving against buying it at the airport */
  airportPrice?: number;
}

export const ancillaries: Ancillary[] = [
  {
    id: 'baggage',
    icon: 'briefcase',
    name: 'Extra baggage',
    blurb: 'Add 5 kg to your check-in allowance',
    price: 1200,
    perPassenger: true,
    cutoffHours: 4,
    airportPrice: 2400,
  },
  {
    id: 'seat',
    icon: 'grid',
    name: 'Move to extra legroom',
    blurb: 'Rows 1, 12 and 13 have more space',
    price: 1400,
    perPassenger: true,
    cutoffHours: 2,
  },
  {
    id: 'lounge',
    icon: 'coffee',
    name: 'Airport lounge',
    blurb: 'Food, drinks and quiet seating before you fly',
    price: 1100,
    perPassenger: true,
    cutoffHours: 3,
  },
  {
    id: 'fasttrack',
    icon: 'zap',
    name: 'Fast-track security',
    blurb: 'Skip the main queue at Delhi T3',
    price: 600,
    perPassenger: true,
    cutoffHours: 6,
  },
  {
    id: 'insurance',
    icon: 'shield',
    name: 'Trip protection',
    blurb: 'Cover for delays, cancellation and lost bags',
    price: 499,
    perPassenger: true,
    cutoffHours: 24,
  },
  {
    id: 'meal',
    icon: 'coffee',
    name: 'Change your meal',
    blurb: 'Swap or add a pre-ordered meal',
    price: 450,
    perPassenger: true,
    cutoffHours: 24,
  },
];

export function ancillaryAvailable(
  a: Ancillary,
  departISO: string,
  now: number,
): boolean {
  const hoursLeft = (new Date(departISO).getTime() - now) / HOUR;
  return hoursLeft > a.cutoffHours;
}

// ─── Pre-flight reminders ────────────────────────────────

export interface Reminder {
  icon: string;
  title: string;
  detail: string;
}

export function remindersFor(t: Trip): Reminder[] {
  const seg = t.segments[0];
  const intl = t.segments.some((s) => s.international);

  const out: Reminder[] = [
    {
      icon: 'clock',
      title: intl ? 'Arrive 3 hours early' : 'Arrive 2 hours early',
      detail: `Counters at ${seg.origin} ${seg.originTerminal} close 45 minutes before departure.`,
    },
    {
      icon: 'credit-card',
      title: intl ? 'Passport required' : 'Carry photo ID',
      detail: intl
        ? 'Valid for at least six months beyond your return date.'
        : 'Aadhaar, passport or driving licence, matching the name on the ticket.',
    },
    {
      icon: 'briefcase',
      title: 'Baggage allowance',
      detail: `${t.passengers[0].baggage}. Excess is charged by weight at the counter.`,
    },
  ];

  if (t.separateTickets) {
    out.push({
      icon: 'alert-triangle',
      title: 'Separate tickets',
      detail:
        'Check in for each leg individually. A delay on the first is not covered by the second airline.',
    });
  }

  const codeshare = t.segments.find(
    (s) => s.operatingCarrier && s.operatingCarrier !== s.marketingCarrier,
  );
  if (codeshare) {
    out.push({
      icon: 'repeat',
      title: `Check in with ${codeshare.operatingCarrier}`,
      detail: `${codeshare.marketingFlight} is sold by ${codeshare.marketingCarrier} but flown by ${codeshare.operatingCarrier}.`,
    });
  }

  return out;
}

// ─── Reversing check-in ──────────────────────────────────
//
// Airlines allow a web check-in to be undone only while the online window is
// still open and nothing physical has happened yet. Once a bag carries a tag
// or boarding has started, only the airport counter can intervene.

export interface UndoCheckIn {
  allowed: boolean;
  reason: string;
}

export function canUndoCheckIn(t: Trip, now: number): UndoCheckIn {
  const seg = t.segments[0];
  const win = checkInWindow(seg);
  const anyCheckedIn = t.passengers.some((p) => p.checkedIn);

  if (!anyCheckedIn) {
    return { allowed: false, reason: 'Nobody is checked in yet' };
  }

  if (now >= new Date(seg.departISO).getTime()) {
    return { allowed: false, reason: 'This flight has departed' };
  }

  if (now >= win.gateClosesAt) {
    return { allowed: false, reason: 'Boarding has started' };
  }

  if (t.baggageTagged) {
    return {
      allowed: false,
      reason: 'Baggage has been tagged — speak to the airline desk',
    };
  }

  if (now >= win.closesAt) {
    return {
      allowed: false,
      reason: `Online check-in closed ${seg.international ? 4 : 2} hours before departure`,
    };
  }

  return {
    allowed: true,
    reason: 'Seats are released and may be reassigned',
  };
}

/** Some travellers checked in, others not. */
export function partiallyCheckedIn(t: Trip): boolean {
  const eligible = t.passengers.filter((p) => p.type !== 'infant');
  const done = eligible.filter((p) => p.checkedIn).length;
  return done > 0 && done < eligible.length;
}

// ─── Applying a purchase ─────────────────────────────────

/** Bump a "15 kg check-in + 7 kg cabin" style string by a number of kilos. */
function addKilos(baggage: string, extra: number): string {
  return baggage.replace(/(\d+)\s*kg check-in/i, (_, kg: string) =>
    `${Number(kg) + extra} kg check-in`,
  );
}

export interface CartItem {
  ancillaryId: string;
  name: string;
  passengerIds: string[];
  unitPrice: number;
  /** unitPrice × passengers, before tax */
  subtotal: number;
}

export const CART_TAX_RATE = 0.18;

export function cartSubtotal(cart: CartItem[]): number {
  return cart.reduce((n, c) => n + c.subtotal, 0);
}

export function cartTax(cart: CartItem[]): number {
  return Math.round(cartSubtotal(cart) * CART_TAX_RATE);
}

export function cartTotal(cart: CartItem[]): number {
  return cartSubtotal(cart) + cartTax(cart);
}

export interface ApplyResult {
  trip: Trip;
  /** A boarding pass already issued is no longer accurate */
  reissueNeeded: boolean;
}

/** Settle a whole basket in one charge and write the results back. */
export function applyCart(
  t: Trip,
  cart: CartItem[],
  method: string,
): ApplyResult {
  const at = new Date().toISOString();
  let reissueNeeded = false;

  let passengers = t.passengers;

  for (const item of cart) {
    passengers = passengers.map((p) => {
      if (!item.passengerIds.includes(p.id)) return p;

      switch (item.ancillaryId) {
        case 'baggage':
          return { ...p, baggage: addKilos(p.baggage, 5) };
        case 'seat':
          // Moving seat invalidates any pass already issued
          if (p.checkedIn) reissueNeeded = true;
          return { ...p, seat: p.seat ? `12${p.seat.slice(-1)}` : '12A' };
        case 'meal':
          return { ...p, meal: 'Updated selection' };
        default:
          return p;
      }
    });
  }

  const subtotal = cartSubtotal(cart);
  const tax = cartTax(cart);
  const total = subtotal + tax;

  const lines: PaymentLine[] = [
    ...cart.map((c) => ({
      label: c.name,
      amount: c.subtotal,
      note:
        c.passengerIds.length > 1
          ? `${c.passengerIds.length} travellers × ₹${c.unitPrice.toLocaleString()}`
          : undefined,
    })),
    { label: 'Taxes and fees', amount: tax, note: 'GST at 18% on extras' },
  ];

  return {
    reissueNeeded,
    trip: {
      ...t,
      passengers,
      totalPaid: t.totalPaid + total,
      services: [
        ...t.services,
        ...cart.map((c, i) => ({
          id: `svc${t.services.length + i + 1}`,
          ancillaryId: c.ancillaryId,
          name: c.name,
          passengerIds: c.passengerIds,
          amount: c.subtotal,
          purchasedAt: at,
        })),
      ],
      payments: [
        ...t.payments,
        {
          id: `pay${t.payments.length + 1}`,
          label:
            cart.length === 1
              ? cart[0].name
              : `${cart.length} extras added`,
          amount: total,
          method,
          at,
          status: 'paid' as const,
          lines,
        },
      ],
    },
  };
}

// ─── Per-traveller readiness ─────────────────────────────
//
// A roster that only lists names makes you work out for yourself who still
// needs something. These helpers answer that per person.

export type ReadinessLevel = 'ready' | 'action' | 'waiting';

export interface Readiness {
  level: ReadinessLevel;
  label: string;
  detail: string;
}

export function travellerReadiness(
  t: Trip,
  p: TripPassenger,
  now: number,
): Readiness {
  const seg = t.segments[0];
  const win = checkInWindow(seg);
  const intl = documentsRequired(t);

  if (t.status === 'cancelled') {
    return {
      level: 'waiting',
      label: 'Booking cancelled',
      detail: 'This flight is no longer booked',
    };
  }

  if (p.type === 'infant') {
    return {
      level: 'ready',
      label: 'Travels on a lap',
      detail: "Added to the accompanying adult's boarding pass",
    };
  }

  if (p.checkedIn) {
    return {
      level: 'ready',
      label: 'Checked in',
      detail: p.seat
        ? `Seat ${p.seat} · sequence ${p.boardingSequence}`
        : `Seat at the gate · sequence ${p.boardingSequence}`,
    };
  }

  if (now >= win.gateClosesAt) {
    return {
      level: 'action',
      label: 'Go to the gate',
      detail: 'Boarding has started and check-in has closed',
    };
  }

  if (now >= win.closesAt) {
    return {
      level: 'action',
      label: 'Check in at the airport',
      detail: 'The online window has closed for this flight',
    };
  }

  if (now < win.opensAt) {
    return {
      level: 'waiting',
      label: 'Check-in not open yet',
      detail: `Opens ${countdownTo(new Date(win.opensAt).toISOString(), now).label} from now`,
    };
  }

  if (intl && !documentComplete(
    t.documents.find((d) => d.passengerId === p.id),
    seg.departISO,
  )) {
    return {
      level: 'action',
      label: 'Passport details needed',
      detail: 'Required before a boarding pass can be issued',
    };
  }

  return {
    level: 'action',
    label: 'Ready to check in',
    detail: p.seat ? `Seat ${p.seat} is held` : 'No seat chosen yet',
  };
}

/** How many people still have something outstanding. */
export function outstandingCount(t: Trip, now: number): number {
  return t.passengers.filter(
    (p) => travellerReadiness(t, p, now).level === 'action',
  ).length;
}

// ─── Seat description ────────────────────────────────────

/**
 * Position from the seat letter. Narrow-bodies run 3-3 and wide-bodies 3-4-3,
 * so the letter alone is ambiguous — the aircraft decides.
 */
export function seatPosition(seat: string | null, aircraft: string): string | null {
  if (!seat) return null;
  const letter = seat.slice(-1).toUpperCase();

  const wideBody = /777|787|A350|A380|A330/i.test(aircraft);

  const narrow: Record<string, string> = {
    A: 'Window', B: 'Middle', C: 'Aisle',
    D: 'Aisle', E: 'Middle', F: 'Window',
  };
  const wide: Record<string, string> = {
    A: 'Window', B: 'Middle', C: 'Aisle',
    D: 'Aisle', E: 'Middle', F: 'Middle', G: 'Aisle',
    H: 'Aisle', J: 'Middle', K: 'Window',
  };

  return (wideBody ? wide : narrow)[letter] ?? null;
}

/** Extras already bought for one traveller. */
export function servicesFor(t: Trip, passengerId: string): PurchasedService[] {
  return t.services.filter((s) => s.passengerIds.includes(passengerId));
}

/** Extras sitting in the basket for one traveller. */
export function cartItemsFor(cart: CartItem[], passengerId: string): CartItem[] {
  return cart.filter((c) => c.passengerIds.includes(passengerId));
}

// ─── Nationalities ───────────────────────────────────────

export const NATIONALITIES = [
  'Indian',
  'American',
  'Australian',
  'Bangladeshi',
  'British',
  'Canadian',
  'Chinese',
  'Emirati',
  'Filipino',
  'French',
  'German',
  'Indonesian',
  'Italian',
  'Japanese',
  'Malaysian',
  'Nepalese',
  'Pakistani',
  'Saudi',
  'Singaporean',
  'South Korean',
  'Sri Lankan',
  'Thai',
] as const;

// ─── Extras exhaustion ───────────────────────────────────

/**
 * True when every available ancillary has either been purchased or has passed
 * its cut-off. Used to hide the "Add extras" button when it has nothing to offer.
 */
export function hasExtrasToAdd(
  t: Trip,
  passengerId: string,
  cart: CartItem[],
  now: number,
): boolean {
  if (t.status === 'cancelled') return false;
  const seg = t.segments[0];
  return ancillaries.some((a) => {
    if (!ancillaryAvailable(a, seg.departISO, now)) return false;
    const owned = t.services.some(
      (sv) => sv.ancillaryId === a.id && sv.passengerIds.includes(passengerId),
    );
    if (owned) return false;
    const basketed = cart.some(
      (c) => c.ancillaryId === a.id && c.passengerIds.includes(passengerId),
    );
    return !basketed;
  });
}

// ─── Managing a booking ──────────────────────────────────
//
// The three destructive or fare-affecting actions share a shape: work out
// the money consequence, then apply it to the record. Refunds and change
// fees depend on how close to departure the request comes.

const DAY = 24 * HOUR;

export interface RefundBreakdown {
  fareRefunded: number;
  taxesRefunded: number;
  extrasRefunded: number;
  cancellationFee: number;
  /** What actually returns to the traveller */
  net: number;
  /** Airline extras almost never refund unless the airline cancels */
  extrasForfeited: number;
}

/**
 * Cancellation refund. The closer to departure, the less of the fare returns;
 * taxes are always refundable, extras almost never are.
 */
export function refundQuote(t: Trip, now: number): RefundBreakdown {
  const seg = t.segments[0];
  const hoursLeft = (new Date(seg.departISO).getTime() - now) / HOUR;

  // Base fare component is the flight payment minus its tax lines
  const flightPayment = t.payments.find((p) => p.id === 'pay1');
  const taxLines = flightPayment
    ? flightPayment.lines
        .filter((l) => /gst|fee|levy|security|development|service/i.test(l.label))
        .reduce((n, l) => n + l.amount, 0)
    : 0;
  const fareBase = (flightPayment?.amount ?? t.totalPaid) - taxLines;

  // Refundable proportion of the fare
  let fareFactor: number;
  if (t.fareName.toLowerCase().includes('flex')) fareFactor = 1;
  else if (hoursLeft > 72) fareFactor = 0.75;
  else if (hoursLeft > 24) fareFactor = 0.5;
  else if (hoursLeft > 4) fareFactor = 0.25;
  else fareFactor = 0;

  const fareRefunded = Math.round(fareBase * fareFactor);
  const cancellationFee = fareBase - fareRefunded;
  const taxesRefunded = taxLines;

  // Extras only come back if the airline cancels, not the traveller
  const extrasPaid = t.services.reduce((n, s) => n + s.amount, 0);

  return {
    fareRefunded,
    taxesRefunded,
    extrasRefunded: 0,
    cancellationFee,
    extrasForfeited: extrasPaid,
    net: fareRefunded + taxesRefunded,
  };
}

export interface DateOption {
  iso: string;
  label: string;
  /** Difference in fare against what was paid; can be negative */
  fareDelta: number;
  changeFee: number;
  seatsLeft: number;
}

/** Alternative dates around the booked one, with the cost to move. */
export function dateChangeOptions(t: Trip, now: number): DateOption[] {
  const seg = t.segments[0];
  const departDay = new Date(seg.departISO);
  const changeFee = t.fareName.toLowerCase().includes('flex') ? 0 : 2500;

  const deltas = [-2, -1, 1, 2, 3];
  return deltas
    .map((d) => {
      const date = new Date(departDay);
      date.setDate(date.getDate() + d);
      if (date.getTime() < now) return null;
      // Deterministic pseudo-fare movement per offset
      const fareDelta = [-800, 400, 1200, -300, 900][deltas.indexOf(d)] ?? 0;
      const seatsLeft = [2, 6, 9, 4, 7][deltas.indexOf(d)] ?? 5;
      return {
        iso: date.toISOString(),
        label: longDateOf(date.toISOString()),
        fareDelta,
        changeFee,
        seatsLeft,
      };
    })
    .filter((o): o is DateOption => o !== null);
}

export type CancelState = 'cancelled';

/** Mark the whole booking cancelled and record the refund. */
export function applyCancellation(t: Trip, refund: RefundBreakdown): Trip {
  const at = new Date().toISOString();
  return {
    ...t,
    status: 'cancelled',
    // A cancelled flight has no valid check-in or boarding pass
    passengers: t.passengers.map((p) => ({
      ...p,
      checkedIn: false,
      boardingSequence: null,
    })),
    refund: {
      amount: refund.net,
      initiatedAt: at,
      method: 'Original payment method',
    },
    payments: [
      ...t.payments,
      {
        id: `pay${t.payments.length + 1}`,
        label: 'Cancellation refund',
        amount: -refund.net,
        method: 'Original payment method',
        at,
        status: 'refunded',
        lines: [
          { label: 'Fare refunded', amount: refund.fareRefunded },
          { label: 'Taxes refunded', amount: refund.taxesRefunded },
          { label: 'Cancellation fee', amount: -refund.cancellationFee },
          ...(refund.extrasForfeited > 0
            ? [{ label: 'Extras forfeited', amount: 0, note: `₹${refund.extrasForfeited.toLocaleString()} non-refundable` }]
            : []),
        ],
      },
    ],
  };
}

// ─── Refund timeline ─────────────────────────────────────

export interface RefundStage {
  key: 'initiated' | 'processing' | 'credited';
  title: string;
  detail: string;
  /** done, active, or upcoming — derived from elapsed time */
  state: 'done' | 'active' | 'upcoming';
  at: string | null;
}

/**
 * A refund moves through three stages over several days. Like everything else
 * on this screen, the current stage is derived from elapsed time rather than
 * stored, so it advances on its own.
 */
export function refundStages(t: Trip, now: number): RefundStage[] {
  if (!t.refund) return [];

  const initiated = new Date(t.refund.initiatedAt).getTime();
  const hoursSince = (now - initiated) / HOUR;

  // Processing completes after ~24h, credit lands within 5–7 working days
  const processingDoneAt = initiated + 24 * HOUR;
  const creditedAt = initiated + 6 * DAY;

  const processingDone = now >= processingDoneAt;
  const credited = now >= creditedAt;

  return [
    {
      key: 'initiated',
      title: 'Refund initiated',
      detail: `₹${t.refund.amount.toLocaleString()} to your ${t.refund.method.toLowerCase()}`,
      state: 'done',
      at: t.refund.initiatedAt,
    },
    {
      key: 'processing',
      title: 'Processing with your bank',
      detail: processingDone
        ? 'Confirmed and passed to your bank'
        : `Usually clears within 24 hours · ${Math.max(1, Math.round(24 - hoursSince))}h remaining`,
      state: processingDone ? 'done' : 'active',
      at: processingDone ? new Date(processingDoneAt).toISOString() : null,
    },
    {
      key: 'credited',
      title: credited ? 'Credited to your account' : 'Expected in your account',
      detail: credited
        ? 'The refund has landed'
        : `By ${longDateOf(new Date(creditedAt).toISOString())}`,
      state: credited ? 'done' : processingDone ? 'active' : 'upcoming',
      at: credited ? new Date(creditedAt).toISOString() : null,
    },
  ];
}

/** Move the whole itinerary to a new date, carrying the time of day. */
export function applyDateChange(t: Trip, option: DateOption): Trip {
  const oldDepart = new Date(t.segments[0].departISO);
  const newDepart = new Date(option.iso);
  newDepart.setHours(oldDepart.getHours(), oldDepart.getMinutes(), 0, 0);
  const shift = newDepart.getTime() - oldDepart.getTime();

  const cost = option.fareDelta + option.changeFee;

  return {
    ...t,
    segments: t.segments.map((s) => ({
      ...s,
      departISO: new Date(new Date(s.departISO).getTime() + shift).toISOString(),
      arriveISO: new Date(new Date(s.arriveISO).getTime() + shift).toISOString(),
      gate: null,
    })),
    // Changing the date invalidates any check-in
    passengers: t.passengers.map((p) => ({
      ...p,
      checkedIn: false,
      boardingSequence: null,
    })),
    totalPaid: t.totalPaid + cost,
    payments: [
      ...t.payments,
      {
        id: `pay${t.payments.length + 1}`,
        label: 'Date change',
        amount: cost,
        method: 'UPI',
        at: new Date().toISOString(),
        status: 'paid' as const,
        lines: [
          { label: 'Fare difference', amount: option.fareDelta },
          { label: 'Change fee', amount: option.changeFee },
        ],
      },
    ],
  };
}

// ─── Dangerous goods ─────────────────────────────────────
//
// Every airline requires passengers to acknowledge what may and may not be
// carried, and where. The rules split three ways: banned outright, cabin
// only, or hold only. These are the common categories a leisure traveller
// actually runs into.

export interface DangerousGoodsItem {
  icon: string;
  name: string;
  note: string;
}

export interface DangerousGoodsGroup {
  key: 'banned' | 'cabinOnly' | 'holdOnly';
  title: string;
  subtitle: string;
  tone: 'bad' | 'info' | 'caution';
  items: DangerousGoodsItem[];
}

export const dangerousGoods: DangerousGoodsGroup[] = [
  {
    key: 'banned',
    title: 'Never allowed',
    subtitle: 'Not in the cabin or the hold, on any flight',
    tone: 'bad',
    items: [
      { icon: 'zap', name: 'Explosives and fireworks', note: 'Crackers, flares, sparklers, caps' },
      { icon: 'wind', name: 'Compressed gases', note: 'Camping stoves, large aerosols, tear gas' },
      { icon: 'droplet', name: 'Flammable liquids', note: 'Petrol, lighter fluid, paint thinner' },
      { icon: 'alert-octagon', name: 'Corrosives and poisons', note: 'Acids, mercury, pesticides, arsenic' },
      { icon: 'target', name: 'Radioactive material', note: 'Any quantity, any packaging' },
    ],
  },
  {
    key: 'cabinOnly',
    title: 'Cabin baggage only',
    subtitle: 'Carry these with you — never in checked bags',
    tone: 'info',
    items: [
      { icon: 'battery-charging', name: 'Power banks and spare batteries', note: 'Lithium cells must stay in the cabin' },
      { icon: 'smartphone', name: 'E-cigarettes and vapes', note: 'Carry in the cabin, do not charge on board' },
      { icon: 'dollar-sign', name: 'Valuables and documents', note: 'Cash, jewellery, passports, medicines' },
      { icon: 'camera', name: 'Loose lithium electronics', note: 'Spare camera and drone batteries' },
    ],
  },
  {
    key: 'holdOnly',
    title: 'Checked baggage only',
    subtitle: 'These cannot come into the cabin',
    tone: 'caution',
    items: [
      { icon: 'scissors', name: 'Sharp objects', note: 'Scissors over 6 cm, knives, blades, razors' },
      { icon: 'tool', name: 'Tools', note: 'Drills, wrenches, anything over 6 cm' },
      { icon: 'coffee', name: 'Liquids over 100 ml', note: 'Cabin liquids must be 100 ml or less' },
      { icon: 'flag', name: 'Sporting goods', note: 'Bats, cues, clubs, martial-arts gear' },
    ],
  },
];
