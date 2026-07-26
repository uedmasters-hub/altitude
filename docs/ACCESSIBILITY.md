# Accessibility

Accessibility is a core design requirement, not an optional enhancement. Follow WCAG 2.2 Level AA.

---

## Touch targets

Minimum: 48 × 48px. Preferred: 56 × 56px. Maintain adequate spacing between adjacent interactive elements.

---

## Typography

Minimum body text: 16px. Minimum caption: 12px. Nothing smaller than 12px. Support dynamic type / larger text sizes — content must remain usable when text scales up.

---

## Color contrast

Normal text: 4.5:1 minimum. Large text (18px+ or 14px+ bold): 3:1 minimum. Interactive elements must remain distinguishable in every state.

Never communicate information using color alone. Every colored indicator (cheapest = green) must also have a text label.

---

## Focus states

Every interactive element has a visible focus state: buttons, inputs, search, links, chips, list rows. Never rely on browser/platform defaults alone.

---

## Keyboard navigation

All interactive elements are keyboard-accessible. Users can navigate, select, submit, and dismiss dialogs using only the keyboard.

---

## Screen readers

Every interactive element has an accessible name. "Search departure airport" not "Input." Icons that perform actions include accessible labels. Decorative images are hidden from screen readers. Errors are announced to assistive technologies.

---

## Forms

Every input has a visible label (not just a placeholder), an error message path, and helper text when needed. Placeholders are not labels.

---

## Motion

Support reduced motion preferences. Animations are never required to understand the interface. See MOTION.md.

---

## Gestures

Every gesture has a visible alternative. Swipe to dismiss → close button. Drag bottom sheet → close action. See INTERACTIONS.md.

---

## Shipping checklist

Before every screen ships:

- [ ] Touch targets ≥ 48 × 48px
- [ ] Text meets contrast requirements
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works
- [ ] Screen reader labels present
- [ ] Errors are descriptive and announced
- [ ] Color is not the only indicator
- [ ] Reduced motion respected
- [ ] Content usable at larger text sizes
- [ ] No time limits without user control
