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
<Text variant="display">Where to?</Text>
<Text variant="caption" color="textSecondary">Non-stop</Text>
```

### Button

One primary button per screen. Full-width by default for thumb-first.

| Prop | Type | Default |
|------|------|---------|
| variant | primary, secondary, ghost | primary |
| size | md (44px), lg (52px) | lg |
| loading | boolean | false |
| disabled | boolean | false |

States: default, pressed, disabled, loading.

```tsx
<Button label="Search flights" onPress={search} />
<Button label="Change dates" onPress={edit} variant="secondary" />
<Button label="Skip" onPress={skip} variant="ghost" size="md" />
```

### Surface

Card container. Cards represent meaningful objects (destination, flight, recommendation) — never dashboards.

| Prop | Type | Default |
|------|------|---------|
| elevation | flat, raised, overlay | flat |
| padded | boolean | true |

```tsx
<Surface elevation="raised">
  <Text variant="h2">Delhi → Goa</Text>
</Surface>
```

### Screen

Safe-area wrapper enforcing thumb-first layout. Every screen wraps content in this.

| Prop | Type | Default |
|------|------|---------|
| anchor | bottom, top | bottom |
| edges | safe area edges array | ['top'] |

Bottom anchor (default) pushes content to the bottom third. Use `top` for scrollable lists.

```tsx
<Screen>               {/* content at bottom */}
<Screen anchor="top">  {/* scrollable list */}
```

### Input

Text input with optional label and icon.

| Prop | Type | Default |
|------|------|---------|
| label | string | — |
| icon | ReactNode | — |

States: default, focused, filled, error, disabled. Search is the primary input pattern throughout the product.

```tsx
<Input placeholder="Search airports" />
<Input label="From" placeholder="Delhi (DEL)" icon={<PlaneIcon />} />
```

### Tag

Recommendation badges tied to `RecommendationTag` type. Concise and non-interactive.

```tsx
<Tag tag="bestValue" />   {/* purple "Best value" */}
<Tag tag="cheapest" />    {/* green "Cheapest" */}
<Tag tag="fastest" />     {/* blue "Fastest" */}
```

### Row

Horizontal layout with gap control.

```tsx
<Row gap="md" justify="space-between">
  <Text>DEL → BOM</Text>
  <Text variant="bodyMedium">₹4,200</Text>
</Row>
```

### ListRow

Pressable row for lists (airports, flights). Large touch targets, consistent spacing.

```tsx
<ListRow onPress={() => selectAirport(airport)}>
  <Text variant="bodyMedium">{airport.city}</Text>
  <Text variant="caption" color="textSecondary">{airport.iata}</Text>
</ListRow>
```

### Divider

Hairline separator. Prefer whitespace over separators — use only when groups need visual distinction.

```tsx
<Divider />
<Divider spacing="lg" />
```

---

## Planned components (not yet built)

These will be implemented as screens require them.

**Bottom Sheet** — preferred over full-screen for selection workflows (airport search, passenger selection, cabin class, fare details). Supports collapsed, half-expanded, and fully expanded. Animates from bottom, follows gesture.

**Calendar** — standard monthly grid for date selection. Enhanced with fare highlights, not replaced. Supports single date and range.

**Stepper** — increment/decrement control for passenger counts. No dropdowns.

**Skeleton Loader** — loading placeholder matching content shape. Preferred over spinners.

**Toast** — short feedback ("Saved", "Copied"). Disappears automatically, never requires interaction.

**Dialog** — confirmation only (cancel booking, discard changes). Always provides primary and secondary action.

**Accordion** — reveals secondary info (fare rules, baggage, cancellation). Collapsed by default.

---

## Component rules

- One primary button per screen
- Cards don't become dashboards — one object per card
- Lists avoid unnecessary separators — whitespace is preferred
- Every interactive element needs a visible focus state
- Every icon-only action needs an accessible label
- Loading: skeleton loaders over spinners
- Empty states answer: what happened? What should I do?
- Error states answer: what went wrong? What can I do next?
