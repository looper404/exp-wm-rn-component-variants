import type { TabbarVariantId } from '../../components/src/tabbar/tabbar.props';
import type {
  ColorShiftTabbarStylesProp,
  ColorShiftTabbarLayoutProp,
} from '../../components/src/tabbar/color-shift/color-shift.style-props';
import type { TabbarIconPaletteProp } from '../../components/src/tabbar/shared/tabbar-style-utils';

/**
 * One resolved canonical region's style, exactly as the runtime hands it to
 * a variant: `this.styles` arrives ALREADY merged (app-tabbar defaults, theme
 * variables, the instance classname, and the Studio style panel are all
 * folded in before a variant ever sees it). This file never imports
 * `react-native` directly — its own module resolution has no path to that
 * package, only the sibling `components` package's files do — so a region is
 * typed structurally: enough to read `backgroundColor`/`color` off it for
 * layout-prop routing, and to forward the rest opaquely otherwise.
 */
export type CanonicalRegionStyle = Readonly<Record<string, unknown>> & {
  backgroundColor?: string;
  color?: string;
};

/**
 * WaveMaker Studio's canonical tab-bar style regions. Every region is
 * optional: a region is `undefined` when nothing in the resolution chain
 * touched it, and a variant must treat that as "use my own default" rather
 * than re-applying one — the runtime already applied every default that
 * applies.
 */
export interface CanonicalTabbarStyles {
  root?: CanonicalRegionStyle;
  menu?: CanonicalRegionStyle;
  moreMenu?: CanonicalRegionStyle;
  moreMenuRow?: CanonicalRegionStyle;
  tabItem?: CanonicalRegionStyle;
  activeTabItem?: CanonicalRegionStyle;
  tabLabel?: CanonicalRegionStyle;
  activeTabLabel?: CanonicalRegionStyle;
  tabIcon?: CanonicalRegionStyle;
  activeTabIcon?: CanonicalRegionStyle;
  centerHubItem?: CanonicalRegionStyle;
  centerHubIcon?: CanonicalRegionStyle;
}

/** A variant's own `styles`/`layout` props, resolved from the canonical regions. */
export interface MappedTabbarStyles<TStyles, TLayout> {
  styles: TStyles;
  layout?: TLayout;
}

/**
 * Union of every variant's own mapping result. Extend with `|` as each
 * variant is added — mirrors how `TabbarVariantProps` unions each variant's
 * own props type in `@wavemaker/rn-components/tabbar`.
 */
export type TabbarVariantStyleMapping = MappedTabbarStyles<ColorShiftTabbarStylesProp, ColorShiftTabbarLayoutProp>;

/** A variant's canonical-region -> own-region mapper. */
export type TabbarStyleMapper = (canonical: CanonicalTabbarStyles) => TabbarVariantStyleMapping;

/**
 * Color Shift Tabbar renders a plain rounded-rectangle bar (`view-only` —
 * no SVG) with five evenly spaced tabs; the active tab carries no pill or
 * lift, just a colour change on its icon and label. So:
 *  - `root` -> `shell`, `tabItem` -> `tabItem`, `tabLabel`/`activeTabLabel`
 *    forward directly — same name, same shape, nothing else to do.
 *  - `menu` -> `barSurface`, EXCEPT `backgroundColor`: the component applies
 *    `layout.barFill` inline, after the merged `barSurface` style, so a
 *    colour left on `barSurface` would be silently clobbered. It's pulled
 *    out and routed to `layout.barFill` instead — the same "route the fill
 *    to a layout prop, not the container" move rule 2 calls for on SVG bars,
 *    just for a mechanical reason (inline override order) rather than a
 *    shape one (no SVG here to distort).
 *  - `activeTabLabel.color` gets the same treatment: the component applies
 *    `layout.accent` inline over it, so the colour is pulled out to
 *    `layout.accent` and only the rest of `activeTabLabel` is forwarded as a
 *    style.
 *  - `moreMenu`, `moreMenuRow`: this design never overflows into a "more"
 *    tab (5 items, laid out evenly) — no mapping.
 *  - `activeTabItem`: there is no active-tab background/pill/bubble to paint
 *    (`active.kind: "color-change"`, `lift: 0`) — no mapping.
 *  - `centerHubItem`, `centerHubIcon`: no raised center action — no mapping.
 *  - `tabIcon`/`activeTabIcon`: not a style region for this design; see
 *    {@link TABBAR_ICON_PALETTE_MAPPERS} instead.
 */
function mapColorShiftTabbarStyles(canonical: CanonicalTabbarStyles): TabbarVariantStyleMapping {
  const { backgroundColor: barFill, ...barSurfaceRest } = canonical.menu ?? {};
  const { color: accent, ...activeTabLabelRest } = canonical.activeTabLabel ?? {};

  return {
    styles: {
      shell: canonical.root as ColorShiftTabbarStylesProp['shell'],
      barSurface: (canonical.menu ? barSurfaceRest : undefined) as ColorShiftTabbarStylesProp['barSurface'],
      tabItem: canonical.tabItem as ColorShiftTabbarStylesProp['tabItem'],
      tabLabel: canonical.tabLabel as ColorShiftTabbarStylesProp['tabLabel'],
      activeTabLabel: (canonical.activeTabLabel ? activeTabLabelRest : undefined) as ColorShiftTabbarStylesProp['activeTabLabel'],
    },
    layout: {
      barFill,
      accent,
    },
  };
}

/**
 * Every registered variant's canonical-region mapper, keyed by design id.
 * `Record<TabbarVariantId, TabbarStyleMapper>` means TS rejects a variant
 * added to the id union without a matching mapper here (or vice versa) —
 * same exhaustiveness trick as `TABBAR_VARIANT_COMPONENTS`.
 */
export const TABBAR_STYLE_MAPPERS: Record<TabbarVariantId, TabbarStyleMapper> = {
  'color-shift-tabbar': mapColorShiftTabbarStyles,
};

/** A variant's canonical-icon-region -> icon-palette mapper. */
export type TabbarIconPaletteMapper = (canonical: CanonicalTabbarStyles) => TabbarIconPaletteProp;

/**
 * Color Shift Tabbar tints its icons via `iconPalette.inactive`/`.active`
 * rather than a style object, so `tabIcon`/`activeTabIcon` route their
 * `color` there instead of into `styles`.
 */
function mapColorShiftTabbarIconPalette(canonical: CanonicalTabbarStyles): TabbarIconPaletteProp {
  return {
    inactive: canonical.tabIcon?.color,
    active: canonical.activeTabIcon?.color,
  };
}

/**
 * Every registered variant's icon-palette mapper, keyed by design id.
 * Exhaustive over `TabbarVariantId` for the same reason as
 * {@link TABBAR_STYLE_MAPPERS}.
 */
export const TABBAR_ICON_PALETTE_MAPPERS: Record<TabbarVariantId, TabbarIconPaletteMapper> = {
  'color-shift-tabbar': mapColorShiftTabbarIconPalette,
};
