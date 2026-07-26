# Components

Reusable building blocks in `components/ui/`. Import from the barrel:

```tsx
import { Text, Button, Surface, Screen } from '../components/ui';
```

Rules: every component solves one problem, follows design tokens, supports required states. Before creating a new primitive, check whether an existing one can do the job. A component earns a place in `ui/` only when it's used on 2+ screens — until then, keep it local to the screen file.

---

## Primitives (implemented)

### Text

Typed wrapper over RN Text. Never import `Text` from `react-native` in screens.

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| variant | typography key | body | display, h1, h2, bodyLarge, body, bodyMedium, bodySmall, caption, label |
| color | color token key | text | Any key from the colors object |
| align | left, center, right | left | — |

```tsx
<Text variant="display">Where are you flying next?</Text>
<Text variant="caption" color="textSecondary">Non-stop · 2h 25m</Text>
```

### Button

One primary button per screen. Purple (#7C3AED) primary. Full-width for thumb-first CTAs.

| Prop | Type | Default |
|------|------|---------|
| variant | primary, secondary, ghost | primary |
| size | md (44px), lg (52px) | lg |
| rounded | boolean | false |
| loading | boolean | false |
| disabled | boolean | false |

Primary CTA buttons use `rounded` (pill shape) as seen on onboarding, calendar, and booking screens. Non-CTA buttons use default `md` radius.

States: default, pressed, disabled, loading.

```tsx
<Button label="Continue" onPress={next} rounded />             // primary pill CTA
<Button label="Search flights" onPress={search} />             // primary rect
<Button label="Change dates" onPress={edit} variant="secondary" />
<Button label="Skip" onPress={skip} variant="ghost" size="md" />
```

### Surface

Card container. Four elevation levels matching shadow tokens.

| Prop | Type | Default |
|------|------|---------|
| elevation | flat, raised, floating, overlay | flat |
| padded | boolean | true |

```tsx
<Surface elevation="raised">           {/* flight cards */}
<Surface elevation="floating">         {/* search bar */}
```

### Screen

Safe-area wrapper enforcing thumb-first layout. Every screen wraps content in this.

| Prop | Type | Default |
|------|------|---------|
| anchor | bottom, top | bottom |
| edges | safe area edges array | ['top'] |

```tsx
<Screen>               {/* content at bottom */}
<Screen anchor="top">  {/* scrollable list (airport search) */}
```

### Input

Text input with optional label and icon. Background uses `borderLight` (gray100).

States: default, focused, filled, error, disabled.

```tsx
<Input placeholder="Where to next?" icon={<SearchIcon />} />
<Input label="From" placeholder="Delhi (DEL)" />
```

### Tag

Recommendation badges. Colors match screen designs:

```tsx
<Tag tag="bestValue" />   {/* purple — primary50 bg */}
<Tag tag="cheapest" />    {/* orange — warningLight bg */}
<Tag tag="fastest" />     {/* blue — infoLight bg */}
```

### Row

Horizontal layout with gap control.

```tsx
<Row gap="md" justify="space-between">
  <Text>DEL → BLR</Text>
  <Text variant="bodyLarge" style={{ color: colors.deal }}>$750</Text>
</Row>
```

### ListRow

Pressable row for airport list. Large touch targets, consistent spacing.

```tsx
<ListRow onPress={() => selectAirport(airport)}>
  <Text variant="bodyMedium">Delhi (DEL)</Text>
</ListRow>
```

### Divider

Hairline separator. Prefer whitespace over separators.

---

## Planned components (not yet built)

Build these when the screen that needs them is being implemented.

**Bottom Sheet** — preferred over full-screen for selection workflows (airport search, passenger selection, cabin class, fare details). Supports collapsed, half-expanded, fully expanded. Animates from bottom, follows drag gesture.

**Calendar** — standard monthly grid. Selected date: purple filled circle (`primary`). Cheapest dates: orange outline circle (`deal`). Month transitions animate smoothly. Bottom CTA: "Continue" (pill).

**Date Strip** — horizontal scrollable row of dates with prices underneath. Selected date: purple background pill. Prices use `deal` color. Used at top of flight results.

**Cheapest Dates Strip** — horizontal scrollable row showing cheapest dates across months. Day abbreviation + date + price in orange. Used on date selection screen.

**Price Histogram** — bar chart showing fare trends across months. Selected bar uses purple (`primary`). Gray bars for other dates. Used on date selection screen.

**Flight Card** — dashed-border timeline card showing departure → arrival. Includes airline logo, flight number, times with terminal codes, "Direct" / stops indicator, duration. Strikethrough original price + deal price in orange.

**Destination Card** — image card with text overlay (bottom-left). Title + subtitle over gradient. Used in "Weekend Escapes" section. Radius: `lg`.

**Greeting Bar** — top bar with avatar, greeting text ("Hello, Ramesh"), weather widget, notification bell. Home screen only.

**Bottom Tab Navigation** — 4 tabs: Explore, Trips, Saved, Account. Icon + label per tab. Active tab uses `primary` color.

**Alphabet Scrubber** — right-edge letter index for fast-scrolling through airport list. Letters A-Z. Bold active letter.

**Stepper** — increment/decrement for passenger counts. No dropdowns.

**Skeleton Loader** — loading placeholder. Preferred over spinners.

**Toast** — short feedback. Disappears automatically.

**Dialog** — confirmation only. Two actions always.

---

## Component rules

- One primary button per screen, using pill shape (`rounded`) for the main CTA
- Cards don't become dashboards — one object per card
- Lists avoid unnecessary separators — whitespace preferred
- Every interactive element needs a visible focus state
- Every icon-only action needs an accessible label
- Skeleton loaders over spinners
- Empty states: what happened + what to do
- Error states: what went wrong + what can I do
