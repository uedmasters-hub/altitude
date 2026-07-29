import { allTrips } from './trips';
import { tripStatus, type Trip } from './trip';

/**
 * The account is the home for everything that outlives a single booking:
 * who you are, who you travel with, how you like to fly, and what you have
 * spent. Most of it feeds back into booking so nothing is typed twice.
 */

// ─── Profile ─────────────────────────────────────────────

export interface Profile {
  name: string;
  email: string;
  phone: string;
  /** Passport, so international bookings prefill */
  passportNumber: string | null;
  nationality: string;
  passportExpiry: string | null;
  memberSince: string;
}

export const profile: Profile = {
  name: 'Ramesh Mandal',
  email: 'ramesh@example.com',
  phone: '+91 98100 12345',
  passportNumber: 'M4521786',
  nationality: 'Indian',
  passportExpiry: '14/08/2031',
  memberSince: '2024',
};

// ─── Saved travellers ────────────────────────────────────
//
// The people you book for. Storing them here is the difference between
// re-typing a passport every trip and picking a name.

export interface SavedTraveller {
  id: string;
  name: string;
  relationship: string;
  type: 'adult' | 'child' | 'infant';
  passportNumber: string | null;
  nationality: string;
  passportExpiry: string | null;
  /** Seat and meal defaults carried into booking */
  seatPreference: string | null;
  mealPreference: string | null;
}

export const savedTravellers: SavedTraveller[] = [
  {
    id: 'self',
    name: 'Ramesh Mandal',
    relationship: 'You',
    type: 'adult',
    passportNumber: 'M4521786',
    nationality: 'Indian',
    passportExpiry: '14/08/2031',
    seatPreference: 'Window',
    mealPreference: 'Vegetarian',
  },
  {
    id: 't2',
    name: 'Anita Mandal',
    relationship: 'Spouse',
    type: 'adult',
    passportNumber: 'M4521902',
    nationality: 'Indian',
    passportExpiry: '22/03/2030',
    seatPreference: 'Window',
    mealPreference: 'Vegetarian',
  },
  {
    id: 't3',
    name: 'Aarav Mandal',
    relationship: 'Son',
    type: 'child',
    passportNumber: null,
    nationality: 'Indian',
    passportExpiry: null,
    seatPreference: null,
    mealPreference: null,
  },
];

/** True when a passport is missing or expires within six months of today. */
export function documentNeedsAttention(t: SavedTraveller): boolean {
  if (t.type === 'infant') return false;
  if (!t.passportNumber || !t.passportExpiry) return true;
  const [d, m, y] = t.passportExpiry.split('/').map(Number);
  const expiry = new Date(y, m - 1, d).getTime();
  const sixMonths = Date.now() + 182 * 24 * 3600_000;
  return expiry < sixMonths;
}

// ─── Preferences ─────────────────────────────────────────

export interface Preferences {
  seat: 'Window' | 'Aisle' | 'No preference';
  meal: 'Vegetarian' | 'Non-vegetarian' | 'Vegan' | 'No preference';
  homeAirport: string;
  currency: string;
}

export const preferences: Preferences = {
  seat: 'Window',
  meal: 'Vegetarian',
  homeAirport: 'DEL',
  currency: '₹ INR',
};

// ─── Notifications ───────────────────────────────────────
//
// The assistance layer needs a settings home. Each of these maps to a real
// prompt the product already produces.

export interface NotificationSetting {
  id: string;
  title: string;
  detail: string;
  channel: 'push' | 'email';
  enabled: boolean;
}

export const notificationSettings: NotificationSetting[] = [
  { id: 'checkin', title: 'Check-in reminders', detail: 'When online check-in opens for your flight', channel: 'push', enabled: true },
  { id: 'gate', title: 'Gate and time changes', detail: 'Delays, gate moves, boarding calls', channel: 'push', enabled: true },
  { id: 'docs', title: 'Passport expiry warnings', detail: 'Before a document is too close to expiry to fly', channel: 'push', enabled: true },
  { id: 'fare', title: 'Fare drops on saved routes', detail: 'When a route you watch gets cheaper', channel: 'push', enabled: false },
  { id: 'receipt', title: 'Booking receipts', detail: 'Itemised receipt after each payment', channel: 'email', enabled: true },
];

// ─── Payment methods ─────────────────────────────────────

export interface PaymentMethod {
  id: string;
  kind: 'upi' | 'card';
  label: string;
  detail: string;
  primary: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  { id: 'pm1', kind: 'upi', label: 'UPI', detail: 'ramesh@okhdfcbank', primary: true },
  { id: 'pm2', kind: 'card', label: 'HDFC Credit Card', detail: 'Ending 4821 · expires 09/28', primary: false },
];

// ─── Derived spend and history ───────────────────────────
//
// Nothing new is stored here — it reads the same trip records the itinerary
// and payment history already use, so the numbers can never drift.

export interface SpendSummary {
  totalPaid: number;
  tripCount: number;
  flightsFlown: number;
  upcomingCount: number;
  /** Rolling by calendar year */
  thisYear: number;
  currency: string;
}

export function spendSummary(now: number): SpendSummary {
  const year = new Date(now).getFullYear();
  let total = 0;
  let thisYear = 0;
  let flown = 0;
  let upcoming = 0;

  for (const t of allTrips) {
    const net = netPaid(t);
    total += net;
    if (new Date(t.bookedOn).getFullYear() === year) thisYear += net;
    const status = tripStatus(t, now);
    if (status === 'arrived') flown += 1;
    else if (status !== 'cancelled') upcoming += 1;
  }

  return {
    totalPaid: total,
    tripCount: allTrips.length,
    flightsFlown: flown,
    upcomingCount: upcoming,
    thisYear,
    currency: '₹',
  };
}

/** Net of any refund already recorded on the trip. */
function netPaid(t: Trip): number {
  const refunded = t.refund ? t.refund.amount : 0;
  return t.totalPaid - refunded;
}

export interface RouteFrequency {
  route: string;
  count: number;
}

/** The routes flown most, for a light "your travel" readout. */
export function topRoutes(): RouteFrequency[] {
  const counts = new Map<string, number>();
  for (const t of allTrips) {
    const key = `${t.segments[0].originCity} → ${t.segments[t.segments.length - 1].destinationCity}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([route, count]) => ({ route, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}
