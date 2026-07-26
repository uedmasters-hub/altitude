# Altitude Design System

The design system for Project Altitude. Every screen is composed from these primitives.

---

## Principles

1. **One primary action per screen.** If a screen has two buttons competing for attention, one needs to go.
2. **Thumb-first.** Primary actions and inputs sit in the bottom third. The `Screen` component enforces this with `anchor="bottom"` by default.
3. **No magic numbers.** Every color, size, and radius comes from `constants/tokens.ts`. If a value isn't in tokens, either add it there or question whether you need it.
4. **Compose, don't customise.** Build screens by composing primitives. If you're passing more than 2-3 style overrides, the primitive is missing a variant.

---

## Tokens

All values live in `constants/tokens.ts`.

### Colors

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Background | `bg` | `#FAFAFA` | App background |
| Surface | `surface` | `#FFFFFF` | Cards, sheets |
| Border | `border` | `#E8E8E8` | Visible dividers |
| Border light | `borderLight` | `#F0F0F0` | Subtle card borders |
| Text | `text` | `#1A1A1A` | Primary text |
| Text secondary | `textSecondary` | `#6B6B6B` | Supporting text |
| Text tertiary | `textTertiary` | `#9B9B9B` | Placeholders, hints |
| Primary | `primary` | `#1A1A1A` | Buttons, interactive |
| Accent | `accent` | `#2563EB` | Links, active states |

Recommendation tag colors: `bestValue` (purple), `cheapest` (green), `fastest` (blue). Each has a soft background variant.

### Spacing

| Token | Value | Use for |
|-------|-------|---------|
| `xs` | 4px | Tight gaps inside components |
| `sm` | 8px | Default inner gap |
| `md` | 16px | Component padding |
| `lg` | 24px | Screen horizontal padding |
| `xl` | 32px | Section spacing |
| `xxl` | 48px | Bottom safe zone |

### Typography

| Variant | Size / Weight | Use for |
|---------|--------------|---------|
| `display` | 28 / 700 | Screen titles ("Where to?") |
| `h1` | 22 / 600 | Section headers |
| `h2` | 18 / 600 | Card titles |
| `body` | 16 / 400 | Default text |
| `bodyMedium` | 16 / 500 | Emphasis in body |
| `caption` | 13 / 400 | Supporting info |
| `label` | 13 / 500 | Tags, form labels |

### Radii

`sm` (8), `md` (12), `lg` (16), `full` (9999).

---

## Primitives

All primitives live in `components/ui/`. Import from the barrel:

```tsx
import { Text, Button, Surface, Screen } from '../components/ui';
```

### `<Screen>`

Safe-area wrapper that enforces thumb-first layout.

```tsx
<Screen>                           // anchors content to bottom (default)
<Screen anchor="top">              // for scrollable lists
<Screen edges={['top', 'bottom']}> // control safe area edges
```

### `<Text>`

Typed wrapper over RN Text. Never use raw `<Text>` from react-native.

```tsx
<Text variant="display">Where to?</Text>
<Text variant="caption" color="textSecondary">3 stops</Text>
```

### `<Button>`

Full-width by default. Three variants.

```tsx
<Button label="Search flights" onPress={search} />                    // primary
<Button label="Change dates" onPress={edit} variant="secondary" />     // secondary
<Button label="Skip" onPress={skip} variant="ghost" />                 // ghost
<Button label="Booking..." onPress={noop} loading />                   // loading
```

### `<Surface>`

Card container with three elevation levels.

```tsx
<Surface>                    // flat — subtle border
<Surface elevation="raised"> // shadow — lifted card
<Surface elevation="overlay"> // deep shadow — bottom sheets
```

### `<Input>`

Text input with optional label and icon slot.

```tsx
<Input placeholder="Search airports" />
<Input label="From" placeholder="Delhi (DEL)" icon={<PlaneIcon />} />
```

### `<Tag>`

Recommendation badges. Tied to `RecommendationTag` type.

```tsx
<Tag tag="bestValue" />   // purple "Best value"
<Tag tag="cheapest" />    // green "Cheapest"
<Tag tag="fastest" />     // blue "Fastest"
```

### `<Row>`

Horizontal layout with gap control.

```tsx
<Row gap="md" justify="space-between">
  <Text>DEL → BOM</Text>
  <Text variant="bodyMedium">₹4,200</Text>
</Row>
```

### `<ListRow>`

Pressable row for lists (airports, flights).

```tsx
<ListRow onPress={() => selectAirport(airport)}>
  <Text variant="bodyMedium">{airport.city}</Text>
  <Text variant="caption" color="textSecondary">{airport.iata}</Text>
</ListRow>
```

### `<Divider>`

Hairline separator.

```tsx
<Divider />              // default md spacing
<Divider spacing="lg" /> // more breathing room
```

---

## Rules

- **Never import `Text` from `react-native` in screens.** Use the design system `Text`.
- **Never hardcode colors or spacing.** Use tokens.
- **Screens don't define their own safe area.** `Screen` handles it.
- **New primitives need a reason.** If it's used on fewer than 2 screens, it's not a primitive yet — keep it local.
- **No component libraries.** Everything is hand-built from tokens. This keeps the bundle small and the visual language consistent.
