# Altitude MVP Scope

What we're building, screen by screen.

---

## Flow

```
Home → Airport Search → Date Select → Flight Recommendations → Booking
```

Each screen has one job. User moves forward by completing it.

---

## Screens

### Home (`/`)

**Job:** Collect origin, destination, dates, passengers.

- "Where to?" display title, anchored bottom
- Tappable fields that open dedicated pickers (airport search, calendar)
- Passenger count inline (adults, children, infants)
- Single CTA: "Search flights"
- Trip type toggle (one-way / round trip) — subtle, not primary

**Not included:** cabin class picker (default economy, expose later), multi-city.

---

### Airport Search (`/airport-search`)

**Job:** Pick an airport quickly.

- Bottom-anchored search input (auto-focused)
- Results grow upward from search bar
- Sections: Recent → Popular → All results
- Each row shows: city, airport name, IATA code
- Tap to select → returns to Home with field filled

**Not included:** nearby airports (needs location permission), map view.

---

### Date Select (`/date-select`)

**Job:** Pick travel dates confidently.

- Standard calendar grid (familiar pattern)
- Enhanced with: cheapest date highlights, fare trend indicator
- Round trip: select range. One-way: single date.
- Bottom CTA: "Confirm dates"

**Not included:** flexible date search ("±3 days"), fare calendar view.

---

### Flight Recommendations (`/flights`)

**Job:** Help user decide, not compare everything.

- 3 curated recommendations: Best Value, Cheapest, Fastest
- Each card shows: airline, times, duration, stops, price, tag with reason
- Tap card → expands details (segments, layover info)
- Bottom CTA: "Book this flight"
- Secondary action: "See all flights" (flat list, no infinite scroll)

**Not included:** filters, sorting, airline filtering, fare class comparison.

---

### Booking (`/booking`)

**Job:** Complete purchase with zero friction.

- Summary: route, date, passengers, selected flight
- Passenger details form (name, email, phone — minimal)
- Price breakdown (base + taxes, no hidden fees)
- Single CTA: "Confirm booking"
- No upsells. No seat selection. No insurance prompts.

**Not included:** payment integration (MVP can end at confirmation), seat map, meal selection, insurance, loyalty points.

---

## What's explicitly out

See README for full list. Highlights:

- No hotels, cabs, activities
- No AI assistant
- No loyalty or wallet features
- No multi-city
- No flex dates
- No filters on results

These are future phases. The MVP succeeds by doing less, better.

---

## Success criteria

A user should be able to go from "I want to fly to Goa" to "flight booked" in under 60 seconds of active interaction. If any screen makes them pause and think "what do I do here?", the design has failed.
