---
name: component-creation
description: Scaffold a new WaveMaker RN component/widget (a standalone widget group under packages/components/src, or a new variant of an existing multi-variant widget family) following the sample_button reference convention — component, props, styles, style hook, index barrel, tests, and Storybook stories. Use when adding a new widget, widget variant, or widget group to this repo.
---

# Component creation

Scaffolds a new widget in `@wavemaker/rn-components` so it looks and behaves
like every other widget in the package. `packages/components/src/sample_button/`
is the canonical reference — copy its shape, not just its style.

Read `CLAUDE.md` at the repo root first if it isn't already in context — it
defines the layout, the variant file convention, and the verification
commands this skill relies on.

## 1. Decide where the component lives

- **Standalone widget group** (its own top-level folder under
  `packages/components/src/`, own barrel exported from `src/index.tsx`) —
  this is what `sample_button` is. Default to this unless the task is
  explicitly "add a variant of widget family X."
- **A variant of an existing multi-variant widget family**
  (`packages/components/src/<family>/<variant>/`) — only once that family's
  folder already exists in the repo. Variants in such a family typically
  share a common widget contract and helpers in `<family>/shared/` — reuse
  those instead of duplicating logic, and register the new variant in
  `<family>/index.ts`. Such variants also split style *prop types* into their
  own `<variant>.style-props.ts` file, unlike the flatter `sample_button`
  layout below.
- If neither applies (a genuinely new group like `tabs` or `carousel`),
  treat it like a standalone widget group.

Pick a **folder name** in `snake_case` (e.g. `sample_button`) and a
**component name** in `PascalCase` (e.g. `SampleButton`).

## 2. Scaffold the files

Under `packages/components/src/<name>/`, create (mirroring `sample_button`):

| File | Contents |
|---|---|
| `<name>.props.ts(x)` | `<Name>Props` interface + `create<Name>Props(overrides)` factory with sensible defaults. JSDoc only on props whose behavior isn't obvious from the name/type (e.g. "Omit to render an icon-only button"). |
| `<name>.styles.ts` | `StyleSheet.create({...})` for static styles, a default color palette const (`<NAME>_DEFAULT_PALETTE`) if the component has variants/states, size metrics table if it has a `size` prop, and the `<Name>StylesProp` region-override interface (unless the variant convention splits this into `<variant>.style-props.ts`). |
| `use-<name>-styles.ts` | A hook that takes the resolved variant/size/disabled/etc. plus `styles?`/`palette?` overrides, and returns a `useMemo`-memoized object of resolved `StyleProp` arrays. Merge order is always **`[static default, computed per-variant, caller override]`** — never let a caller override be shadowed by a default. |
| `<name>.component.tsx` | A `React.FC<Props>` that destructures props with defaults inline (`variant = 'filled'`, not defaults in the props factory), calls the style hook, and renders plain `react-native` primitives. Set `displayName`, export both named and `default`. |
| `index.ts` | `export { <Name>, default } from './<name>.component'; export * from './<name>.props'; export * from './<name>.styles'; export * from './use-<name>-styles';` |

Conventions to match exactly:
- Every interactive root element takes `testID`, and derived child testIDs are
  `` `${testID}_<region>` `` (e.g. `save-btn_badge`), only rendered when
  `testID` is set.
- `accessibilityLabel` defaults to falling back to the visible caption/text
  (`accessibilityLabel ?? caption`), never silently drops accessibility info.
- Booleans like `disabled`/`loading` compose (`isDisabled = disabled ||
  loading`) rather than one silently overriding the other.
- Icon-render props are callbacks (`icon?: (args: { size, color }) =>
  ReactNode`) that receive resolved size/color from the style hook, not raw
  JSX — so the caller's icon always matches the current variant/size.
- Don't inline style objects in the component; every style comes from the
  `use-<name>-styles` hook's resolved output.

## 3. Wire it into the package

