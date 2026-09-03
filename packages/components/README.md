# @wavemaker/rn-components

WaveMaker React Native widgets in one package — bottom tab bars (8 variants +
shared helpers), tabs, and carousel.

## Install

```bash
npm install @wavemaker/rn-components
```

Peer dependencies (install if not already present):

```bash
npm install react react-native react-native-safe-area-context react-native-svg
```

`react-native-safe-area-context` and `react-native-svg` are only needed by the
tab bar widgets; the tabs and carousel widgets use plain `react-native`
primitives.

## Layout

Each widget group is a folder under `src/` with its own barrel, and
`src/index.ts` re-exports all of them:

| Folder | What |
|--------|------|
| `src/tabbar/` | Bottom tab bar widgets — 8 variants + shared helpers |
| `src/tabs/` | Tabs widget (`Tabs`, `Tabpane`) |
| `src/carousel/` | Carousel widget |

Import from the package root, or from a group barrel when you want only one
widget family:

```tsx
import { Tabbar, Tabs, Carousel } from '@wavemaker/rn-components';
import { Tabs, Tabpane } from '@wavemaker/rn-components/tabs';
```

The package root has no default export (the three group barrels each have one) —
import components by name.

## Tab bars — `src/tabbar/`

| Folder | Variant |
|--------|---------|
| `tabbar/` | Classic Material |
| `floating-dock-tabbar/` | Floating Dock |
| `expanding-pill-tabbar/` | Expanding Pill — sliding pill reveals the active label |
| `notched-fab-tabbar/` | Notched bar with center notch + FAB |
| `moving-notch-tabbar/` | Moving Notch |
| `curved-bump-tabbar/` | Curved Bump |
| `notched-dock-tabbar/` | Notched Dock |
| `notched-drop-tabbar/` | Notched Drop |

`Tabbar` dispatches to a design via its `variant` prop (default `classic`); each
design is also exported under its own name. Every variant folder follows the same
shape: `*.component.tsx`, `*.props.ts`, `*.styles.ts`, `*.style-props.ts`,
`use-*-styles.ts`, and an `index.ts` barrel. Cross-variant helpers (SVG icons,
nav parser, palette, defaults) live in `src/tabbar/shared/`.

### Styling

Each component takes a self-contained widget contract (`Partial<TabbarWidgetProps>`): tabs are described by `numberOfItems` plus per-index callbacks — `getIcon(index, active)` (returns an SVG icon node), `getLabel(index)`, and optional `getBadgeCount(index)` — with `activeIndex` selecting the active tab and `onItemClick(index)` reporting presses. Demo tabs ship with the package (`TABBAR_DEFAULT_TABS`, `demoTabbarDefaults`) so a widget renders sample content with no props.

Components accept an optional **`styles`** prop (region keys mapped to React Native `StyleProp<ViewStyle>` / `StyleProp<TextStyle>`, merged as `[defaultStyle, override]`) and an **`iconPalette`**. Some variants (e.g. `ExpandingPillTabbar`, `NotchedFabTabbar`) additionally accept a **`layout`** prop for numeric geometry that sits outside `StyleProp`.

```tsx
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

const bar: StyleProp<ViewStyle> = { backgroundColor: '#111' };
const activeLabel: StyleProp<TextStyle> = { fontSize: 15, fontWeight: '600' };
const sheet = StyleSheet.create({ activePill: { backgroundColor: '#fff' } });

<ExpandingPillTabbar
  styles={{ bar, activePill: sheet.activePill, activeLabel }}
  iconPalette={{ inactive: '#aaa', active: '#111' }}
  layout={{ pillInset: { horizontal: 24, vertical: 10 } }}
/>

<NotchedFabTabbar
  styles={{ fab: { backgroundColor: '#f97316' } }}
  layout={{ barFill: '#0f172a', fabSize: 52 }}
/>
```

## Tabs — `src/tabs/`

| File | Purpose |
|------|---------|
| `tabs.component.tsx` | `Tabs` + `Tabpane` components and `createTabsProps` |
| `tabs.props.ts` | Prop types |
| `tabs.styles.ts` | Styles |
| `notched-border-bar.tsx`, `bell-drop-bar.tsx` | Decorative tab-bar shapes |
| `notched-dock-indicator.ts` | Active-tab indicator geometry |
| `index.ts` | Group barrel |

Exports `Tabs`, `Tabpane`, `createTabsProps`, plus types `TabsProps`,
`TabpaneProps`, `TabsStylesProp`, `TabsBarPosition`, `TabsAlignment`,
`TabsVariant`.

## Carousel — `src/carousel/`

| File | Purpose |
|------|---------|
| `carousel.component.tsx` | `Carousel` component + `createCarouselProps` |
| `carousel.props.ts` | Prop types |
| `carousel.styles.ts` | Styles |
| `carousel.animations.ts` | Built-in transitions (`CAROUSEL_ANIMATIONS`) |
| `index.ts` | Group barrel |

- Configurable pagination (variant, position, alignment, visibility)
- Configurable controls (position, layout, visibility)
- Autoplay with duration, default index, peek, and multiple-per-view support
- Pluggable animations via `CarouselAnimation` / `CarouselAnimationFn`

## Build

```bash
npm run build   # from the code/ root
```
