# Interactions

How users move through the product. Every interaction should feel fast, predictable, natural, and consistent.

---

## Navigation patterns

**Push navigation** for complete workflows: Home → Flights → Booking → Confirmation.

**Bottom sheets** for lightweight selection that shouldn't break context: airport search, passenger selection, cabin class, fare details. Preferred over full-screen navigation for these.

**Dialogs** only for destructive confirmations: cancel booking, discard changes, delete passenger.

---

## Search

Search is the primary interaction pattern. It should feel instant.

- Auto-focus input on open
- Show keyboard immediately
- Show recent searches before typing
- Filter results as user types
- Never require multiple taps before searching

### Airport search specifically

Search input anchored near the bottom. Airport list expands upward, keeping results in thumb reach. Sections: Recent → Popular → Search results. Selecting an airport immediately returns to the previous screen.

---

## Selection patterns

**Passenger selection:** increment/decrement controls. No dropdowns. Show total count immediately.

**Date selection:** familiar monthly calendar. Fare insights layered on top, not replacing it. Range for round trip, single date for one-way.

**Cabin class:** bottom sheet with clear options.

---

## Primary CTA

One per screen, always visible. Stays in the thumb zone. Label matches the action: "Search flights", "Book flight", "Confirm payment."

---

## Feedback

Every action gets feedback: loading, success, error, selection, confirmation.

- Prefer skeleton loaders over spinners
- Keep loading states contextual
- Errors explain what happened and suggest next step
- Success messages are short: "Booking confirmed"

---

## Gestures

| Gesture | Usage | Visible alternative required |
|---------|-------|------------------------------|
| Tap | Primary interaction | — |
| Swipe to dismiss | Sheets, toasts | Close button |
| Drag | Bottom sheet resize | — |
| Vertical scroll | Lists, content | — |
| Long press | Optional, secondary actions | Always |

Every gesture must have a visible alternative. No gesture-only interactions.

---

## Interaction checklist

Before shipping an interaction:

- Is the next step obvious?
- Can it be completed with one hand?
- Does it minimize typing?
- Does it minimize scrolling?
- Does it minimize cognitive load?
- Is it consistent with the rest of the product?
