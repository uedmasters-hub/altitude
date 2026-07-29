import type { MockFlight, FareFamily, Layover, Segment } from '../data/flights';

/**
 * Rules that turn raw inventory into an answer for a specific party:
 * can they all be seated, what will they actually pay, and what should
 * they be warned about before they commit.
 */

// ─── Party ───────────────────────────────────────────────

export interface PaxMix {
  adults: number;    // 12+
  children: number;  // 2–11, occupies a seat
  infants: number;   // under 2, travels on a lap
}

export const defaultPax = (): PaxMix => ({ adults: 1, children: 0, infants: 0 });

/** Infants sit on a lap, so they do not consume inventory. */
export function seatsNeeded(pax: PaxMix): number {
  return pax.adults + pax.children;
}

export function totalTravellers(pax: PaxMix): number {
  return pax.adults + pax.children + pax.infants;
}

export function describePax(pax: PaxMix): string {
  const parts: string[] = [];
  if (pax.adults) parts.push(`${pax.adults} Adult${pax.adults > 1 ? 's' : ''}`);
  if (pax.children) parts.push(`${pax.children} Child${pax.children > 1 ? 'ren' : ''}`);
  if (pax.infants) parts.push(`${pax.infants} Infant${pax.infants > 1 ? 's' : ''}`);
  return parts.join(', ') || '1 Adult';
}

export function shortPax(pax: PaxMix): string {
  const n = totalTravellers(pax);
  return `${n} Pax`;
}

/** Rules that constrain the party itself, independent of any flight. */
export function validatePax(pax: PaxMix): string | null {
  if (pax.adults < 1) return 'At least one adult must travel';
  if (pax.infants > pax.adults) return 'Each infant needs an accompanying adult';
  if (seatsNeeded(pax) > 9) return 'Up to 9 seats can be booked at once';
  return null;
}

// ─── Availability ────────────────────────────────────────

export type AvailabilityState = 'available' | 'scarce' | 'insufficient';

export interface Availability {
  state: AvailabilityState;
  seatsLeft: number;
  needed: number;
  message: string | null;
}

export function availability(flight: MockFlight, pax: PaxMix): Availability {
  const needed = seatsNeeded(pax);
  const left = flight.seatsLeft;

  if (left < needed) {
    return {
      state: 'insufficient',
      seatsLeft: left,
      needed,
      message:
        left === 0
          ? 'Sold out'
          : `Only ${left} seat${left > 1 ? 's' : ''} left — you need ${needed}`,
    };
  }

  if (left <= 4) {
    return {
      state: 'scarce',
      seatsLeft: left,
      needed,
      message: `Only ${left} seat${left > 1 ? 's' : ''} left`,
    };
  }

  return { state: 'available', seatsLeft: left, needed, message: null };
}

/** A fare bucket can run out before the flight does. */
export function fareAvailable(fare: FareFamily, pax: PaxMix): boolean {
  return fare.seatsAtFare >= seatsNeeded(pax);
}

// ─── Pricing ─────────────────────────────────────────────

export interface PaxLine {
  label: string;
  count: number;
  perHead: number;
  total: number;
  note?: string;
}

export interface FareQuote {
  lines: PaxLine[];
  subtotal: number;
  taxes: number;
  total: number;
  /** What one adult pays, for "from ₹x" style display */
  leadPrice: number;
}

