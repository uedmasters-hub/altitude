/**
 * Mock fare data — 90 days from August 2026.
 * Each entry is a daily lowest fare in USD.
 */

const BASE = 750;
const seed = (d: number) => Math.sin(d * 2.37 + 1.5) * 0.5 + 0.5;

export interface DayPrice {
  date: string;   // YYYY-MM-DD
  price: number;
  day: number;
  month: number;
  year: number;
  dayOfWeek: number; // 0=Sun
}

function generatePrices(startYear: number, startMonth: number, days: number): DayPrice[] {
  const prices: DayPrice[] = [];
  const start = new Date(startYear, startMonth - 1, 1);

  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);

    // Price varies by day — weekends slightly higher, some random valleys
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const variation = seed(i) * 400 - 150;
    const weekendPremium = isWeekend ? 120 : 0;
    const price = Math.round(BASE + variation + weekendPremium);

    prices.push({
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      price: Math.max(450, Math.min(1200, price)),
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
      dayOfWeek: d.getDay(),
    });
  }
  return prices;
}

export const fareData = generatePrices(2026, 8, 90);

/** Find the N cheapest unique dates */
export function getCheapestDates(data: DayPrice[], count: number): DayPrice[] {
  return [...data].sort((a, b) => a.price - b.price).slice(0, count);
}

/** Get price range for normalizing histogram */
export function getPriceRange(data: DayPrice[]) {
  let min = Infinity;
  let max = -Infinity;
  for (const d of data) {
    if (d.price < min) min = d.price;
    if (d.price > max) max = d.price;
  }
  return { min, max };
}

/** Get day abbreviation */
export function getDayAbbr(dayOfWeek: number): string {
  return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][dayOfWeek];
}

/** Format month name */
export function getMonthName(month: number): string {
  return [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ][month];
}

/** Split the fare series into calendar months, in order. */
export function groupByMonth(data: DayPrice[]): DayPrice[][] {
  const map = new Map<string, DayPrice[]>();
  for (const d of data) {
    const key = `${d.year}-${String(d.month).padStart(2, '0')}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(d);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, days]) => days.sort((a, b) => a.day - b.day));
}
