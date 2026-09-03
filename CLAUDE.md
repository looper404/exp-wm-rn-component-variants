# CLAUDE.md

Guidance for AI agents (and humans) working in this repo. Read this first.

## What this is

`@wavemaker/rn-components` — one publishable npm package containing every
WaveMaker React Native widget, grouped by folder under `src/`. A Storybook host
renders them all on the web via `react-native-web`, and the WMX workspace
generates WaveMaker Studio metadata.

**Run every command from the repo root** (the directory this file lives in).

## Layout

| Path | What |
|------|------|
| `packages/components/` | `@wavemaker/rn-components` — the single widget package |
| `packages/components/src/tabbar/` | 8 tab bar variants + shared helpers |
| `packages/components/src/tabs/` | Tabs widget |
| `packages/components/src/carousel/` | Carousel widget |
| `packages/tsconfig.base.json` | Shared strict TS config the package extends |
| `storybook/` | `@wavemaker/rn-storybook` — common Storybook host (Vite + react-native-web) |
| `packages/wmx-components/` | `@wavemaker/rn-components/tabbar-wmx` — Studio wrappers + metadata (ships from `components/`, not `src/`) |
| `scripts/build-npm-package.js` | Build orchestrator (compile + trim package.json + pack) |
| `dist/` | Packed `.tgz` tarballs land here (gitignored) |

## Commands

```bash
npm run build            # build the widget package
npm run pack             # build + create a publishable tarball in dist/
npm run typecheck        # tsc --noEmit over the package (fast correctness check)
npm run lint             # ESLint over packages/**/src
npm run test             # Vitest (jsdom + react-native-web)

cd storybook && npm run storybook   # http://localhost:6006
cd packages/wmx-components && npm run generate:wmx   # regenerate Studio metadata
```

**After any source change, run `npm run typecheck` and `npm run test`.** The
build script uses the package's own `tsc` against `tsconfig.build.json`; the dev
`tsconfig.json` (with `noEmit`) is what `typecheck` uses.

## Conventions

- **Version comes from the root `package.json`** at build time — do not bump the
  version in `packages/components/package.json`.
- **Package entry** is `src/index.ts`, which re-exports the three group barrels
  (`src/tabbar`, `src/tabs`, `src/carousel`). Each group keeps its own
  `index.ts` so subpath imports still work. The root barrel exports no
  `default` — the groups each have one, so they cannot all be re-exported.
  Source is shipped-from and compiled to `build/` at publish; `build/` and
  `dist/` are generated — never edit them.
- **Variant file convention** (each tabbar variant folder mirrors this):
  - `<variant>.component.tsx` — the component
  - `<variant>.props.ts(x)` — props + `create<Variant>Props` factory
  - `<variant>.style-props.ts` — style prop types
  - `<variant>.styles.ts` — `StyleSheet.create` styles + the variant palette
  - `use-<variant>-styles.ts` — resolved-styles hook (merges caller overrides)
  - `index.ts` — re-exports; `src/tabbar/index.ts` re-exports each variant
- **Shared code** lives in `packages/components/src/tabbar/shared/` (icons, the tab-item
  builder + `TabbarWidgetProps`/`TabbarNavItem` contract in `tabbar-types.ts`,
  palette, style utils, defaults). Prefer extending shared helpers over
  duplicating per-variant.
- **The tab bar widgets are standalone** — they do NOT depend on
  `@wavemaker/app-rn-runtime`. They own their widget contract (`TabbarWidgetProps`:
  `numberOfItems` + per-index `getIcon`/`getLabel`/`getBadgeCount` callbacks,
  `activeIndex`, `onItemClick`) and renders with plain `react-native` primitives
  + `react-native-safe-area-context` + `react-native-svg` (peer deps — don't add
  them as hard deps). (The `tabs` and `carousel` widgets are wrapped for
  `@wavemaker/app-rn-runtime` in `packages/wmx-components/components/`; that dependency lives there,
  not in this package.)
- Adding a new variant: create the folder under `packages/components/src/tabbar/`
  following the convention above, export it from
  `packages/components/src/tabbar/index.ts`, and add a Storybook story under
  `storybook/stories/tabbar/`.

## Gotchas

- Storybook renders RN components through `react-native-web`; tests use the same
  alias. If an import works in Storybook but fails in a test, check the alias in
  `vitest.config.ts`.
- **Testing approach:** unit-test pure logic (helpers in `shared/`, props
  factories, layout math) — these use type-only RN imports that erase cleanly.
  Tabbar widgets are self-contained (no runtime navigation stack), so render
  tests only need the `react-native-web` alias, not runtime providers. Tests live
  in `packages/components/test/<widget>/` as `*.test.ts(x)` (importing from
  `../../src/...`); shared setup is the root `test/setup.ts`. The `test/` folder
  is excluded from the published build.
- `strict` mode is on and `typecheck` is currently clean — keep it that way.
- The parent directory of this repo is **not** a git repo and contains design
  research (`tabbar-designs/`, `scripts/`); this repo is the publishable project.
