# @wavemaker/rn-components

WaveMaker React Native widgets in one package — tabs, carousel, and
sample_button.

## Install

```bash
npm install @wavemaker/rn-components
```

Peer dependencies (install if not already present):

```bash
npm install react react-native
```

## Layout

Each widget group is a folder under `src/` with its own barrel, and
`src/index.ts` re-exports all of them:

| Folder | What |
|--------|------|
| `src/tabs/` | Tabs widget (`Tabs`, `Tabpane`) |
| `src/carousel/` | Carousel widget |
| `src/sample_button/` | Sample Button widget |

Import from the package root, or from a group barrel when you want only one
widget family:

```tsx
import { Tabs, Carousel, SampleButton } from '@wavemaker/rn-components';
import { Tabs, Tabpane } from '@wavemaker/rn-components/tabs';
import { SampleButton } from '@wavemaker/rn-components/sample_button';
```

The package root has no default export (each group barrel has one) — import
components by name.

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

## Sample Button — `src/sample_button/`

| File | Purpose |
|------|---------|
| `sample_button.component.tsx` | `SampleButton` component |
| `sample_button.props.ts` | Prop types + `createSampleButtonProps` factory |
| `sample_button.styles.ts` | Default `StyleSheet`, size metrics, and color palette |
| `use-sample_button-styles.ts` | Resolved-styles hook (merges caller overrides) |
| `index.ts` | Group barrel |

`SampleButton` takes a `caption` and/or an `icon` render prop (`(args: { size, color }) => ReactNode`),
a `variant` (`filled` | `outlined` | `text`), a `size` (`small` | `medium` | `large`), and
`iconPosition` (`left` | `right` | `top`). `disabled` and `loading` both suppress `onPress`;
`loading` also swaps the caption for a spinner. `badgeCount` renders a small badge pinned to the
top-right corner. It accepts an optional **`styles`** prop (region keys —
`root`, `content`, `text`, `icon`, `badge`, `badgeText` — mapped to RN `StyleProp`, merged as
`[defaultStyle, override]`) and a **`palette`** to override colors per variant/disabled state.

```tsx
<SampleButton caption="Save" variant="filled" size="medium" onPress={() => {}} />
<SampleButton caption="Favorite" icon={({ size, color }) => <StarIcon size={size} color={color} />} />
<SampleButton caption="Inbox" badgeCount={3} />
```

## Build

```bash
npm run build   # from the code/ root
```
