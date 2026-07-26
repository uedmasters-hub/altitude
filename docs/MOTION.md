# Motion

> Project Altitude Motion Guidelines
>
> Version: 0.1 (MVP)

---

# Purpose

Motion helps users understand changes within the interface.

Animations should improve clarity, maintain context, and provide feedback.

If an animation does not improve the experience, it should not exist.

---

# Principles

Motion should be:

- Purposeful
- Fast
- Subtle
- Consistent
- Optional

Avoid decorative animations.

---

# Motion Guidelines

## Reinforce Change

Use animation to communicate changes in state.

Examples

- Opening a bottom sheet
- Selecting a date
- Loading search results
- Completing a booking

---

## Maintain Context

Elements should transition naturally between states.

Avoid sudden jumps or unexpected movement.

---

## Guide Attention

Motion should draw attention to the next important action.

Avoid animating multiple elements simultaneously.

---

## Keep It Fast

Most interface animations should complete within 150–300ms.

Avoid slow transitions that delay user interaction.

---

# Motion Durations

| Token | Duration |
|--------|---------:|
| Instant | 100ms |
| Fast | 150ms |
| Normal | 250ms |
| Slow | 350ms |
| Extra Slow | 500ms |

---

# Standard Transitions

## Fade

Use for:

- Toasts
- Alerts
- Empty states

---

## Slide Up

Use for:

- Bottom sheets
- Keyboard-related content
- Action panels

---

## Slide Down

Use for:

- Dismissing overlays
- Closing bottom sheets

---

## Scale

Use sparingly for:

- Dialog appearance
- Selection feedback

Avoid excessive scaling.

---

# Component Motion

## Buttons

Animate:

- Press
- Release
- Loading

Avoid bounce effects.

---

## Bottom Sheets

Animate from the bottom.

Support:

- Open
- Drag
- Close

Movement should follow the user's gesture.

---

## Search

When activated:

- Focus input
- Open keyboard
- Reveal results smoothly

Avoid unnecessary screen transitions.

---

## Lists

Animate only when items are:

- Added
- Removed
- Reordered

Scrolling should remain natural.

---

## Calendar

Animate month changes smoothly.

Date selection should provide immediate visual feedback.

---

## Loading States

Prefer skeleton loading.

If using a spinner, display it only when necessary.

Avoid full-screen loading animations.

---

# Feedback Animations

Use subtle motion for:

- Successful actions
- Errors
- State changes

Examples

- Booking confirmed
- Payment completed
- Item saved

Avoid celebratory animations.

---

# Reduced Motion

Respect the user's system preference for reduced motion.

When enabled:

- Reduce non-essential animations
- Remove decorative transitions
- Preserve essential feedback

---

# Motion Checklist

Before adding an animation, ask:

- Does it explain a state change?
- Does it maintain context?
- Is it fast enough?
- Can users interact immediately?
- Does it respect reduced motion settings?
- Would removing it make the experience worse?