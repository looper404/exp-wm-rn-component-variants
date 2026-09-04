import type { TabbarVariant } from '../../components/src/tabbar/tabbar.props';
import type { FloatingDockTabbarStylesProp } from '../../components/src/tabbar/floating-dock/floating-dock.style-props';
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

/**
 * A variant's own `styles`/`layout` props, resolved from the canonical
 * regions. `TLayout` defaults to `never` — most variants paint everything
 * through `styles` alone and never populate `layout` at all.
 */
export interface MappedTabbarStyles<TStyles, TLayout = never> {
  styles: TStyles;
  layout?: TLayout;
}

/**
 * Union of every variant's own mapping result. Extend with `|` as each
 * variant is added — mirrors how `TabbarVariantProps` unions each variant's
 * own props type in `@wavemaker/rn-components/tabbar`.
 */
export type TabbarVariantStyleMapping = MappedTabbarStyles<FloatingDockTabbarStylesProp>;

/** A variant's canonical-region -> own-region mapper. */
export type TabbarStyleMapper = (canonical: CanonicalTabbarStyles) => TabbarVariantStyleMapping;

/**
 * Floating Dock Tabbar renders a plain rounded-rectangle bar (`view-only` —
 * no SVG) that floats above the page content with margin on every side; five
 * evenly spaced tabs each carry a label, and the active tab gets an
 * icon-bubble highlight behind its icon (`active.kind: "icon-bubble"`,
 * `lift: 0`). So:
 *  - `root` -> `shell`, `menu` -> `barSurface`, `tabItem` -> `tabItem`,
 *    `tabLabel`/`activeTabLabel` forward directly — same role, same shape,
 *    nothing else to do. `barSurface` paints its background with a plain
 *    `backgroundColor` (no SVG involved), so rule 2's "route the fill to a
 *    layout prop" doesn't apply here — this design's `layoutProps` list is
 *    empty for the same reason, and `MappedTabbarStyles` is used with no
 *    `layout` at all.
 *  - `activeTabItem` -> `activeBubble`: the active-tab highlight this design
 *    draws is the rounded bubble behind the icon, which is exactly the
 *    canonical "active tab item background" concept.
 *  - `moreMenu`, `moreMenuRow`: this design never overflows into a "more"
 *    tab (5 items, laid out evenly; `maxvisibleitems` stays declared but
 *    unwired) — no mapping.
 *  - `centerHubItem`, `centerHubIcon`: no raised center action item — no
 *    mapping.
 *  - `tabIcon`/`activeTabIcon`: not a style region for this design; see
 *    {@link TABBAR_ICON_PALETTE_MAPPERS} instead.
 *  - `tabsRow`, `iconSlot`: this design's own structural regions with no
 *    canonical counterpart — left at their component defaults, not driven by
 *    the Studio style panel.
 */
function mapFloatingDockTabbarStyles(canonical: CanonicalTabbarStyles): TabbarVariantStyleMapping {
  return {
    styles: {
      shell: canonical.root,
      barSurface: canonical.menu,
      tabItem: canonical.tabItem,
      activeBubble: canonical.activeTabItem,
      tabLabel: canonical.tabLabel,
      activeTabLabel: canonical.activeTabLabel,
    },
  };
}

/**
 * Every registered variant's canonical-region mapper, keyed by design id.
 * `Record<TabbarVariant, TabbarStyleMapper>` means TS rejects a variant
 * added to the id union without a matching mapper here (or vice versa) —
 * same exhaustiveness trick as `TABBAR_VARIANT_COMPONENTS`.
 */
export const TABBAR_STYLE_MAPPERS: Record<TabbarVariant, TabbarStyleMapper> = {
  'floating-dock-tabbar': mapFloatingDockTabbarStyles,
};

/** A variant's canonical-icon-region -> icon-palette mapper. */
export type TabbarIconPaletteMapper = (canonical: CanonicalTabbarStyles) => TabbarIconPaletteProp;

/**
 * Floating Dock Tabbar tints its icons via `iconPalette.inactive`/`.active`
 * rather than a style object, so `tabIcon`/`activeTabIcon` route their
 * `color` there instead of into `styles`.
 */
function mapFloatingDockTabbarIconPalette(canonical: CanonicalTabbarStyles): TabbarIconPaletteProp {
  return {
    inactive: canonical.tabIcon?.color,
    active: canonical.activeTabIcon?.color,
  };
}

/**
 * Every registered variant's icon-palette mapper, keyed by design id.
 * Exhaustive over `TabbarVariant` for the same reason as
 * {@link TABBAR_STYLE_MAPPERS}.
 */
export const TABBAR_ICON_PALETTE_MAPPERS: Record<TabbarVariant, TabbarIconPaletteMapper> = {
  'floating-dock-tabbar': mapFloatingDockTabbarIconPalette,
};
