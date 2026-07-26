# Altitude Architecture

Technical decisions and project structure.

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Expo SDK 52 | Single codebase for iOS, Android, web |
| Language | TypeScript (strict) | Catch errors early |
| Navigation | Expo Router | File-based routing, deep links free |
| Styling | StyleSheet + tokens | No runtime overhead, full control |
| State | React state + context | No external library until it's needed |

### Not using (and why)

- **NativeWind / Tailwind** — Tokens file gives the same consistency without a build step dependency.
- **Redux / Zustand / Jotai** — Premature. Context + `useReducer` will cover MVP. Add a store when state is shared across 3+ unrelated screens.
- **UI library (RN Paper, Tamagui)** — The design language is custom. A library would fight it.

---

## Project Structure

```
altitude/
├── app/                  Routes (Expo Router)
│   ├── _layout.tsx       Root stack config
│   ├── index.tsx         Home
│   ├── airport-search    Airport picker
│   ├── date-select       Calendar
│   ├── flights           Recommendations
│   └── booking           Checkout
│
├── components/
│   └── ui/               Design system primitives (Text, Button, Surface...)
│                          Screen-specific components live next to their screen
│                          until reused — then promote to ui/
│
├── constants/
│   └── tokens.ts          Colors, spacing, typography, radii
│
├── data/
│   └── airports.ts        Mock data for dev
│
├── docs/                  You are here
│
├── hooks/                 Custom hooks (created on demand)
│
├── lib/
│   └── preferences.ts     User signal store (extension-ready)
│
└── types/
    └── index.ts           Shared type contracts
```

### Where does new code go?

- **New screen?** → `app/screen-name.tsx`
- **Reusable visual component?** → `components/ui/ComponentName.tsx`, add to barrel
- **Screen-specific component?** → Keep it in the screen file until it's needed elsewhere
- **New token?** → `constants/tokens.ts`
- **API / data logic?** → `lib/module-name.ts`
- **New type?** → `types/index.ts` (split when it gets long)
- **Custom hook?** → `hooks/useHookName.ts`

---

## Data Flow

### MVP (current)

```
User input → React state (local) → Screen renders
                ↓
          preferences.ts (in-memory)
```

No backend. Mock data. Everything local.

### Phase 2 — Backend + Sync

```
User input → React state → API → Backend
                                    ↑
                            preferences.ts → AsyncStorage (offline cache)
```

### Phase 3 — Extension Integration

```
Browser extension
    ↓ (observed search signals)
    ↓
Backend  ←→  App
    ↑
    UserPreferences (source-agnostic)
```

The extension writes signals with `source: 'extension'`. The app writes with `source: 'app'`. The recommendation engine reads `UserPreferences` without caring about the source.

Key type: `types/index.ts → UserPreferences`
Key module: `lib/preferences.ts` (swap storage backend here)

---

## Extension Strategy (Phase 2-3)

The browser extension will be a separate repo/package. What's shared:

| Shared | Location | Notes |
|--------|----------|-------|
| `UserPreferences` type | `types/index.ts` | Extract to `@altitude/shared` package when needed |
| `SignalSource` type | `types/index.ts` | |
| `UserSignal` type | `types/index.ts` | |
| API contracts | `lib/` (future) | Backend endpoints for pushing signals |

What's NOT shared: UI components, navigation, tokens. The extension has its own minimal UI.

### Migration path

1. MVP: types live in `types/index.ts`
2. Phase 2: copy shared types into a `packages/shared/` workspace
3. Phase 3: publish as `@altitude/shared` if extension becomes a separate repo

No monorepo setup now. The types are clean enough to copy-paste when the time comes.

---

## Conventions

- **File naming**: `kebab-case` for routes, `PascalCase` for components
- **Imports**: relative paths (no `@/` alias configured yet — add when path depth becomes painful)
- **Exports**: named exports only, no default except route components (Expo Router requires them)
- **Comments**: explain *why*, not *what*