export function quoteFare(
  fare: FareFamily,
  pax: PaxMix,
  international: boolean,
): FareQuote {
  const lines: PaxLine[] = [];

  const adultFare = fare.adultBase;
  const childFare = Math.round(fare.adultBase * fare.childFactor);
  const infantFare =
    international && fare.infantFactor !== null
      ? Math.round(fare.adultBase * fare.infantFactor)
      : (fare.infantFlat ?? 0);

  if (pax.adults > 0) {
    lines.push({
      label: 'Adult',
      count: pax.adults,
      perHead: adultFare,
      total: adultFare * pax.adults,
    });
  }

  if (pax.children > 0) {
    const pct = Math.round((1 - fare.childFactor) * 100);
    lines.push({
      label: 'Child',
      count: pax.children,
      perHead: childFare,
      total: childFare * pax.children,
      note: `${pct}% off the adult fare · ages 2–11`,
    });
  }

  if (pax.infants > 0) {
    lines.push({
      label: 'Infant',
      count: pax.infants,
      perHead: infantFare,
      total: infantFare * pax.infants,
      note:
        international && fare.infantFactor !== null
          ? `${Math.round(fare.infantFactor * 100)}% of the adult fare · on a lap`
          : 'Flat fare · on a lap',
    });
  }

  const subtotal = lines.reduce((n, l) => n + l.total, 0);
  // Infants on a lap are not charged seat taxes
  const taxes = fare.taxPerSeat * seatsNeeded(pax);

  return {
    lines,
    subtotal,
    taxes,
    total: subtotal + taxes,
    leadPrice: adultFare + fare.taxPerSeat,
  };
}

/** Cheapest bookable fare for this party, or null if none can seat them. */
export function bestFareFor(
  flight: MockFlight,
  pax: PaxMix,
): { fare: FareFamily; quote: FareQuote } | null {
  const bookable = flight.fares.filter((f) => fareAvailable(f, pax));
  if (bookable.length === 0) return null;

  const quoted = bookable.map((fare) => ({
    fare,
    quote: quoteFare(fare, pax, flight.international),
  }));

  return quoted.reduce((a, b) => (b.quote.total < a.quote.total ? b : a));
}

/** Total for the whole party at the flight's headline fare. */
export function partyTotal(flight: MockFlight, pax: PaxMix): number {
  const best = bestFareFor(flight, pax);
  return best ? best.quote.total : flight.price * seatsNeeded(pax);
}

// ─── Connection rules ────────────────────────────────────

/**
 * Minimum time needed between two segments. Crossing a border, changing
 * terminal or re-checking bags all add to it; separate tickets add the most,
 * because a delay on the first leg is not the airline's problem.
 */
export function minimumConnectionMinutes(
  arriving: Segment,
  departing: Segment,
  layover: Layover,
): number {
  let base = 45;

  if (arriving.international || departing.international) base = 90;
  if (!arriving.international && departing.international) base = 120;

  if (layover.terminalChange) base += 30;
  if (layover.recheckBaggage) base += 30;
  if (layover.selfTransfer) base += 60;

  return base;
}

// ─── Advisories ──────────────────────────────────────────

export type AdvisoryLevel = 'info' | 'caution' | 'warning';

export interface Advisory {
  id: string;
  level: AdvisoryLevel;
  icon: string;
  title: string;
  detail: string;
}

