# Project Altitude Design System

Version: 0.1 (MVP)

---

# Purpose

The Project Altitude Design System establishes the visual language, interaction patterns, and design principles used throughout the product.

It exists to ensure every screen feels like part of the same experience regardless of who designs or develops it.

The goal is consistency, clarity, and confidence—not visual novelty.

---

# Design Philosophy

Project Altitude is built around one simple idea:

> Booking a flight should feel calm.

Most travel products optimise for transactions.

Project Altitude optimises for decision making.

The interface should reduce anxiety by presenting only the information users need at each moment.

Every design decision should answer one question:

> Does this make the journey easier?

If not, reconsider it.

---

# Core Principles

## 1. Simplicity First

Every screen should have one clear purpose.

Avoid multiple competing actions.

---

## 2. Progressive Disclosure

Never expose unnecessary information.

Reveal information only when users need it.

---

## 3. Familiar Before Innovative

Improve familiar interactions instead of replacing them.

Examples

✓ Calendar

✓ Search

✓ Lists

✓ Buttons

---

## 4. Recommendation Over Comparison

Users should spend less time comparing and more time deciding.

Whenever possible recommend instead of listing.

---

## 5. Thumb-first Interaction

Primary interactions belong in the natural thumb zone.

Search

Bottom sheets

Primary CTA

Selection controls

---

## 6. Consistency

Every interaction should behave the same way throughout the product.

Users should never wonder

"Will this screen work differently?"

---

# Visual Language

The interface should feel

- Calm
- Spacious
- Minimal
- Friendly
- Confident
- Premium

Avoid

- Visual noise
- Heavy borders
- Bright gradients
- Excessive colours
- Decoration

---

# Layout

## Grid

8pt Grid System

Micro spacing may use 4pt increments.

---

## Screen Padding

Horizontal

24px

Vertical

24px

---

## Section Gap

32px

---

## Component Gap

16px

---

## List Item Gap

8px

---

## Safe Area

Top

16px minimum

Bottom

16px minimum

---

# Typography

## Typeface

Inter

Fallback

System UI

---

## Font Weights

| Token | Weight | Usage |
|--------|---------|----------------|
| Regular | 400 | Body |
| Medium | 500 | Labels |
| Semibold | 600 | Titles |
| Bold | 700 | Hero / CTA |

---

## Type Scale

| Style | Size | Line Height | Usage |
|--------|------|------------|----------------|
| Display XL | 48 | 56 | Marketing |
| Display | 40 | 48 | Landing |
| H1 | 32 | 40 | Page title |
| H2 | 28 | 36 | Section |
| H3 | 24 | 32 | Screen heading |
| Title | 20 | 28 | Cards |
| Body Large | 18 | 28 | Highlight |
| Body | 16 | 24 | Default |
| Body Small | 14 | 20 | Supporting |
| Caption | 12 | 16 | Labels |

---

# Colour System

## Neutral

White

Gray 50–900

Black

Neutrals should compose approximately 90% of the interface.

---

## Primary

Purple

Used only for

- Primary buttons
- Active states
- Selected controls
- Focus
- Progress

---

## Success

Green

Used for

- Cheapest fare
- Booking success
- Completed state
- Positive changes

---

## Warning

Amber

Used only for

- Price changing soon
- Limited seats
- Important notices

---

## Error

Red

Used for

- Validation
- Failed payment
- Search errors

---

## Information

Blue

Used sparingly for

- Informational banners
- Educational tips

---

# Colour Rules

Do not use colour purely for decoration.

Every colour must communicate meaning.

Avoid using multiple accent colours within the same component.

---

# Spacing Scale

| Token | Value |
|--------|------|
| 0 | 0 |
| 1 | 4 |
| 2 | 8 |
| 3 | 12 |
| 4 | 16 |
| 5 | 20 |
| 6 | 24 |
| 8 | 32 |
| 10 | 40 |
| 12 | 48 |
| 16 | 64 |

---

# Border Radius

| Token | Value |
|--------|------|
| None | 0 |
| XS | 4 |
| SM | 8 |
| MD | 12 |
| LG | 16 |
| XL | 24 |
| Full | 999 |

Use rounded corners consistently.

Avoid mixing multiple radius values within the same screen.

---

# Shadows

Elevation should be subtle.

Level 0

Flat

Level 1

Cards

Level 2

Floating Search

Level 3

Bottom Sheets

Level 4

Dialogs

---

# Motion

Animation should communicate change.

Never animate purely for decoration.

| Speed | Duration |
|---------|---------|
| Instant | 100ms |
| Fast | 150ms |
| Normal | 250ms |
| Slow | 350ms |

Preferred easing

Ease Out

---

# Icons

Style

Outlined

Stroke Width

2px

Sizes

16

20

24

32

Icons should support text.

Never replace labels.

---

# Buttons

Primary

One per screen.

Secondary

Supporting actions.

Ghost

Low emphasis.

Text

Navigation only.

Icon

Utility actions.

---

# Inputs

Types

Search

Text

Email

Phone

Number

OTP

Search is the primary input pattern throughout the product.

---

# Cards

Cards represent meaningful objects.

Examples

Destination

Flight

Recommendation

Journey

Cards should not become dashboards.

---

# Lists

Lists should be

Easy to scan

Well spaced

Consistent

Avoid unnecessary separators.

Whitespace is preferred.

---

# Bottom Sheets

Preferred over full-screen selection.

Used for

Airport Search

Passenger Selection

Cabin Class

Filters

Price Breakdown

---

# Dialogs

Reserved for confirmations.

Examples

Cancel Booking

Discard Changes

Delete Passenger

---

# Toasts

Short confirmations.

Never require interaction.

Disappear automatically.

---

# Alerts

Used only when immediate user attention is required.

Examples

Payment Failed

Booking Expired

Connection Lost

---

# Empty States

Every empty state should answer

What happened?

Why?

What should I do next?

---

# Error Messages

Write like a human.

Avoid

"Unknown Error"

Prefer

"We couldn't find flights for those dates."

Offer a next action whenever possible.

---

# Accessibility

Minimum touch target

48×48

Contrast

WCAG AA

Dynamic Type

Supported

Reduced Motion

Supported

---

# Interaction Rules

Primary action always visible.

Avoid nested navigation.

Avoid long forms.

Reduce typing whenever possible.

Reduce scrolling whenever possible.

Maintain predictable behaviour.

---

# Cognitive Load Guidelines

Never ask users to make unnecessary decisions.

Prefer

Recommendation

instead of

Comparison

Prefer

Selection

instead of

Configuration

Prefer

Recognition

instead of

Recall

---

# Content Guidelines

Use simple language.

Prefer

Continue

instead of

Proceed

Use

Depart

instead of

Outbound

Use

Return

instead of

Inbound

Use

Best Value

instead of

Recommended #1

---

# MVP Scope

This Design System currently supports

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

Future phases will extend this system without changing its principles.

---

# Design Checklist

Before approving any screen, ask:

- Does this screen have one primary purpose?
- Is the next action obvious?
- Can anything be removed?
- Does this reduce cognitive load?
- Does it support one-handed use?
- Is the interface visually calm?
- Is the language clear?
- Does it follow existing patterns?
- Would a first-time traveller understand it without explanation?

If the answer to any question is "No", the design should be revised.