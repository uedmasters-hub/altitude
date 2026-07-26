# Design Tokens

Every visual value used in Project Altitude. Components consume these tokens — never hardcoded values. The source of truth in code is `constants/tokens.ts`.

---

## Typography

### Font

| Token | Value |
|-------|-------|
| Primary | Inter |
| Fallback | System UI |

### Weights

| Token | Weight | Usage |
|-------|-------:|-------|
| Regular | 400 | Body text |
| Medium | 500 | Labels, buttons |
| Semibold | 600 | Headings |
| Bold | 700 | Display text |

### Type scale

| Token | Size | Line height | Weight | Usage |
|-------|-----:|------------:|--------|-------|
| display | 32 | 40 | 700 | Screen hero ("Where to?") |
| h1 | 24 | 32 | 600 | Screen headings |
| h2 | 20 | 28 | 600 | Section titles, card titles |
| bodyLarge | 18 | 28 | 400 | Featured text, prices |
| body | 16 | 24 | 400 | Default text |
| bodyMedium | 16 | 24 | 500 | Emphasized body |
| bodySmall | 14 | 20 | 400 | Supporting text |
| caption | 12 | 16 | 400 | Labels, metadata |
| label | 12 | 16 | 500 | Tags, form labels |

Letter spacing: display uses -0.5, h1 uses -0.3. All others default.

---

## Colors

### Neutral

| Token | Hex | Usage |
|-------|---------|-------|
| white | #FFFFFF | Cards, surfaces |
| gray50 | #FAFAFA | App background |
| gray100 | #F5F5F5 | Input backgrounds, soft fills |
| gray200 | #E5E5E5 | Borders, dividers |
| gray300 | #D4D4D4 | Subtle borders |
| gray400 | #A3A3A3 | Disabled text |
| gray500 | #737373 | Tertiary text, placeholders |
| gray600 | #525252 | Secondary text |
| gray700 | #404040 | — |
| gray800 | #262626 | Primary text |
| gray900 | #171717 | Heading text |
| black | #000000 | — |

### Brand / Primary

Purple. Used for primary buttons, active states, selected controls, focus, and progress indicators.

| Token | Hex |
|-------|---------|
| primary50 | #F5F3FF |
| primary100 | #EDE9FE |
| primary200 | #DDD6FE |
| primary300 | #C4B5FD |
| primary400 | #A78BFA |
| primary500 | #7C3AED |
| primary600 | #6D28D9 |
| primary700 | #5B21B6 |
| primary800 | #4C1D95 |
| primary900 | #3B0764 |

Default primary: `primary500` (#7C3AED). Pressed state: `primary600`. Soft/background: `primary50`.

### Semantic

| Role | Light | Default | Dark |
|------|-------|---------|------|
| Success | #DCFCE7 | #16A34A | #166534 |
| Warning | #FEF3C7 | #F59E0B | #92400E |
| Error | #FEE2E2 | #DC2626 | #991B1B |
| Info | #DBEAFE | #2563EB | #1E40AF |

### Recommendation tags

| Tag | Color | Background |
|-----|-------|------------|
| Best value | #7C3AED (primary) | primary50 |
| Cheapest | #16A34A (success) | success light |
| Fastest | #2563EB (info) | info light |

### Semantic surface tokens

These are the tokens components should reference (not raw hex):

| Token | Resolves to | Usage |
|-------|-------------|-------|
| bg | gray50 | App background |
| surface | white | Cards, sheets |
| surfaceRaised | white | Elevated cards |
| border | gray200 | Visible dividers |
| borderLight | gray100 | Subtle card borders |
| text | gray900 | Primary text |
| textSecondary | gray600 | Supporting text |
| textTertiary | gray500 | Placeholders, hints |
| textDisabled | gray400 | Disabled state |
| textInverse | white | Text on dark/primary backgrounds |
| primary | primary500 | Buttons, active states |
| primarySoft | primary50 | Soft button backgrounds |
| primaryPressed | primary600 | Button pressed state |
| accent | info default | Links, informational highlights |
| accentSoft | info light | Accent backgrounds |
| overlay | black @ 50% | Modal backdrop |

---

## Spacing

8pt grid. Micro spacing uses 4pt increments.

| Token | Value | Usage |
|-------|------:|-------|
| 0 | 0 | — |
| xs | 4 | Tight gaps inside components |
| sm | 8 | Inner gaps, list item spacing |
| md | 16 | Component padding, card gaps |
| lg | 24 | Screen horizontal padding, component gaps |
| xl | 32 | Section spacing |
| xxl | 48 | Bottom safe zone |
| 3xl | 64 | Large section breaks |

### Layout constants

| Token | Value |
|-------|------:|
| Screen horizontal padding | 24 |
| Section gap | 32 |
| Component gap | 24 |
| Card gap | 16 |
| List item gap | 8 |
| Safe area top (minimum) | 16 |
| Safe area bottom (minimum) | 16 |

---

## Border radius

| Token | Value | Usage |
|-------|------:|-------|
| none | 0 | — |
| xs | 4 | Inputs, small chips |
| sm | 8 | Chips, tags |
| md | 12 | Cards, buttons |
| lg | 16 | Bottom sheets, hero cards |
| xl | 24 | Large cards |
| full | 9999 | Pills, avatars |

Use rounded corners consistently. Avoid mixing multiple radius values within the same screen.

---

## Elevation / Shadows

Subtle. Shadows communicate hierarchy, not decoration.

| Level | Usage | Shadow |
|------:|-------|--------|
| 0 | Flat surfaces | Border only (borderLight) |
| 1 | Cards | 0 2px 8px rgba(0,0,0,0.06) |
| 2 | Floating search | 0 4px 12px rgba(0,0,0,0.08) |
| 3 | Bottom sheets | 0 -8px 24px rgba(0,0,0,0.1) |
| 4 | Dialogs | 0 8px 32px rgba(0,0,0,0.12) |

---

## Motion

| Token | Duration | Usage |
|-------|--------:|-------|
| instant | 100ms | Press feedback, toggles |
| fast | 150ms | Micro-interactions |
| normal | 250ms | Screen transitions, sheets |
| slow | 350ms | Complex reveals |
| extraSlow | 500ms | Onboarding, celebration |

Easing: ease-out for all transitions. See MOTION.md for detailed guidance.

---

## Icons

| Property | Value |
|----------|-------|
| Style | Outlined |
| Stroke | 2px |
| Sizes | 16, 20, 24, 32 |

Icons support text. Never replace labels with icons alone.

---

## Touch targets

| Token | Size |
|-------|-----:|
| Minimum | 48 × 48 |
| Preferred | 56 × 56 |

---

## Component sizes

| Component | Small | Medium | Large |
|-----------|------:|-------:|------:|
| Button height | 36 | 44 | 52 |
| Input height | 40 | 48 | 56 |

---

## Z-index

| Layer | Value |
|-------|------:|
| Base | 0 |
| Header | 10 |
| Floating action | 20 |
| Bottom sheet | 30 |
| Dialog | 40 |
| Toast | 50 |
| Tooltip | 60 |

---

## Opacity

| Token | Value | Usage |
|-------|------:|-------|
| disabled | 38% | Disabled elements |
| secondary | 60% | De-emphasized content |
| overlay | 50% | Modal backdrop |

---

## Breakpoints

| Device | Width |
|--------|------:|
| Small mobile | 360 |
| Mobile | 390 |
| Large mobile | 430 |
| Tablet | 768 |
| Desktop | 1024 |