- Standalone group: add `export * from './<name>';` to
  `packages/components/src/index.tsx`. Do **not** re-export the group's
  `default` from the root barrel — only one group can own `default`, and the
  existing comment there explains why; leave it alone.
- A variant of an existing family: export it from that family's
  `packages/components/src/<family>/index.ts` instead.
- Never add `react-native-safe-area-context` / `react-native-svg` /
  `react-native` itself as a hard dependency — they're peer deps.

## 4. Tests

Create `packages/components/test/<name>/` with the same three-file split as
`sample_button`'s tests, importing from `../../src/<name>`:

- `<name>.component.test.tsx` — `vitest` + `@testing-library/react`
  (`render`, `screen`, `fireEvent`). Cover: default render, accessibility
  role/label (including the explicit-label-wins-over-caption case), press
  handling, each disabled-like state *not* firing `onPress`, each
  prop-driven branch (icon position, badge presence/absence, loading vs.
  caption), and that `testID` propagates.
- `<name>.props.test.ts` — asserts the factory's defaults and that overrides
  win.
- `use-<name>-styles.test.ts` — uses `renderHook` + a
  `StyleSheet.flatten(style as never)` helper to assert resolved colors per
  variant, resolved metrics per size, that caller `styles` overrides merge
  on top of (not instead of) the palette-driven values, and that a custom
  `palette` override wins.

## 5. Storybook stories

Under `storybook/stories/<name>/<ComponentName>/`, add **one file per
prop/behavior axis** (variant, size, disabled, loading, icon, icon-position,
badge-count, full-width, styles, palette, on-press, accessibility-label,
test-id — whichever apply to this component), named `<axis>.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { <Name> } from '@wavemaker/rn-components/<name>';

const meta = {
  title: '<name>/<ComponentName>/<axis>',
  component: <Name>,
  args: { /* shared defaults, onPress: fn() if it takes one */ },
  argTypes: { /* control config for the axis this file covers */ },
} satisfies Meta<typeof <Name>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One-line doc comment stating the default value/behavior. */
export const Default: Story = {};
// one named Story export per value on this axis
```

Put any shared story-only helpers (e.g. a demo icon) in a plain `.tsx` file
alongside the stories (see `icons.tsx`), not inside `src/`.

## 6. Optional: Studio (wmx-components) wrapper

Only add this if the widget is meant to ship as a WaveMaker Studio widget
(overriding or extending a built-in one), not for a pure library component.
Under `packages/wmx-components/src/<name>/`:

- `index.tsx` — a class extending `BaseComponent<Props, State, Styles>` from
  `@wavemaker-ai/app-rn-runtime`, constructed with the runtime's own props
  type (e.g. `WmButtonProps`) so it binds/behaves like the framework widget,
  but whose `renderWidget` renders the new component from
  `@wavemaker/rn-components/<name>` instead of the runtime's own markup.
  Map runtime prop names (lowercase, e.g. `iconclass`, `badgevalue`) to the
  new component's props explicitly; don't assume they match.
- `wmx.json` — widget metadata: `name`, `displayName`, `description`,
  `version` (leave at `0.0.0-dev.0` — versioning is root-`package.json`
  driven per CLAUDE.md), `group`, `dependencies` (`@wavemaker/rn-components`
  + `@wavemaker-ai/app-rn-runtime`, both `"*"`), `props` (each with `name`,
  `displayName`, `type`, optional `enum`/`defaultValue`), `events`, `styles`
  (the region names the wrapper exposes via `this.styles.*`).
- `icon.svg` — a Studio palette icon.
- After adding this, regenerate metadata: `cd packages/wmx-components && npm
  run generate:wmx`.

## 7. Verify before calling it done

From the repo root:

```bash
npm run typecheck
npm run test
```

Both must pass. If you touched `.tsx`/`.ts` broadly, also run `npm run
lint`. Never edit `build/` or `dist/` — they're generated by `npm run
build`/`npm run pack`. Never bump `packages/components/package.json`'s
version — it's derived from the root `package.json` at build time.
