# Design Decisions

Significant design decisions and their rationale. Update status when decisions are superseded or deprecated — never delete history.

---

## DD-001: Traditional calendar for date selection

**Status:** Accepted

**Context:** Many travel products experiment with alternative date pickers, increasing learning curve.

**Decision:** Use a familiar monthly calendar. Enhance with fare insights rather than replacing the interaction.

**Rationale:** Users already understand calendars. Familiarity reduces cognitive load and speeds up task completion.

---

## DD-002: Bottom-anchored airport search

**Status:** Accepted

**Context:** Traditional search places the field at top of screen, requiring users to reach away from the keyboard.

**Decision:** Anchor search input near the bottom. Airport list expands upward.

**Rationale:** Keeps search within natural thumb reach. Reduces unnecessary hand movement.

---

## DD-003: Recommendation before comparison

**Status:** Accepted

**Context:** Traditional flight booking shows long lists requiring users to compare multiple attributes.

**Decision:** Present recommended journeys first, followed by alternatives.

**Rationale:** Recommendation-driven experiences reduce decision fatigue while still allowing exploration.

---

## DD-004: Progressive disclosure

**Status:** Accepted

**Context:** Displaying all options at once overwhelms users.

**Decision:** Reveal information and controls only when they become relevant.

**Rationale:** Users focus on completing one step at a time. Simpler screens, better task completion.

---

## DD-005: One primary action per screen

**Status:** Accepted

**Context:** Multiple competing CTAs make it hard to identify the next step.

**Decision:** Each screen emphasizes a single primary action.

**Rationale:** Clear next step improves confidence and reduces hesitation.

---

## DD-006: Bottom sheets for selection workflows

**Status:** Accepted

**Context:** Selection tasks interrupt flow when presented as separate screens.

**Decision:** Use bottom sheets for airport search, passenger selection, cabin class, fare details.

**Rationale:** Bottom sheets preserve context while reducing navigation depth.

---

## DD-007: Recommendation over feature density

**Status:** Accepted

**Context:** Travel apps compete by adding more filters and comparison tools.

**Decision:** Prioritize guidance and recommendations over feature-heavy interfaces.

**Rationale:** Helping users decide is more valuable than presenting every option. Stronger product differentiation.

---

## DD-008: Flight-first MVP

**Status:** Accepted

**Context:** Project Altitude aims to become a broader travel platform, but expanding MVP would increase complexity.

**Decision:** Limit MVP to end-to-end flight booking only.

**Rationale:** Focused scope enables faster iteration and validates the core experience before expanding.

---

## DD-009: Purple primary color

**Status:** Accepted

**Context:** Needed a brand color that feels premium and calm without competing with semantic colors (green/red/amber).

