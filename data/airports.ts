import type { Airport } from '../types';

/**
 * Subset of airports for development.
 * Replace with API call in production.
 */
export const airports: Airport[] = [
  { iata: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India', countryCode: 'IN' },
  { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India', countryCode: 'IN' },
  { iata: 'BLR', name: 'Kempegowda International', city: 'Bengaluru', country: 'India', countryCode: 'IN' },
  { iata: 'MAA', name: 'Chennai International', city: 'Chennai', country: 'India', countryCode: 'IN' },
  { iata: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India', countryCode: 'IN' },
  { iata: 'HYD', name: 'Rajiv Gandhi International', city: 'Hyderabad', country: 'India', countryCode: 'IN' },
  { iata: 'GOI', name: 'Manohar International', city: 'Goa', country: 'India', countryCode: 'IN' },
  { iata: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', countryCode: 'AE' },
  { iata: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
  { iata: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', countryCode: 'TH' },
  { iata: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom', countryCode: 'GB' },
  { iata: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', countryCode: 'US' },
  { iata: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan', countryCode: 'JP' },
  { iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', countryCode: 'FR' },
  { iata: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', countryCode: 'AU' },
];

export const popularAirports = airports.filter((a) =>
  ['DEL', 'BOM', 'BLR', 'DXB', 'SIN', 'BKK'].includes(a.iata),
);
