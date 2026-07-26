# Interactions

> Project Altitude Interaction Guidelines
>
> Version: 0.1 (MVP)

---

# Overview

Interactions define how users move through the product.

Every interaction should feel:

- Fast
- Predictable
- Natural
- Consistent

Users should never wonder what happens next.

---

# Interaction Principles

## One Primary Action

Every screen should guide users toward a single next step.

Avoid competing actions.

---

## Progressive Disclosure

Reveal information gradually.

Do not expose unnecessary options until they become relevant.

---

## Direct Manipulation

Whenever possible, allow users to interact directly with content instead of navigating through multiple screens.

Examples:

- Bottom Sheets
- Date Selection
- Passenger Selection

---

## Thumb-first Design

Primary interactions should remain within comfortable thumb reach.

Preferred locations:

- Bottom Search
- Sticky CTA
- Bottom Sheets

---

# Navigation

## Push Navigation

Use for complete workflows.

Examples

- Home → Flight Recommendations
- Booking → Payment
- Payment → Confirmation

---

## Bottom Sheet

Preferred for lightweight selection.

Use for

- Airport Search
- Passenger Selection
- Cabin Class
- Fare Details

Avoid navigating away from the current context.

---

## Dialog

Use only when confirmation is required.

Examples

- Cancel Booking
- Leave Page

---

# Search

Search is a primary interaction.

## Behaviour

- Open instantly
- Focus automatically
- Open keyboard immediately
- Show recent searches before typing
- Filter results as users type

Avoid requiring users to tap multiple times before searching.

---

## Airport Search

The search field remains anchored near the bottom of the screen.

The airport list expands upward, keeping results within the user's natural thumb reach.

Show:

- Recent
- Popular
- Search Results

Selecting an airport immediately returns users to the previous screen.

---

# Lists

Lists should support quick scanning.

Guidelines

- Large touch targets
- Consistent spacing
- Smooth scrolling

Avoid unnecessary separators.

---

# Calendar

The calendar remains a familiar interaction.

Enhancements such as fare trends and price recommendations should support the calendar rather than replace it.

---

# Passenger Selection

Use incremental controls.

Avoid dropdowns.

Show the total passenger count immediately after changes.

---

# Recommendation Selection

Recommendations should explain why they exist.

Examples

- Best Value
- Cheapest
- Fastest

Allow users to explore alternatives without overwhelming them.

---

# Primary CTA

Each screen should contain only one primary call-to-action.

Examples

Continue

Book Flight

Confirm Payment

The CTA should remain visible whenever appropriate.

---

# Feedback

Every user action should receive feedback.

Examples

Loading

Success

Error

Selection

Confirmation

---

# Loading

Prefer skeleton loading over full-screen spinners.

Keep loading states contextual.

---

# Empty States

When no data exists:

- Explain why.
- Suggest the next action.

---

# Error Handling

Errors should be understandable.

Every error should include:

- What happened
- Why it happened (if known)
- What users can do next

Avoid technical messages.

---

# Gestures

Supported gestures:

- Tap
- Long Press (optional)
- Swipe to dismiss
- Drag Bottom Sheet
- Vertical Scroll

Avoid gesture-only interactions.

Every gesture should have a visible alternative.

---

# Animation

Animation should reinforce interaction.

Use animation to:

- Indicate state changes
- Maintain context
- Guide attention

Never animate for decoration.

---

# Interaction Checklist

Before approving an interaction, ask:

- Is the next step obvious?
- Can this interaction be completed with one hand?
- Does it reduce typing?
- Does it reduce scrolling?
- Does it minimise cognitive load?
- Is it consistent with the rest of the product?