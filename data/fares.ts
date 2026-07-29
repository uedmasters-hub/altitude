import type { MockFlight } from './flights';

/**
 * Fare classes — the attributes travellers actually weigh when choosing.
 * Numeric fields exist so we can compute deltas and value scores,
 * not just render strings.
 */
export interface FareClass {
  id: string;
  name: string;
  tier: number;              // 0 = cheapest
  price: number;

  cabinKg: number;
  checkInKg: number;

  meal: string;
  mealIncluded: boolean;

  seatSelection: 'Paid' | 'Free standard' | 'Free any seat' | 'Priority';
  seatFree: boolean;

  changeFee: number;         // 0 = free
  cancelFee: number;         // 0 = free
  refundable: 'none' | 'partial' | 'full';

  priorityBoarding: boolean;
  milesMultiplier: number;   // 1x, 1.25x etc.
}

const REFUND_LABEL: Record<FareClass['refundable'], string> = {
  none: 'Non-refundable',
  partial: 'Partially refundable',
  full: 'Fully refundable',
};

export function refundLabel(r: FareClass['refundable']) {
  return REFUND_LABEL[r];
}

export function feeLabel(amount: number) {
  return amount === 0 ? 'Free' : `₹${amount.toLocaleString()}`;
}

/** Build the fare ladder for a given flight. */
export function getFareClasses(flight: MockFlight): FareClass[] {
  const base = flight.price;

  return [
    {
      id: 'light',
      name: 'Light',
      tier: 0,
      price: base,
      cabinKg: 7,
      checkInKg: 0,
      meal: 'Buy on board',
      mealIncluded: false,
      seatSelection: 'Paid',
      seatFree: false,
      changeFee: 3500,
      cancelFee: 3500,
      refundable: 'none',
      priorityBoarding: false,
      milesMultiplier: 1,
    },
    {
      id: 'economy',
      name: 'Economy',
      tier: 1,
      price: Math.round(base * 1.35),
      cabinKg: 7,
      checkInKg: 15,
      meal: 'Buy on board',
      mealIncluded: false,
      seatSelection: 'Free standard',
      seatFree: true,
      changeFee: 2000,
      cancelFee: 2000,
      refundable: 'partial',
      priorityBoarding: false,
      milesMultiplier: 1,
    },
    {
      id: 'flexi',
      name: 'Flexi',
      tier: 2,
      price: Math.round(base * 1.7),
      cabinKg: 7,
      checkInKg: 20,
      meal: 'Meal included',
      mealIncluded: true,
      seatSelection: 'Free any seat',
      seatFree: true,
      changeFee: 0,
      cancelFee: 1000,
      refundable: 'partial',
      priorityBoarding: false,
      milesMultiplier: 1.25,
    },
    {
      id: 'super',
      name: `Super ${flight.airlineCode}`,
      tier: 3,
      price: Math.round(base * 2.2),
      cabinKg: 10,
      checkInKg: 25,
      meal: 'Premium meal + beverage',
      mealIncluded: true,
      seatSelection: 'Priority',
      seatFree: true,
      changeFee: 0,
      cancelFee: 0,
      refundable: 'full',
      priorityBoarding: true,
      milesMultiplier: 2,
    },
  ];
}

/**
 * What you gain moving from one tier to the next.
 * Returns short phrases, ordered by how much travellers care.
 */
