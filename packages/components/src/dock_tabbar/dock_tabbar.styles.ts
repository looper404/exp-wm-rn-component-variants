import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

/** Region-level style overrides accepted by `DockTabbar`, merged as `[default, override]`. */
export interface DockTabbarStylesProp {
  root?: StyleProp<ViewStyle>;
  barSurface?: StyleProp<ViewStyle>;
  tabItem?: StyleProp<ViewStyle>;
  iconGlyph?: StyleProp<ViewStyle>;
  label?: StyleProp<ViewStyle>;
  notchIndicator?: StyleProp<ViewStyle>;
}

export const DOCK_TABBAR_BAR_WIDTH = 358;
export const DOCK_TABBAR_BAR_HEIGHT = 64;
export const DOCK_TABBAR_BAR_RADIUS = DOCK_TABBAR_BAR_HEIGHT / 2;
export const DOCK_TABBAR_ICON_SIZE = 24;
export const DOCK_TABBAR_DISABLED_OPACITY = 0.4;
/** Gap between the icon glyph and the label rendered below it. */
export const DOCK_TABBAR_LABEL_MARGIN_TOP = 2;
/**
 * The decorative notch above slot 0 is two separate cutouts, not one plain
 * semicircle: a shallow wide dip inset clear of the corner radius, plus a
 * small dot nested inside it. Widths/depths are eyeballed against the source
 * screenshot rather than measured exactly — see the PR description.
 */
export const DOCK_TABBAR_NOTCH_DIP_WIDTH = 26;
export const DOCK_TABBAR_NOTCH_DIP_DEPTH = 9;
export const DOCK_TABBAR_NOTCH_DOT_RADIUS = 4;
/** Duration of the notch's horizontal slide when `activeIndex` changes. */
export const DOCK_TABBAR_NOTCH_SLIDE_DURATION_MS = 220;

export interface DockTabbarPalette {
  barFill: string;
  activeIconColor: string;
  inactiveIconColor: string;
  /**
   * Paint applied to the notch dip cutout region. `'transparent'` (the
   * default) renders it as a true see-through hole via SVG evenodd
   * compositing, so whatever sits behind the bar shows through, instead of
   * assuming the surrounding backdrop is any particular flat color.
   */
  notchColor: string;
  /**
   * Paint applied to the small decorative dot nested inside the notch dip.
   * Unlike the dip itself, the source design renders this as a solid opaque
   * shape, not a cutout — it is never affected by `notchColor`/transparency.
   * Defaults to `activeIconColor` (overridable via the `dotColor` prop).
   */
  notchDotColor: string;
}

export const DOCK_TABBAR_DEFAULT_PALETTE: DockTabbarPalette = {
  barFill: '#F4F4F4',
  activeIconColor: '#6C22C4',
  // Darkened from the raw measured #B1ADB0 to meet WCAG 1.4.11 non-text
  // contrast (>=3:1) against the bar fill.
  inactiveIconColor: '#6E6E73',
  notchColor: 'transparent',
  // Mirrors activeIconColor by default — see `notchDotColor`'s own doc.
  notchDotColor: '#6C22C4',
};

export interface DockTabbarNotchGeometry {
  dipLeft: number;
  dipRight: number;
  dipMidX: number;
  dipControlY: number;
  dipPath: string;
  dotCenterX: number;
  dotCenterY: number;
}

export interface ComputeDockTabbarNotchGeometryArgs {
  activeIndex: number;
  itemCount: number;
  barWidth: number;
  barRadius: number;
  notchDipWidth: number;
  notchDipDepth: number;
}

/**
 * Positions the notch dip + dot above the active slot's center, clamped so
 * they never overlap/distort the bar's rounded corners — this only matters
 * for the first/last slots, whose unclamped center sits inside the corner
 * radius sweep.
 */
export const computeDockTabbarNotchGeometry = ({
  activeIndex,
  itemCount,
  barWidth,
  barRadius,
  notchDipWidth,
  notchDipDepth,
}: ComputeDockTabbarNotchGeometryArgs): DockTabbarNotchGeometry => {
  const slotWidth = barWidth / itemCount;
  const idealDipMidX = slotWidth * (activeIndex + 0.5);
  const minDipMidX = barRadius + notchDipWidth / 2;
  const maxDipMidX = barWidth - barRadius - notchDipWidth / 2;
  const dipMidX = Math.min(Math.max(idealDipMidX, minDipMidX), maxDipMidX);
  const dipLeft = dipMidX - notchDipWidth / 2;
  const dipRight = dipMidX + notchDipWidth / 2;
  const dipControlY = notchDipDepth * 2;

  return {
    dipLeft,
    dipRight,
    dipMidX,
    dipControlY,
    dipPath: `M ${dipLeft} 0 Q ${dipMidX} ${dipControlY} ${dipRight} 0 Z`,
    dotCenterX: dipMidX,
    dotCenterY: notchDipDepth / 2,
  };
};

export const dockTabbarStyles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  barSurface: {
    width: DOCK_TABBAR_BAR_WIDTH,
    height: DOCK_TABBAR_BAR_HEIGHT,
    borderRadius: DOCK_TABBAR_BAR_RADIUS,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  svgFill: {
    ...StyleSheet.absoluteFillObject,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlyph: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: DOCK_TABBAR_LABEL_MARGIN_TOP,
    // Constrains the label to its own slot — `tabItem` is `flex: 1` with no
    // explicit width, so without this a long/localized label (e.g. a
    // Studio-authored string, or "Settings" translated to a longer word)
    // overflows past its slot and visually collides with the neighboring
    // tab instead of clipping within its own bounds.
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  notchIndicator: {
    ...StyleSheet.absoluteFillObject,
  },
});