**Decision:** Purple (#7C3AED) as the primary interactive color. Neutrals compose 90% of the interface.

**Rationale:** Purple sits outside the semantic color space (success/warning/error), avoiding confusion. Reads as premium without being loud. Works well at both full and soft (tinted background) applications.

---

## DD-010: No external UI libraries

**Status:** Accepted

**Context:** Libraries like RN Paper, Tamagui, or NativeWind could accelerate development.

**Decision:** Build all components from design tokens. No external UI dependencies.

**Rationale:** The design language is custom. A library would fight it, and every override erodes the consistency benefit the library was supposed to provide. Hand-built primitives stay small and fully controlled.

---

---

## DD-011: Destination detail before flight search

**Status:** Accepted

**Context:** Tapping an inspiration card could jump straight to flight results, but that skips the question the card actually raised — "is this somewhere I want to go?"

**Decision:** Destination cards open a detail sheet covering flight time, routing, fares across the year, best months and reasons to go. The sheet's single CTA moves on to flight search.

**Rationale:** Progressive disclosure. Deciding *where* and deciding *which flight* are different tasks, and collapsing them forces a commitment before the information to make it has been shown. The detail stays inside flight-booking scope: it is all routing, timing and fare context, not hotels or itineraries.

---

## DD-012: "Import journey" removed from Home

**Status:** Accepted

**Context:** The Home reference included an "Import journey" row.

**Decision:** Removed from the MVP build.

**Rationale:** Importing an existing booking is trip management, which the README lists under Journey Management for a later phase. Building it now would pull trip storage, parsing and a trips surface into an MVP scoped to booking one flight.

---

## DD-013: Out-of-scope tabs state their status

**Status:** Accepted

**Context:** The tab bar shows Explore, Trips, Saved and Account. Only Explore is in MVP scope, but removing the bar would diverge from the intended app shell and make Home feel unanchored.

**Decision:** Keep the four tabs. Explore is live; the others surface a brief inline notice saying the section arrives in a later release.

**Rationale:** A tab that silently does nothing reads as a bug. Saying so plainly is more honest than either faking the destination or shipping a bar with three dead targets, and it keeps the shell intact for when those sections land.

---

## DD-014: Origin is detected, not asked for

**Status:** Accepted

**Context:** Traditional booking forms open with an empty origin field, which is a question the app can usually answer itself.

**Decision:** Home assumes a departure airport and shows it as a tappable pill. The picker offers location detection, nearby airports ranked by distance with drive times, and recent origins.

**Rationale:** Progressive disclosure again — the destination is the real decision, so the origin should be a confirmation rather than a form field. Distance and drive time are shown because the closest airport is not always the right one.

---

## DD-015: Passengers dominate, extras stay quiet

**Status:** Accepted

**Context:** Review-and-pay screens usually give equal weight to passengers, seats, meals, baggage and payment, which turns the page into a wall of controls.

**Decision:** Passengers get full cards with status. Seats, meals, baggage and assistance are single rows showing their current state and an add or edit affordance; the detail lives in sheets.

**Rationale:** Passenger details are mandatory and error-prone. Extras are optional and most travellers skip them. Giving them equal visual weight makes the required work harder to find.

---

## DD-016: Blocked payment names the specific blocker

**Status:** Accepted

**Context:** A disabled pay button with no explanation leaves people hunting for the problem.

**Decision:** The button stays tappable and reads "Continue" while anything is outstanding. Tapping it marks the form as attempted, scrolls to the relevant section, highlights the offending rows, and surfaces one specific message such as "Two passengers still need details".

**Rationale:** One blocker at a time, named plainly, beats a greyed-out control. Highlighting only appears after an attempt, so a half-finished form is not covered in warnings.

---

## DD-017: Payment credentials collected off-page

**Status:** Accepted

**Context:** The page could include card number, expiry and CVV fields inline.

**Decision:** The page selects a payment method only. A note explains that details are collected by the payment provider on the next screen.

**Rationale:** Card capture belongs to a PCI-compliant provider, not to our form. Selecting a method is enough to unblock the flow, and it keeps the page low-density as intended.

---

## DD-018: Party size drives price and availability

**Status:** Accepted

**Context:** Results were priced per adult with no head count, so a family of four saw a number nobody would pay and flights with two seats left looked bookable.

**Decision:** Search carries a passenger mix of adults, children and infants. Cards show the party total. Infants do not consume seat inventory because they travel on a lap, so seats needed is adults plus children.

**Rationale:** The price a group actually pays is the only number worth showing them. Seat inventory is the binding constraint on whether a flight is an option at all, and it cannot be evaluated without knowing the head count.

---

## DD-019: Unbookable flights are shown, not hidden

**Status:** Accepted

**Context:** When a flight has fewer seats than the party needs, it could be filtered out silently.

**Decision:** Such flights sink to a labelled section at the bottom, dimmed, with the reason stated — "Only 2 seats left, you need 4" — and a disabled action.

**Rationale:** Silently removing results makes people think the app is broken or the route is thin. Naming the constraint lets them decide whether to split the booking or change dates, and preserves the sense that they are seeing the whole market.

---

## DD-020: Fare discounts are derived, not assumed

**Status:** Accepted

**Context:** Child and infant fares differ by carrier and by whether the route crosses a border, so a single flat discount would misprice most itineraries.

**Decision:** Each fare family carries a child factor and either a flat infant fare (domestic) or an infant factor (international). Quotes list each passenger type separately with the discount explained.

**Rationale:** Showing "25% off the adult fare · ages 2–11" tells travellers why the number is what it is, and sets the expectation that a date of birth will be verified at check-in.

---

## DD-021: Codeshare and connection risk surface on the card

**Status:** Accepted

**Context:** A flight sold by one airline and flown by another changes which desk to check in at and whose baggage rules apply. Separate tickets mean a missed connection is not the airline's problem.

**Decision:** Segments carry marketing and operating carriers. Layovers carry terminal change, baggage re-check, transit visa and self-transfer flags. These generate advisories graded info, caution or warning, with the most serious shown on the collapsed card.

**Rationale:** These are the facts that turn a cheap fare into a bad trip, and burying them until checkout is how travel products lose trust. Minimum connection time is computed from the actual transfer conditions rather than assumed.

---

## DD-022: The itinerary is one screen driven by time

**Status:** Accepted

**Context:** What a traveller can do with a booking changes constantly — check-in opens two days out, closes a couple of hours before departure, the gate closes after that, then the flight goes. Modelling that as separate screens or manual tabs pushes the bookkeeping onto the user.

**Decision:** A single screen with one primary action that rewrites itself from the current time: "Check-in opens soon" with a countdown, then "Web check-in", then "View boarding pass", then "Check in at the airport" once the window has closed. Every deadline in the interface is derived from the departure timestamp.

**Rationale:** There is exactly one thing worth doing at any moment in a booking's life. Showing that one thing, with the deadline attached, removes the need to reason about airline cut-off rules.

---

## DD-023: Post-booking cross-sell is limited to flight ancillaries

**Status:** Accepted

**Context:** Confirmation screens are a conventional place to sell hotels, cabs and activities.

**Decision:** The itinerary offers baggage, seat upgrades, lounge access, fast-track security, trip protection and meal changes. Hotels, cabs and activities are not offered.

**Rationale:** Everything listed attaches to the flight itself and is inside the MVP. Hotels and cabs are separate products that the README places in a later phase, and adding them here would quietly expand scope. Each item shows its cut-off and, where it applies, the saving against the airport price — so the offer is useful rather than pressure. Items past their cut-off stay visible but locked, with the reason given.

---

## DD-024: Ancillaries and check-in exclude lap infants

**Status:** Accepted

**Context:** An infant on a lap has no seat, so seat upgrades, extra baggage allowance and lounge passes do not apply, and no separate boarding pass is issued.

**Decision:** Infants are filtered out of check-in selection and ancillary purchase, with a line explaining why rather than a silent omission.

**Rationale:** A missing traveller looks like a bug. Naming the rule prevents someone hunting for their child's boarding pass at the airport.

---

## DD-025: Extras go through a real payment step

**Status:** Accepted

**Context:** Adding an ancillary applied it instantly, which skipped the charge and left the itinerary describing something nobody had paid for.

**Decision:** The ancillary sheet runs select → pay → processing → result. On success the purchase writes back to the booking: baggage allowance increases, seats change, the extras list grows, the payment ledger gains a row and the total updates. Declines are a first-class outcome with a retry.

**Rationale:** A confirmation that precedes payment is a lie about the state of the booking. Modelling the decline path matters more than the happy path, because that is where a naive flow leaves the record inconsistent.

---

## DD-026: Check-in can be undone only while nothing physical has happened

**Status:** Accepted

**Context:** Travellers cancel check-in to change a seat, correct a detail or drop one passenger from a trip. Airlines do not allow it indefinitely.

**Decision:** Reversal is permitted while online check-in is open, no bag has been tagged and boarding has not begun. Each blocked case names its own reason: "Baggage has been tagged", "Boarding has started", "Online check-in closed 4 hours before departure". The confirmation warns that seats are released and may not be returned.

**Rationale:** The constraint is physical, not arbitrary — once a bag carries a tag or the gate is working the manifest, only the airport can intervene. Saying which of those applies tells the traveller whether to keep trying or walk to a desk.

---

## DD-027: International check-in collects passport data

**Status:** Accepted

**Context:** Border authorities require advance passenger information, so an international boarding pass cannot be issued from a name alone.

**Decision:** When any segment is international, check-in gains a document step per traveller: passport number, nationality and expiry. Expiry is validated against the six-month rule most destinations apply, and the international window closes 4 hours before departure rather than 2.

**Rationale:** These are the two things that actually stop people flying — an expired passport and a missed cut-off. Catching them at check-in is far cheaper than at the airport.

---

## DD-028: Seat changes after check-in reissue the pass

**Status:** Accepted

**Context:** Buying a seat upgrade after checking in invalidates the boarding pass already issued.

**Decision:** The purchase sheet warns before payment, and the itinerary shows a banner afterwards explaining that the earlier pass is void, linking straight to the new one.

**Rationale:** A stale boarding pass in a phone wallet is worse than none, because the traveller has no reason to doubt it until the gate rejects it.

---

## DD-029: One basket, one payment

**Status:** Accepted · supersedes part of DD-025

**Context:** Each extra was charged separately, so adding baggage and a lounge pass meant going through payment twice.

**Decision:** Selecting an extra adds it to a basket without charging. A sticky bar appears with the running total and an expandable breakdown, mirroring the review-and-pay screen. One payment settles everything and produces a single ledger entry.

**Rationale:** Nobody wants to authorise two payments for one intention. The basket also lets people compare and change their mind before committing, and collapses several receipts into one.

---

## DD-030: Charges are itemised, not summarised

**Status:** Accepted

**Context:** The itinerary showed "Total paid ₹38,460" with no account of where it went. Air fares are mostly not fare — they are fuel charges, airport development fees, security levies, GST and convenience fees.

**Decision:** Every payment carries its component lines and expands to show them. The original booking breaks into base fare, fuel charge, user development fee, passenger service fee, aviation security fee, seat selection, GST and convenience fee, each annotated with who levies it.

**Rationale:** A single number invites the suspicion that something has been slipped in. Naming each levy, including which ones the airport rather than the airline charges, is the difference between a receipt and an assertion.

---

## DD-031: The traveller list reports readiness, not just names

**Status:** Accepted

**Context:** The roster listed name, seat and meal. With check-in status, passport requirements, baggage that changes when extras are bought and per-person add-ons all in play, it left the traveller to work out for themselves who still needed something.

**Decision:** Each row carries a readiness state — ready, needs action, or waiting — with the specific reason: "Passport details needed", "Check-in opens in 4h 20m", "Checked in · seat 32A · sequence 41". The section header counts how many still need attention. Rows expand to seat and position, baggage, meal, passport, the extras attached to that person, and per-traveller actions.

**Rationale:** A list of names is a filing cabinet. A list that says who is blocked and on what is a to-do list, which is what a booking actually is between paying and flying. Seat position is derived from the aircraft, since the same letter means a window on a narrow-body and an aisle on a wide-body.

---

## DD-032: Extras opened from a traveller stay scoped to that traveller

**Status:** Accepted

**Context:** Tapping "Add extras" on Anita's row opened the same generic sheet as the booking-level list, with everyone preselected. The context of having tapped her row was thrown away.

**Decision:** That entry point opens a sheet scoped to the traveller: their name is a locked chip, the other travellers appear as tappable chips offering to extend the same selection, and all services are listed at once for multi-select. Prices update live as people are added. Adding merges with anything already in the basket rather than replacing it.

**Rationale:** Tapping a person's row is a statement of intent. Preselecting everybody quietly overrides it and risks buying two lounge passes when one was meant. Offering the others as an addition keeps the default honest while making the common case one tap away.

---

## DD-033: Real aircraft glyph over a rotated arrow

**Status:** Accepted

**Context:** Route separators used a Feather navigation arrow rotated 45 degrees, which reads as a cursor rather than a plane.

**Decision:** A supplied aircraft silhouette rendered through react-native-svg, exposed as a `Plane` primitive with size, colour and an upright variant for boarding passes.

**Rationale:** The icon appears at every route on every screen, so it carries more of the product's character than its size suggests. A rotated arrow is a placeholder pretending to be a decision.

---

## DD-034: Selection from a long list uses a dedicated sheet, not an inline dropdown

**Status:** Accepted

**Context:** Nationality was an inline dropdown that expanded inside a scrolling sheet. The dropdown's own scroll fought the sheet's pan gesture — the list moved but selection near the top was unreachable.

**Decision:** A reusable PickerSheet opens over the form, takes one choice, and closes. It is searchable for long lists. Both the passenger form and web check-in use it for nationality.

**Rationale:** Two scroll surfaces competing for one vertical drag is unwinnable on touch. A separate sheet has a single scroll context, so every row is reachable, and search makes 22 nationalities — or 200 — quick. The passport data captured at booking prefills check-in, so the picker is only touched once.

---

## DD-035: The offer section shows only what can still be added

**Status:** Accepted · refines DD-023

**Context:** "Add to your trip" listed every ancillary regardless of state. Once bought, an item showed a tick here and was also listed in "Extras added" directly below — the same purchase stated twice. Cut-off items that were never wanted sat locked, adding rows nobody could act on.

**Decision:** The section lists only items that are available and unpurchased, plus anything currently in the basket so it stays editable. Purchased items appear once, in "Extras added". When nothing is offerable the whole section, header included, is removed.

**Rationale:** A purchase confirmed is a purchase done; repeating it as an offer invites the reader to wonder whether they paid twice. The offer surface should answer one question — what can I still add — and disappear when the answer is nothing, rather than lingering as a wall of locks and ticks that duplicate the record below.

---

## DD-036: Manage-booking actions show the consequence before they act

**Status:** Accepted

**Context:** Change date, correct a name and cancel are the three things people do to a booking after paying. Each has a money or eligibility consequence that a plain confirm button hides.

**Decision:** Each is a review-then-confirm flow. Date change lists alternative dates with the fare delta and seats left on each, refuses dates that cannot seat the party, warns that it cancels check-in, and shows the total to pay or refund before confirming. Name correction is scoped to genuine spelling fixes, locked for checked-in travellers, and warns that a mismatch with ID means refused boarding. Cancellation shows a full refund breakdown — fare returned, taxes returned, cancellation fee, extras forfeited, net to account — behind an explicit acknowledgement.

**Rationale:** These actions cost money or eligibility, so the number and the side effect belong in front of the decision, not after it. The refund proportion falls the closer to departure the request comes, which is the real airline rule and the reason the amount must be shown rather than assumed.

---

## DD-037: A cancelled booking degrades the whole screen

**Status:** Accepted

**Context:** After cancellation the check-in action, the ancillary offer and the manage actions are all meaningless, but they were still rendered.

**Decision:** Cancellation sets a trip status that the status machine returns first. The primary action becomes an inert "Booking cancelled", the offer section and date-change and cancel rows disappear, and a refund line is written into the payment history.

**Rationale:** Offering to check in or buy a lounge pass for a flight that no longer exists is the kind of thing that makes people distrust the whole record. One cancelled flag has to ripple through every dependent surface, which is why it lives in the status machine rather than as a flag each section checks differently.

Cancellation also voids state at the source: it clears every passenger's check-in and boarding sequence and empties the extras basket, so the derived surfaces — boarding pass access, the "checked in" badge, the partial-check-in and reissue banners, the basket bar, the departure countdown, wallet and calendar actions — all resolve to their empty state without each needing its own cancellation check. Surfaces that cannot be voided in data (the offer section, the traveller header count, per-traveller actions) guard on the status directly.

---

## DD-038: A cancelled booking shows a refund timeline, and Manage disappears

**Status:** Accepted

**Context:** After cancellation the Manage Booking section still rendered — with its header and a couple of rows that either did nothing useful or contradicted the cancelled state. And the refund was a single line in the payment history, with no sense of when the money actually arrives.

**Decision:** The whole Manage section is hidden once cancelled, header included. In its place, near the top where it matters, a refund timeline shows three stages — initiated, processing with the bank, credited — with the amount, the destination, and an expected date. The current stage is derived from time elapsed since cancellation, so it advances on its own like every other status on the screen.

**Rationale:** Manage Booking is a menu of things you do to a live booking; none of them apply to a cancelled one, so the menu is noise. What the traveller actually wants after cancelling is the answer to one question — when do I get my money — and a timeline answers it more honestly than a single "refunded" line, because it sets the 5-to-7-day expectation rather than implying the money has already moved.

---

## DD-039: Check-in carries a real dangerous-goods guide

**Status:** Accepted

**Context:** The safety declaration compressed the single most consequential part of check-in — what you may and may not carry — into one line: "no prohibited or dangerous items". That is a checkbox, not information.

**Decision:** The declaration step now leads with an expandable guide split three ways: never allowed (explosives, gases, flammables, corrosives, radioactives), cabin baggage only (power banks, vapes, spare lithium batteries, valuables), and checked baggage only (sharps, tools, liquids over 100 ml, sporting goods). Each lists the specific items a leisure traveller actually runs into. The acknowledgement below references the specifics rather than a generic phrase.

**Rationale:** The battery rule alone — spare lithium cells and power banks must be in the cabin, never the hold — is behind a large share of real boarding delays and offloaded bags, and almost nobody knows it. Putting the actual rules in front of the traveller, grouped by where the item goes, is the difference between a legal formality and something that prevents the bag being pulled at the gate.

---

## DD-040: The already-checked-in state is a success, not an empty form

**Status:** Accepted

**Context:** Opening web check-in when everyone already had a boarding pass showed the international-flight warning, the "who is checking in" header and a small grey note — the furniture of a form with nothing to fill in. It read like an error.

**Decision:** When everyone is already checked in, the sheet shows a success layout instead: a green tick, "You are all checked in", the list of travellers with their seats and sequence numbers, and a single "View boarding passes" action that jumps straight to them.

**Rationale:** A screen's job in this state is to confirm and offer the obvious next step, not to present a form the person cannot use. The empty-form version made a completed task look broken.

---

## DD-041: Dangerous goods are shown as symbols, not sentences

**Status:** Accepted

**Context:** The dangerous-goods guide was an expandable list of text lines. Beyond being a wall of reading, it assumed a level of English comfort that excludes a large share of the Indian tier-2, tier-3 and tier-4 travellers the product is for.

**Decision:** Following the IATA convention every flyer has seen at an airport, each item is a symbol tile — a bold icon in a coloured ring, with a red diagonal slash over the banned ones — under a short label, laid out four across and grouped by where the item may go. The specifics moved into the icon and a two-word label; the paragraphs are gone.

**Rationale:** A prohibition symbol communicates without literacy, which is the entire reason airports use pictograms rather than paragraphs. Recognition beats reading here: someone who cannot comfortably parse "corrosives and poisons" still recognises the skull-and-ring they have seen on a warning label. Grouping by destination — never / cabin / hold — carries the one rule people get wrong, batteries in the cabin, in a form they can scan in seconds.

---

## DD-042: Trips is an assistance layer, not a filing cabinet

**Status:** Accepted

**Context:** The Home tab reserved a "Trips" slot, stubbed as a later release. The obvious build is a list of bookings. But a list is passive — it makes the traveller find the trip, open it, and work out what to do. The itinerary already does the per-trip work; Trips needed a reason to exist above it.

**Decision:** Trips holds every booking grouped into happening-now, upcoming and past, but leads with an assistance spotlight: the single most urgent next action across all trips, computed by a `nextAction` engine that reads the same time-driven state the itinerary uses. Each trip card also carries its own next-action footer. The engine returns one clear step per trip — add passport details, check in now, boarding pass ready, choose seats, refund in progress, trip completed — with an urgency that decides how loud the surface is.

**Rationale:** The product philosophy is recommendation over inventory and one primary thing per screen. Applied to a booking list, that means answering "what should I do next" before showing the filing cabinet. A traveller with three trips does not want to audit all three; they want the one thing that matters now surfaced for them. The engine derives urgency from elapsed time, so the spotlight and the per-card footers advance on their own — the same discipline as the itinerary's status machine, one layer up.

**Scope note:** Every card currently routes to the single itinerary screen; a real build would pass the PNR and open the target sheet (check-in, boarding pass) on arrival. The assistance engine and grouping are real; the multi-trip routing is the mock boundary.

---

## DD-043: Account serves the booking flow, and says no to the rest

**Status:** Accepted

**Context:** The brief asked for a "world class" account with settings, notifications, saved details, leaderboard, carbon footprint, history, spend and more. Several of those sit outside the MVP: the README lists loyalty and expense tracking as later phases, and the Constitution rejects complexity that does not earn its place.

**Decision:** Account holds what the booking flow already needs a home for — profile with passport, saved travellers with their documents and seat/meal defaults, travel preferences, notification settings, payment methods, and a spend-and-travel summary derived from the real trip records. Two requested items were declined and one deferred: no leaderboard (ranking flight bookings is engagement-farming with no traveller benefit, against the "confidence not transactions" principle); carbon footprint is present but an explicit "coming soon" card rather than mocked numbers, because credible emissions need verified per-route, per-aircraft data; loyalty stays in its named later phase.

**Rationale:** An account earns its place by removing friction from the core task, not by accumulating surfaces. Saved travellers mean a passport is typed once, not every trip. The spend summary reads the same payment records the itinerary uses, so it can never disagree with them. A stubbed carbon card keeps the product honest — a placeholder that admits what it does not yet know beats a number that looks authoritative and is invented. Declining the leaderboard is the design doing its job: the measure of this product is how calmly someone books, and a rank on how often you fly pulls in exactly the wrong direction.

**Scope note:** Every row is a real, wired surface reading real data; the edit/add destinations (edit profile, add traveller, add payment method) are stubs pending the same form work the passenger sheet already models.

*To add a new decision: copy the template below, assign the next DD number, and append to the list.*

```
## DD-XXX: Title

**Status:** Accepted | Proposed | Deprecated | Superseded

**Context:** What problem or opportunity prompted this?

**Decision:** What was chosen?

**Rationale:** Why this approach over alternatives?
```
