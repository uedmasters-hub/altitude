# Design Tokens

> Project Altitude Design Tokens
>
> Version: 0.1 (MVP)

---

# Overview

Design Tokens define the foundational visual properties used throughout Project Altitude.

Every screen, component, and interaction should reference these tokens instead of hardcoded values.

This ensures consistency, scalability, and easier maintenance.

---

# Typography

## Font Family

| Token | Value |
|--------|-------|
| Primary | Inter |
| Fallback | System UI |

---

## Font Weights

| Token | Weight | Usage |
|--------|-------:|-------|
| Regular | 400 | Body copy |
| Medium | 500 | Labels, Buttons |
| Semibold | 600 | Headings |
| Bold | 700 | Hero text |

---

## Type Scale

| Token | Size | Line Height | Usage |
|--------|-----:|------------:|-------|
| Display XL | 48 | 56 | Marketing |
| Display | 40 | 48 | Hero |
| H1 | 32 | 40 | Page Titles |
| H2 | 28 | 36 | Section Titles |
| H3 | 24 | 32 | Screen Heading |
| Title | 20 | 28 | Cards |
| Body Large | 18 | 28 | Featured Text |
| Body | 16 | 24 | Default |
| Body Small | 14 | 20 | Secondary |
| Caption | 12 | 16 | Labels |

---

# Colour Palette

## Neutral

| Token | Hex |
|--------|---------|
| White | #FFFFFF |
| Gray 50 | #FAFAFA |
| Gray 100 | #F5F5F5 |
| Gray 200 | #E5E5E5 |
| Gray 300 | #D4D4D4 |
| Gray 400 | #A3A3A3 |
| Gray 500 | #737373 |
| Gray 600 | #525252 |
| Gray 700 | #404040 |
| Gray 800 | #262626 |
| Gray 900 | #171717 |
| Black | #000000 |

---

## Brand

| Token | Hex |
|--------|---------|
| Primary 50 | #F5F3FF |
| Primary 100 | #EDE9FE |
| Primary 200 | #DDD6FE |
| Primary 300 | #C4B5FD |
| Primary 400 | #A78BFA |
| Primary 500 | #7C3AED |
| Primary 600 | #6D28D9 |
| Primary 700 | #5B21B6 |
| Primary 800 | #4C1D95 |
| Primary 900 | #3B0764 |

---

## Semantic Colours

### Success

| Token | Hex |
|--------|---------|
| Light | #DCFCE7 |
| Default | #16A34A |
| Dark | #166534 |

### Warning

| Token | Hex |
|--------|---------|
| Light | #FEF3C7 |
| Default | #F59E0B |
| Dark | #92400E |

### Error

| Token | Hex |
|--------|---------|
| Light | #FEE2E2 |
| Default | #DC2626 |
| Dark | #991B1B |

### Information

| Token | Hex |
|--------|---------|
| Light | #DBEAFE |
| Default | #2563EB |
| Dark | #1E40AF |

---

# Text Colours

| Token | Usage |
|--------|-------|
| Text Primary | Main content |
| Text Secondary | Supporting content |
| Text Tertiary | Hints & metadata |
| Text Disabled | Disabled state |
| Text Inverse | Dark backgrounds |

---

# Surface Colours

| Token | Usage |
|--------|-------|
| Background | App background |
| Surface | Cards |
| Elevated | Floating elements |
| Overlay | Modal backdrop |
| Divider | Borders & separators |

---

# Spacing

Project Altitude follows an **8pt Grid System**.

Micro spacing may use **4pt increments**.

| Token | Value |
|--------|------:|
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
| 20 | 80 |
| 24 | 96 |

---

# Border Radius

| Token | Value | Usage |
|--------|------:|-------|
| None | 0 | Images |
| XS | 4 | Inputs |
| SM | 8 | Chips |
| MD | 12 | Cards |
| LG | 16 | Bottom Sheets |
| XL | 24 | Hero Cards |
| Full | 999 | Pills |

---

# Borders

| Token | Width |
|--------|------:|
| Thin | 1 |
| Medium | 2 |
| Thick | 4 |

---

# Elevation

| Level | Usage |
|-------|-------|
| 0 | Background |
| 1 | Cards |
| 2 | Floating Search |
| 3 | Bottom Sheets |
| 4 | Dialogs |
| 5 | Toasts |

---

# Opacity

| Token | Value |
|--------|------:|
| Disabled | 38% |
| Secondary | 60% |
| Overlay | 80% |

---

# Icon Sizes

| Token | Size |
|--------|-----:|
| XS | 12 |
| SM | 16 |
| MD | 20 |
| LG | 24 |
| XL | 32 |
| XXL | 40 |

---

# Button Heights

| Token | Height |
|--------|-------:|
| Small | 36 |
| Medium | 44 |
| Large | 52 |

---

# Input Heights

| Token | Height |
|--------|-------:|
| Small | 40 |
| Medium | 48 |
| Large | 56 |

---

# Touch Targets

| Token | Size |
|--------|-----:|
| Minimum | 48 × 48 |
| Preferred | 56 × 56 |

---

# Layout

| Token | Value |
|--------|------:|
| Screen Padding | 24 |
| Section Gap | 32 |
| Component Gap | 24 |
| Card Gap | 16 |
| List Gap | 8 |
| Safe Area Top | 16 |
| Safe Area Bottom | 16 |

---

# Animation Duration

| Token | Duration |
|--------|----------:|
| Instant | 100ms |
| Fast | 150ms |
| Normal | 250ms |
| Slow | 350ms |
| Extra Slow | 500ms |

---

# Z-Index

| Layer | Value |
|--------|------:|
| Base | 0 |
| Header | 10 |
| Floating Action | 20 |
| Bottom Sheet | 30 |
| Dialog | 40 |
| Toast | 50 |
| Tooltip | 60 |

---

# Breakpoints

| Device | Width |
|--------|------:|
| Small Mobile | 360 |
| Mobile | 390 |
| Large Mobile | 430 |
| Tablet | 768 |
| Desktop | 1024 |

---

# Naming Convention

All tokens should follow a consistent naming pattern.

Examples

Typography

```
font.body
font.h1
font.caption
```

Spacing

```
space.4
space.8
space.16
```

Radius

```
radius.sm
radius.md
radius.full
```

Colours

```
color.primary.500
color.gray.200
color.success.default
```

Components should always consume these tokens instead of using raw values.