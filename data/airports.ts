import type { Airport } from '../types';

/**
 * Indian + international airports for development.
 * Replace with API call in production.
 */
export const airports: Airport[] = [
  // India — A
  { iata: 'AMD', name: 'Sardar Vallabhbhai Patel International', city: 'Ahmedabad', country: 'India', countryCode: 'IN' },
  { iata: 'ATQ', name: 'Sri Guru Ram Dass Jee International', city: 'Amritsar', country: 'India', countryCode: 'IN' },
  { iata: 'IXD', name: 'Bamrauli Airport', city: 'Allahabad', country: 'India', countryCode: 'IN' },
  { iata: 'AGR', name: 'Pandit Deen Dayal Upadhyay Airport', city: 'Agra', country: 'India', countryCode: 'IN' },

  // B
  { iata: 'BLR', name: 'Kempegowda International', city: 'Bengaluru', country: 'India', countryCode: 'IN' },
  { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India', countryCode: 'IN' },
  { iata: 'BHO', name: 'Raja Bhoj Airport', city: 'Bhopal', country: 'India', countryCode: 'IN' },
  { iata: 'BBI', name: 'Biju Patnaik International', city: 'Bhubaneswar', country: 'India', countryCode: 'IN' },
  { iata: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', countryCode: 'TH' },
  { iata: 'BDQ', name: 'Vadodara Airport', city: 'Baroda', country: 'India', countryCode: 'IN' },

  // C
  { iata: 'MAA', name: 'Chennai International', city: 'Chennai', country: 'India', countryCode: 'IN' },
  { iata: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India', countryCode: 'IN' },
  { iata: 'COK', name: 'Cochin International', city: 'Cochin', country: 'India', countryCode: 'IN' },
  { iata: 'CJB', name: 'Coimbatore International', city: 'Coimbatore', country: 'India', countryCode: 'IN' },
  { iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', countryCode: 'FR' },

  // D
  { iata: 'DEL', name: 'Indira Gandhi International', city: 'Delhi', country: 'India', countryCode: 'IN' },
  { iata: 'DED', name: 'Jolly Grant Airport', city: 'Dehradun', country: 'India', countryCode: 'IN' },
  { iata: 'DHM', name: 'Gaggal Airport', city: 'Dharamshala', country: 'India', countryCode: 'IN' },
  { iata: 'DIB', name: 'Dibrugarh Airport', city: 'Dibrugarh', country: 'India', countryCode: 'IN' },
  { iata: 'DMU', name: 'Dimapur Airport', city: 'Dimapur', country: 'India', countryCode: 'IN' },
  { iata: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', countryCode: 'AE' },

  // G
  { iata: 'GOI', name: 'Manohar International', city: 'Goa - South', country: 'India', countryCode: 'IN' },
  { iata: 'GOX', name: 'Mopa International', city: 'Goa - North', country: 'India', countryCode: 'IN' },
  { iata: 'GOP', name: 'Gorakhpur Airport', city: 'Gorakhpur', country: 'India', countryCode: 'IN' },
  { iata: 'GAU', name: 'Lokpriya Gopinath Bordoloi International', city: 'Guwahati', country: 'India', countryCode: 'IN' },
  { iata: 'GWL', name: 'Rajmata Vijaya Raje Scindia Airport', city: 'Gwalior', country: 'India', countryCode: 'IN' },

  // H
  { iata: 'HYD', name: 'Rajiv Gandhi International', city: 'Hyderabad', country: 'India', countryCode: 'IN' },
  { iata: 'HBX', name: 'Hubballi Airport', city: 'Hubballi', country: 'India', countryCode: 'IN' },

  // I
  { iata: 'IDR', name: 'Devi Ahilyabai Holkar Airport', city: 'Indore', country: 'India', countryCode: 'IN' },
  { iata: 'IMF', name: 'Bir Tikendrajit International', city: 'Imphal', country: 'India', countryCode: 'IN' },

  // J
  { iata: 'JAI', name: 'Jaipur International', city: 'Jaipur', country: 'India', countryCode: 'IN' },
  { iata: 'JDH', name: 'Jodhpur Airport', city: 'Jodhpur', country: 'India', countryCode: 'IN' },
  { iata: 'IXJ', name: 'Jammu Airport', city: 'Jammu', country: 'India', countryCode: 'IN' },
  { iata: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'United States', countryCode: 'US' },

  // K
  { iata: 'CCU', name: 'Netaji Subhas Chandra Bose International', city: 'Kolkata', country: 'India', countryCode: 'IN' },
  { iata: 'CNN', name: 'Kannur International', city: 'Kannur', country: 'India', countryCode: 'IN' },

  // L
  { iata: 'LKO', name: 'Chaudhary Charan Singh International', city: 'Lucknow', country: 'India', countryCode: 'IN' },
  { iata: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom', countryCode: 'GB' },

  // M
  { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India', countryCode: 'IN' },
  { iata: 'IXM', name: 'Madurai Airport', city: 'Madurai', country: 'India', countryCode: 'IN' },
  { iata: 'IXE', name: 'Mangalore International', city: 'Mangalore', country: 'India', countryCode: 'IN' },

  // N
  { iata: 'NAG', name: 'Dr. Babasaheb Ambedkar International', city: 'Nagpur', country: 'India', countryCode: 'IN' },
  { iata: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan', countryCode: 'JP' },

  // P
  { iata: 'PAT', name: 'Jay Prakash Narayan International', city: 'Patna', country: 'India', countryCode: 'IN' },
  { iata: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India', countryCode: 'IN' },

  // R
  { iata: 'RPR', name: 'Swami Vivekananda Airport', city: 'Raipur', country: 'India', countryCode: 'IN' },
  { iata: 'RAJ', name: 'Rajkot Airport', city: 'Rajkot', country: 'India', countryCode: 'IN' },
  { iata: 'IXR', name: 'Birsa Munda Airport', city: 'Ranchi', country: 'India', countryCode: 'IN' },

  // S
  { iata: 'SXR', name: 'Sheikh ul-Alam International', city: 'Srinagar', country: 'India', countryCode: 'IN' },
  { iata: 'SIN', name: 'Changi Airport', city: 'Singapore', country: 'Singapore', countryCode: 'SG' },
  { iata: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', countryCode: 'AU' },
  { iata: 'STV', name: 'Surat Airport', city: 'Surat', country: 'India', countryCode: 'IN' },

  // T
  { iata: 'TRV', name: 'Trivandrum International', city: 'Thiruvananthapuram', country: 'India', countryCode: 'IN' },
  { iata: 'TRZ', name: 'Tiruchirappalli International', city: 'Tiruchirappalli', country: 'India', countryCode: 'IN' },

  // U
  { iata: 'UDR', name: 'Maharana Pratap Airport', city: 'Udaipur', country: 'India', countryCode: 'IN' },

  // V
  { iata: 'VNS', name: 'Lal Bahadur Shastri International', city: 'Varanasi', country: 'India', countryCode: 'IN' },
  { iata: 'VGA', name: 'Vijayawada Airport', city: 'Vijayawada', country: 'India', countryCode: 'IN' },
  { iata: 'VTZ', name: 'Visakhapatnam Airport', city: 'Visakhapatnam', country: 'India', countryCode: 'IN' },
];

// Dedupe by city name (some cities listed twice with same IATA)
const seen = new Set<string>();
export const allAirports = airports.filter((a) => {
  const key = a.city;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

export const popularAirports = allAirports.filter((a) =>
  ['DEL', 'BOM', 'BLR', 'DXB', 'SIN', 'BKK'].includes(a.iata),
);
