# Design Decisions

> Project Altitude Design Decisions
>
> Version: 0.1 (MVP)

---

# Purpose

This document records significant design decisions made during the development of Project Altitude.

Each decision captures:

- The problem
- The decision
- The rationale
- The impact

Document decisions that influence the user experience or design system. Avoid recording minor visual changes.

---

# Template

## DD-XXX: Decision Title

**Status**

Accepted | Proposed | Deprecated | Superseded

**Date**

YYYY-MM-DD

### Context

What problem or opportunity prompted this decision?

### Decision

Describe the chosen approach.

### Rationale

Explain why this approach was selected over alternatives.

### Impact

Describe how this affects the product, users, or future design decisions.

---

# Decisions

## DD-001: Keep a Traditional Calendar

**Status**

Accepted

### Context

Many travel products experiment with alternative date pickers, increasing the learning curve for users.

### Decision

Use a familiar monthly calendar for date selection.

Enhance the experience with fare insights rather than replacing the interaction.

### Rationale

Users already understand calendars. Familiarity reduces cognitive load and speeds up task completion.

### Impact

- Lower learning curve
- Faster date selection
- Easier adoption for new users

---

## DD-002: Bottom-Anchored Airport Search

**Status**

Accepted

### Context

Traditional search experiences place the search field at the top of the screen, requiring users to reach away from the keyboard.

### Decision

Anchor the search input near the bottom while the airport list expands upward.

### Rationale

This keeps search within natural thumb reach and reduces unnecessary hand movement.

### Impact

- Better one-handed usability
- Faster airport selection
- More ergonomic interaction

---

## DD-003: Recommendation Before Comparison

**Status**

Accepted

### Context

Traditional flight booking interfaces present long lists of options, requiring users to compare multiple attributes.

### Decision

Present a recommended journey first, followed by alternative options.

### Rationale

Recommendation-driven experiences reduce decision fatigue while still allowing users to explore alternatives.

### Impact

- Lower cognitive load
- Faster booking decisions
- Clearer visual hierarchy

---

## DD-004: Progressive Disclosure

**Status**

Accepted

### Context

Displaying all available options at once can overwhelm users.

### Decision

Reveal information and controls only when they become relevant.

### Rationale

Users should focus on completing one step at a time.

### Impact

- Simpler screens
- Improved task completion
- Reduced information overload

---

## DD-005: One Primary Action Per Screen

**Status**

Accepted

### Context

Multiple competing calls-to-action make it difficult for users to identify the next step.

### Decision

Each screen should emphasise a single primary action.

### Rationale

A clear next step improves confidence and reduces hesitation.

### Impact

- Better navigation flow
- Improved usability
- Consistent interaction patterns

---

## DD-006: Bottom Sheets for Selection

**Status**

Accepted

### Context

Selection tasks often interrupt the user's flow when presented as separate screens.

### Decision

Use bottom sheets for lightweight selection workflows such as airports, passengers, and cabin class.

### Rationale

Bottom sheets preserve context while reducing navigation.

### Impact

- Fewer screen transitions
- Faster interactions
- Improved continuity

---

## DD-007: Recommendation Over Feature Density

**Status**

Accepted

### Context

Many travel apps compete by adding more filters, offers, and comparison tools, increasing interface complexity.

### Decision

Prioritise guidance and recommendations over feature-heavy interfaces.

### Rationale

Helping users decide is more valuable than presenting every possible option.

### Impact

- Cleaner interface
- Reduced decision fatigue
- Stronger product differentiation

---

## DD-008: Flight-First MVP

**Status**

Accepted

### Context

Project Altitude aims to become a broader travel platform, but expanding the MVP would increase complexity and delay validation.

### Decision

Limit the MVP to the end-to-end flight booking experience.

### Rationale

A focused scope enables faster iteration and validates the core booking experience before expanding into other travel services.

### Impact

- Faster delivery
- Clearer product direction
- Easier user testing

---

# Decision Lifecycle

Design decisions should be updated when they are:

- Superseded by a better approach
- Deprecated due to product evolution
- No longer applicable

Do not delete historical decisions. Update their status and reference the replacement where appropriate.