import type { MockFlight } from '../data/flights';

/**
 * Turning raw flight rows into the things a traveller actually asks:
 * "is this cheap?", "what do I give up?", "when does it leave?"
 */

// ─── Departure bands ─────────────────────────────────────

export type Band = 'early' | 'morning' | 'afternoon' | 'evening' | 'night';

export const BAND_LABEL: Record<Band, string> = {
  early: 'Early',
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Night',
};

export const BAND_RANGE: Record<Band, string> = {
  early: '00:00 – 05:59',
  morning: '06:00 – 11:59',
  afternoon: '12:00 – 17:59',
  evening: '18:00 – 21:59',
  night: '22:00 – 23:59',
};

export function getBand(time: string): Band {
  const hour = Number(time.split(':')[0]);
  if (hour < 6) return 'early';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'night';
}

// ─── Price + duration stats ──────────────────────────────

export interface Stats {
  minPrice: number;
  maxPrice: number;
  medianPrice: number;
  minDuration: number;
  maxDuration: number;
}

export function getStats(flights: MockFlight[]): Stats {
  if (!flights.length) {
    return { minPrice: 0, maxPrice: 0, medianPrice: 0, minDuration: 0, maxDuration: 0 };
  }
  const prices = flights.map((f) => f.price).sort((a, b) => a - b);
  const durations = flights.map((f) => f.durationMin).sort((a, b) => a - b);
  return {
    minPrice: prices[0],
    maxPrice: prices[prices.length - 1],
    medianPrice: prices[Math.floor(prices.length / 2)],
    minDuration: durations[0],
    maxDuration: durations[durations.length - 1],
  };
}

/** 0 → cheapest in the set, 1 → most expensive. */
export function pricePosition(flight: MockFlight, stats: Stats): number {
  const span = stats.maxPrice - stats.minPrice;
  return span === 0 ? 0 : (flight.price - stats.minPrice) / span;
}

/** 0 → fastest in the set, 1 → slowest. */
export function durationPosition(flight: MockFlight, stats: Stats): number {
  const span = stats.maxDuration - stats.minDuration;
  return span === 0 ? 0 : (flight.durationMin - stats.minDuration) / span;
}

// ─── Deltas ──────────────────────────────────────────────

export interface Delta {
  priceDiff: number;      // + means costs more
  minutesDiff: number;    // − means faster
  parts: string[];        // short human phrases
}

export function formatMinutes(mins: number): string {
  const abs = Math.abs(mins);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** How this flight compares to the cheapest one on offer. */
export function getDelta(flight: MockFlight, baseline: MockFlight): Delta {
  const priceDiff = flight.price - baseline.price;
  const minutesDiff = flight.durationMin - baseline.durationMin;
  const parts: string[] = [];

  if (priceDiff === 0) {
    parts.push('Cheapest fare');
  } else {
    parts.push(`+₹${priceDiff.toLocaleString()}`);
  }

  if (minutesDiff < 0) {
    parts.push(`${formatMinutes(minutesDiff)} faster`);
  } else if (minutesDiff > 0) {
    parts.push(`${formatMinutes(minutesDiff)} longer`);
  }

  if (flight.stops < baseline.stops) parts.push('Fewer stops');
  if (flight.refundable && !baseline.refundable) parts.push('Refundable');

  return { priceDiff, minutesDiff, parts };
}

// ─── Filters ─────────────────────────────────────────────

export interface Filters {
  direct: boolean;
  refundable: boolean;
  bands: Set<Band>;
}

export const emptyFilters = (): Filters => ({
  direct: false,
  refundable: false,
  bands: new Set<Band>(),
});

export function applyFilters(flights: MockFlight[], f: Filters): MockFlight[] {
  return flights.filter((flight) => {
    if (f.direct && flight.stops > 0) return false;
    if (f.refundable && !flight.refundable) return false;
    if (f.bands.size > 0 && !f.bands.has(getBand(flight.departTime))) return false;
    return true;
  });
}

export function countMatching(
  flights: MockFlight[],
  predicate: (f: MockFlight) => boolean,
): number {
  return flights.filter(predicate).length;
}

export function hasActiveFilters(f: Filters): boolean {
  return f.direct || f.refundable || f.bands.size > 0;
}

// ─── Picks ───────────────────────────────────────────────

export type PickKind = 'cheapest' | 'fastest' | 'bestValue';

export interface Pick {
  kind: PickKind;
  flight: MockFlight;
  reason: string;
}

/**
 * Three genuinely different answers rather than one sorted list.
 * Best value balances price against time using the spread of this
 * particular result set, so it adapts when filters narrow things down.
 */
export function getPicks(flights: MockFlight[]): Pick[] {
  if (flights.length === 0) return [];

  const stats = getStats(flights);
  const cheapest = flights.reduce((a, b) => (b.price < a.price ? b : a));
  const fastest = flights.reduce((a, b) => (b.durationMin < a.durationMin ? b : a));

  const bestValue = flights.reduce((best, f) => {
    const score = (x: MockFlight) =>
      pricePosition(x, stats) * 0.6 +
      durationPosition(x, stats) * 0.3 +
      (x.stops > 0 ? 0.15 : 0) +
      (x.refundable ? -0.08 : 0);
    return score(f) < score(best) ? f : best;
  });

  const picks: Pick[] = [];
  const used = new Set<string>();

  const add = (kind: PickKind, flight: MockFlight, reason: string) => {
    if (used.has(flight.id)) return;
    used.add(flight.id);
    picks.push({ kind, flight, reason });
  };

  add('bestValue', bestValue, buildValueReason(bestValue, cheapest, fastest));
  add('cheapest', cheapest, `Lowest fare of ${flights.length} options`);
  add(
    'fastest',
    fastest,
    fastest.durationMin === stats.minDuration
      ? `Shortest journey · ${fastest.duration}`
      : `Quickest available · ${fastest.duration}`,
  );

  return picks;
}

function buildValueReason(
  value: MockFlight,
  cheapest: MockFlight,
  fastest: MockFlight,
): string {
  if (value.id === cheapest.id) return 'Cheapest and well timed';
  const priceGap = value.price - cheapest.price;
  const timeGain = cheapest.durationMin - value.durationMin;
  if (timeGain > 0) {
    return `₹${priceGap.toLocaleString()} more, ${formatMinutes(timeGain)} shorter`;
  }
  if (value.refundable) return `₹${priceGap.toLocaleString()} more, fully flexible`;
  return `Balanced on price and time`;
}