export function getUpgrades(from: FareClass, to: FareClass): string[] {
  const gains: string[] = [];

  if (to.checkInKg > from.checkInKg) {
    const diff = to.checkInKg - from.checkInKg;
    gains.push(
      from.checkInKg === 0
        ? `${to.checkInKg} kg check-in bag`
        : `+${diff} kg check-in`,
    );
  }
  if (to.mealIncluded && !from.mealIncluded) gains.push('Meal included');
  if (to.seatFree && !from.seatFree) gains.push('Free seat choice');
  if (to.changeFee < from.changeFee) {
    gains.push(
      to.changeFee === 0
        ? 'Free date changes'
        : `₹${(from.changeFee - to.changeFee).toLocaleString()} lower change fee`,
    );
  }
  if (to.cancelFee < from.cancelFee) {
    gains.push(
      to.cancelFee === 0
        ? 'Free cancellation'
        : `₹${(from.cancelFee - to.cancelFee).toLocaleString()} lower cancel fee`,
    );
  }
  if (to.refundable !== from.refundable && to.refundable === 'full') {
    gains.push('Full refund');
  }
  if (to.priorityBoarding && !from.priorityBoarding) gains.push('Priority boarding');
  if (to.milesMultiplier > from.milesMultiplier) {
    gains.push(`${to.milesMultiplier}× miles`);
  }

  return gains;
}

/**
 * Pick the fare with the best benefit-per-rupee.
 * Crude but honest: score the perks, divide by the premium paid.
 */
export function getRecommendedFareId(fares: FareClass[]): string {
  const cheapest = fares[0];

  const scored = fares.map((f) => {
    if (f.tier === 0) return { id: f.id, ratio: 0 };

    const value =
      f.checkInKg * 90 +                                   // baggage is the big one
      (f.mealIncluded ? 600 : 0) +
      (f.seatFree ? 500 : 0) +
      (cheapest.changeFee - f.changeFee) * 0.5 +
      (cheapest.cancelFee - f.cancelFee) * 0.5 +
      (f.refundable === 'full' ? 1200 : f.refundable === 'partial' ? 400 : 0) +
      (f.priorityBoarding ? 300 : 0);

    const premium = f.price - cheapest.price;
    return { id: f.id, ratio: premium > 0 ? value / premium : 0 };
  });

  return scored.reduce((best, cur) => (cur.ratio > best.ratio ? cur : best)).id;
}

/** Rows for the side-by-side comparison table. */
export interface CompareRow {
  label: string;
  icon: string;
  render: (f: FareClass) => string;
  /** true when this fare has the best value in the row */
  isBest?: (f: FareClass, all: FareClass[]) => boolean;
}

export const compareRows: CompareRow[] = [
  {
    label: 'Cabin bag',
    icon: 'briefcase',
    render: (f) => `${f.cabinKg} kg`,
    isBest: (f, all) => f.cabinKg === Math.max(...all.map((x) => x.cabinKg)),
  },
  {
    label: 'Check-in bag',
    icon: 'package',
    render: (f) => (f.checkInKg === 0 ? 'Not included' : `${f.checkInKg} kg`),
    isBest: (f, all) => f.checkInKg === Math.max(...all.map((x) => x.checkInKg)),
  },
  {
    label: 'Meal',
    icon: 'coffee',
    render: (f) => f.meal,
    isBest: (f) => f.mealIncluded,
  },
  {
    label: 'Seat',
    icon: 'grid',
    render: (f) => f.seatSelection,
    isBest: (f) => f.seatSelection === 'Priority',
  },
  {
    label: 'Date change',
    icon: 'calendar',
    render: (f) => feeLabel(f.changeFee),
    isBest: (f) => f.changeFee === 0,
  },
  {
    label: 'Cancellation',
    icon: 'x-circle',
    render: (f) => feeLabel(f.cancelFee),
    isBest: (f) => f.cancelFee === 0,
  },
  {
    label: 'Refund',
    icon: 'rotate-ccw',
    render: (f) => refundLabel(f.refundable),
    isBest: (f) => f.refundable === 'full',
  },
  {
    label: 'Boarding',
    icon: 'log-in',
    render: (f) => (f.priorityBoarding ? 'Priority' : 'Standard'),
    isBest: (f) => f.priorityBoarding,
  },
  {
    label: 'Miles',
    icon: 'award',
    render: (f) => `${f.milesMultiplier}×`,
    isBest: (f, all) => f.milesMultiplier === Math.max(...all.map((x) => x.milesMultiplier)),
  },
];
