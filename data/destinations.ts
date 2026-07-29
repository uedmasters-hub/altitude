/**
 * Destination inspiration data.
 *
 * Scope note: this exists to help someone decide *where to fly*, which is
 * squarely inside the flight-booking MVP. It deliberately stops short of
 * hotels, activities or itineraries — those belong to later phases.
 */

export interface MonthPrice {
  month: string;   // 'Jan'
  price: number;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  iata: string;
  tagline: string;
  image: string;
  /** Direct flight time from Delhi, in minutes */
  flightMinutes: number;
  direct: boolean;
  fromPrice: number;
  /** Typical fare, so a low price reads as a genuine deal */
  typicalPrice: number;
  bestMonths: string[];
  seasonNote: string;
  reasons: string[];
  prices: MonthPrice[];
  weekendable: boolean;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function series(base: number, shape: number[]): MonthPrice[] {
  return MONTHS.map((month, i) => ({
    month,
    price: Math.round(base * shape[i]),
  }));
}

export const destinations: Destination[] = [
  {
    id: 'bali',
    city: 'Bali',
    country: 'Indonesia',
    iata: 'DPS',
    tagline: 'Morning mist in the valley',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=1000&fit=crop',
    flightMinutes: 465,
    direct: false,
    fromPrice: 18400,
    typicalPrice: 24000,
    bestMonths: ['Apr', 'May', 'Jun', 'Sep'],
    seasonNote: 'Dry season runs April to October. Shoulder months are quietest.',
    reasons: [
      'Rice terraces are greenest just after the rains',
      'Shoulder season means lighter crowds at Ubud',
      'Fares dip sharply outside July and August',
    ],
    prices: series(18400, [1.15, 1.1, 1.0, 0.92, 0.9, 0.95, 1.3, 1.35, 0.94, 1.0, 1.08, 1.25]),
    weekendable: false,
  },
  {
    id: 'kyoto',
    city: 'Kyoto',
    country: 'Japan',
    iata: 'KIX',
    tagline: 'Autumnal reflections',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=1000&fit=crop',
    flightMinutes: 540,
    direct: false,
    fromPrice: 32600,
    typicalPrice: 38000,
    bestMonths: ['Mar', 'Apr', 'Oct', 'Nov'],
    seasonNote: 'Cherry blossom in early April, maple colour through November.',
    reasons: [
      'Temple gardens peak in late November',
      'Cooler air makes long walking days easy',
      'Rail passes make onward travel cheap',
    ],
    prices: series(32600, [1.0, 0.98, 1.22, 1.3, 1.0, 0.9, 1.05, 1.12, 0.95, 1.18, 1.25, 1.05]),
    weekendable: false,
  },
  {
    id: 'goa',
    city: 'Goa',
    country: 'India',
    iata: 'GOI',
    tagline: 'Long evenings by the water',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=1000&fit=crop',
    flightMinutes: 155,
    direct: true,
    fromPrice: 4200,
    typicalPrice: 6800,
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb'],
    seasonNote: 'Clear skies November to February. Monsoon closes many beach shacks.',
    reasons: [
      'Two and a half hours door to door',
      'Direct flights run through the day',
      'Off-season fares are less than half of December',
    ],
    prices: series(4200, [1.25, 1.15, 0.95, 0.85, 0.8, 0.7, 0.68, 0.72, 0.85, 1.0, 1.3, 1.55]),
    weekendable: true,
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    country: 'India',
    iata: 'JAI',
    tagline: 'Sandstone and stepwells',
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=1000&fit=crop',
    flightMinutes: 65,
    direct: true,
    fromPrice: 2650,
    typicalPrice: 3900,
    bestMonths: ['Oct', 'Nov', 'Dec', 'Feb'],
    seasonNote: 'Winter is mild and dry. Summers climb past 40°C.',
    reasons: [
      'Barely an hour in the air',
      'Easy to leave Friday evening and return Sunday',
      'Cheapest weekend option from Delhi',
    ],
    prices: series(2650, [1.1, 1.05, 0.95, 0.85, 0.75, 0.7, 0.75, 0.8, 0.9, 1.15, 1.25, 1.2]),
    weekendable: true,
  },
  {
    id: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    iata: 'BKK',
    tagline: 'Late markets and river light',
    image:
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=1000&fit=crop',
    flightMinutes: 245,
    direct: true,
    fromPrice: 11200,
    typicalPrice: 15500,
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb'],
    seasonNote: 'Cool and dry from November. April is the hottest month.',
    reasons: [
      'Direct in just over four hours',
      'Visa on arrival keeps planning simple',
      'Strong fare competition keeps prices low',
    ],
    prices: series(11200, [1.15, 1.1, 1.0, 0.9, 0.85, 0.88, 0.95, 1.0, 0.87, 0.95, 1.2, 1.35]),
    weekendable: true,
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    iata: 'DXB',
    tagline: 'Desert winter, city nights',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=1000&fit=crop',
    flightMinutes: 210,
    direct: true,
    fromPrice: 13800,
    typicalPrice: 17200,
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    seasonNote: 'Pleasant November to March. Avoid the July heat.',
    reasons: [
      'Dozens of direct flights every day',
      'Three and a half hours from Delhi',
      'Short-notice fares stay reasonable',
    ],
    prices: series(13800, [1.05, 1.0, 0.95, 0.9, 0.85, 0.8, 0.78, 0.85, 0.92, 1.0, 1.15, 1.28],
    ),
    weekendable: true,
  },
];

export const weekendEscapes = destinations.filter((d) => d.weekendable);

/** Destinations currently priced well below their typical fare. */
export const dealsNow = [...destinations]
  .map((d) => ({ dest: d, saving: d.typicalPrice - d.fromPrice }))
  .filter((x) => x.saving > 0)
  .sort((a, b) => b.saving / b.dest.typicalPrice - a.saving / a.dest.typicalPrice)
  .slice(0, 4);

// ─── Origin airports ─────────────────────────────────────

export interface NearbyAirport {
  iata: string;
  name: string;
  city: string;
  distanceKm: number;
  driveMinutes: number;
}

export const nearbyAirports: NearbyAirport[] = [
  { iata: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', distanceKm: 16, driveMinutes: 35 },
  { iata: 'JAI', name: 'Jaipur International', city: 'Jaipur', distanceKm: 268, driveMinutes: 260 },
  { iata: 'LKO', name: 'Chaudhary Charan Singh', city: 'Lucknow', distanceKm: 494, driveMinutes: 420 },
  { iata: 'ATQ', name: 'Sri Guru Ram Dass Jee', city: 'Amritsar', distanceKm: 447, driveMinutes: 390 },
];

export const recentOrigins: NearbyAirport[] = [
  { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj', city: 'Mumbai', distanceKm: 1153, driveMinutes: 0 },
  { iata: 'BLR', name: 'Kempegowda International', city: 'Bengaluru', distanceKm: 1740, driveMinutes: 0 },
];

// ─── Helpers ─────────────────────────────────────────────

export function formatFlightTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function cheapestMonth(d: Destination): MonthPrice {
  return d.prices.reduce((a, b) => (b.price < a.price ? b : a));
}

export function priceBounds(d: Destination) {
  const values = d.prices.map((p) => p.price);
  return { min: Math.min(...values), max: Math.max(...values) };
}
