# Accessibility

> Project Altitude Accessibility Guidelines
>
> Version: 0.1 (MVP)

---

# Purpose

Accessibility ensures Project Altitude is usable by as many people as possible.

Accessibility is not an optional enhancement. It is a core design requirement.

Every component, interaction, and screen should be designed with accessibility in mind.

---

# Principles

Design should be:

- Perceivable
- Operable
- Understandable
- Robust

Follow WCAG 2.2 Level AA wherever applicable.

---

# Touch Targets

Minimum touch target

48 × 48 px

Preferred

56 × 56 px

Maintain adequate spacing between adjacent interactive elements.

---

# Typography

Minimum body text

16px

Minimum caption

12px

Avoid using text smaller than 12px.

Maintain comfortable line height.

Avoid long paragraphs.

---

# Colour Contrast

All text should meet WCAG AA contrast requirements.

Minimum contrast ratio

Normal text

4.5 : 1

Large text

3 : 1

Interactive elements should remain distinguishable in every state.

---

# Colour Usage

Never communicate information using colour alone.

Examples

✓ Cheapest
→ Green label + text

✗ Cheapest
→ Green colour only

Always provide textual indicators.

---

# Focus States

Every interactive element must have a visible focus state.

Examples

- Buttons
- Inputs
- Search
- Links
- Chips

Focus should never rely on browser defaults alone.

---

# Keyboard Navigation

All interactive elements should be keyboard accessible.

Users should be able to:

- Navigate
- Select
- Submit
- Dismiss dialogs

using only the keyboard.

---

# Screen Readers

Every interactive element should have an accessible name.

Examples

Good

"Search departure airport"

Bad

"Input"

Icons should include accessible labels when they perform actions.

---

# Images

Every meaningful image should include alternative text.

Decorative images should be ignored by screen readers.

---

# Icons

Icons should support text.

Avoid icon-only interactions unless an accessible label is provided.

---

# Forms

Every input should have:

- Label
- Placeholder (optional)
- Error message
- Helper text (when necessary)

Do not rely on placeholders as labels.

---

# Error Messages

Errors should:

- Clearly explain the issue.
- Suggest the next step.
- Be announced to assistive technologies.

Example

Email address is required.

Avoid

Invalid input.

---

# Motion

Support users who prefer reduced motion.

Animations should never be required to understand the interface.

---

# Gestures

Provide alternatives for gesture-only interactions.

Examples

Swipe to dismiss

↓

Visible Close button

Drag Bottom Sheet

↓

Close action

---

# Time Limits

Avoid unnecessary timers.

If timing is required:

- Inform users.
- Allow additional time whenever possible.

---

# Loading States

Provide accessible loading feedback.

Examples

Searching flights...

Preparing payment...

Avoid endless spinners without context.

---

# Links

Links should clearly describe their destination.

Good

View baggage policy

Bad

Click here

---

# Language

Use plain language.

Prefer familiar travel terminology.

Avoid technical aviation terms.

---

# Responsive Design

Support:

- Small phones
- Large phones
- Tablets

Content should reflow without horizontal scrolling.

---

# Accessibility Checklist

Before shipping a screen, verify:

□ Touch targets are at least 48 × 48 px

□ Text meets contrast requirements

□ Focus states are visible

□ Keyboard navigation works

□ Screen reader labels are present

□ Errors are descriptive

□ Colour is not the only indicator

□ Motion supports reduced motion

□ Interactive elements have accessible names

□ Content remains usable at larger text sizes

---

# MVP Scope

Accessibility applies to every screen within the MVP, including:

- Home
- Airport Search
- Date Selection
- Passenger Selection
- Flight Recommendations
- Flight Details
- Booking Review
- Payment
- Booking Confirmation
- My Trips