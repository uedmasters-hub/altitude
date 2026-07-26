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

*To add a new decision: copy the template below, assign the next DD number, and append to the list.*

```
## DD-XXX: Title

**Status:** Accepted | Proposed | Deprecated | Superseded

**Context:** What problem or opportunity prompted this?

**Decision:** What was chosen?

**Rationale:** Why this approach over alternatives?
```