export function advisoriesFor(flight: MockFlight, pax: PaxMix): Advisory[] {
  const out: Advisory[] = [];

  // Codeshare — the operating carrier sets baggage rules and check-in desk
  flight.segments.forEach((seg, i) => {
    if (seg.operatingCarrier && seg.operatingCarrier !== seg.marketingCarrier) {
      out.push({
        id: `codeshare-${i}`,
        level: 'info',
        icon: 'repeat',
        title: `Operated by ${seg.operatingCarrier}`,
        detail: `Sold as ${seg.marketingFlight} by ${seg.marketingCarrier}. Check in with ${seg.operatingCarrier} and follow their baggage rules.`,
      });
    }
  });

  // Connections
  flight.layovers.forEach((lay, i) => {
    const arriving = flight.segments[i];
    const departing = flight.segments[i + 1];
    if (!arriving || !departing) return;

    const minimum = minimumConnectionMinutes(arriving, departing, lay);

    if (lay.selfTransfer) {
      out.push({
        id: `self-${i}`,
        level: 'warning',
        icon: 'alert-triangle',
        title: `Separate tickets in ${lay.city}`,
        detail:
          'These legs are booked separately. If the first is delayed, the second airline is not obliged to rebook you.',
      });
    }

    if (lay.durationMin < minimum) {
      out.push({
        id: `tight-${i}`,
        level: 'warning',
        icon: 'clock',
        title: `Tight connection in ${lay.city}`,
        detail: `${formatMins(lay.durationMin)} to connect, against a recommended ${formatMins(minimum)} for this transfer.`,
      });
    } else if (lay.durationMin >= 240) {
      out.push({
        id: `long-${i}`,
        level: 'info',
        icon: 'coffee',
        title: `${formatMins(lay.durationMin)} in ${lay.city}`,
        detail: 'A long wait between flights. Worth checking lounge access.',
      });
    }

    if (lay.terminalChange) {
      out.push({
        id: `terminal-${i}`,
        level: 'caution',
        icon: 'shuffle',
        title: `Terminal change in ${lay.city}`,
        detail: `Arrive at ${arriving.destinationTerminal}, depart from ${departing.originTerminal}. Allow time for the transfer.`,
      });
    }

    if (lay.recheckBaggage) {
      out.push({
        id: `recheck-${i}`,
        level: 'caution',
        icon: 'briefcase',
        title: `Collect and re-check bags in ${lay.city}`,
        detail: 'Baggage is not through-checked on this itinerary.',
      });
    }

    if (lay.transitVisa) {
      out.push({
        id: `visa-${i}`,
        level: 'warning',
        icon: 'file-text',
        title: `Transit visa needed for ${lay.city}`,
        detail: 'You must hold a valid transit visa to pass through this airport.',
      });
    }
  });

  // Mixed domestic and international
  if (flight.mixedJourney) {
    out.push({
      id: 'mixed',
      level: 'caution',
      icon: 'globe',
      title: 'Domestic and international legs',
      detail:
        'Check in 3 hours before departure and carry your passport for the whole journey, including the domestic leg.',
    });
  } else if (flight.international) {
    out.push({
      id: 'intl',
      level: 'info',
      icon: 'globe',
      title: 'International flight',
      detail: 'Check in 3 hours before departure. Passport required.',
    });
  }

  // Overnight arrival
  if (flight.arrivalDayOffset > 0) {
    out.push({
      id: 'overnight',
      level: 'info',
      icon: 'moon',
      title: `Arrives ${flight.arrivalDayOffset} day later`,
      detail: `Landing at ${flight.arriveTime} the following day. Plan onward travel accordingly.`,
    });
  }

  // Infants across long journeys
  if (pax.infants > 0 && flight.durationMin > 300) {
    out.push({
      id: 'infant-long',
      level: 'caution',
      icon: 'users',
      title: 'Long journey with an infant',
      detail: `${formatMins(flight.durationMin)} in total. Bassinets are limited and must be requested with the airline.`,
    });
  }

  // Children on self-transfer itineraries
  if (pax.children > 0 && flight.layovers.some((l) => l.selfTransfer)) {
    out.push({
      id: 'child-self',
      level: 'caution',
      icon: 'users',
      title: 'Separate tickets with children',
      detail:
        'Re-checking bags and clearing security again with children takes longer than the minimum connection assumes.',
    });
  }

  return out;
}

export function worstLevel(list: Advisory[]): AdvisoryLevel | null {
  if (list.some((a) => a.level === 'warning')) return 'warning';
  if (list.some((a) => a.level === 'caution')) return 'caution';
  if (list.length > 0) return 'info';
  return null;
}

// ─── Formatting ──────────────────────────────────────────

export function formatMins(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function stopsLabel(flight: MockFlight): string {
  if (flight.stops === 0) return 'Direct';
  if (flight.stops === 1) {
    const lay = flight.layovers[0];
    return lay ? `1 stop in ${lay.airport}` : '1 stop';
  }
  return `${flight.stops} stops`;
}
