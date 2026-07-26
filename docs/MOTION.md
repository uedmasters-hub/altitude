# Motion

Animation communicates change. If an animation doesn't improve clarity, maintain context, or provide feedback — it shouldn't exist.

---

## Principles

Purposeful, fast, subtle, consistent, and optional (respects reduced motion).

---

## Durations

| Token | Duration | Usage |
|-------|--------:|-------|
| instant | 100ms | Press feedback, toggles |
| fast | 150ms | Micro-interactions, hover |
| normal | 250ms | Screen transitions, sheets opening |
| slow | 350ms | Complex reveals, expanding content |
| extraSlow | 500ms | Onboarding moments |

Most interface animations complete within 150–300ms. Easing: ease-out for all transitions.

---

## Standard transitions

**Fade** — toasts, alerts, empty states.

**Slide up** — bottom sheets, keyboard-related content, action panels.

**Slide down** — dismissing overlays, closing sheets.

**Scale** — dialog appearance, selection feedback. Use sparingly.

Avoid bounce effects.

---

## Component-specific motion

**Buttons:** animate press and release. Show loading state (spinner replacing label) with fade. No bounce.

**Bottom sheets:** animate from bottom. Follow user's drag gesture. Support open, drag, and close.

**Search:** focus input, open keyboard, reveal results smoothly. No separate screen transition.

**Lists:** animate only when items are added, removed, or reordered. Scrolling stays native.

**Calendar:** smooth month-change transition. Immediate visual feedback on date selection.

**Loading:** skeleton loaders with a subtle shimmer pulse. Full-screen spinners only as last resort.

---

## Feedback animations

Subtle motion for successful actions, errors, and state changes. Avoid celebratory or decorative animation.

---

## Reduced motion

Respect the system preference. When enabled: remove non-essential animations, preserve essential feedback (loading indicators, state changes). The interface must remain fully usable with all animation disabled.
