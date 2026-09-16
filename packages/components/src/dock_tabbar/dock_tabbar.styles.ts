import { StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

/** Region-level style overrides accepted by `DockTabbar`, merged as `[default, override]`. */
export interface DockTabbarStylesProp {
  root?: StyleProp<ViewStyle>;
  barSurface?: StyleProp<ViewStyle>;
  tabItem?: StyleProp<ViewStyle>;
  iconGlyph?: StyleProp<ViewStyle>;
  notchIndicator?: StyleProp<ViewStyle>;
}

export const DOCK_TABBAR_BAR_WIDTH = 358;
export const DOCK_TABBAR_BAR_HEIGHT = 64;
export const DOCK_TABBAR_BAR_RADIUS = DOCK_TABBAR_BAR_HEIGHT / 2;
export const DOCK_TABBAR_ICON_SIZE = 24;
export const DOCK_TABBAR_DISABLED_OPACITY = 0.4;
/** Radius of the decorative notch cut into the top edge above slot 0. */
export const DOCK_TABBAR_NOTCH_RADIUS = 20;

export interface DockTabbarPalette {
  barFill: string;
  activeIconColor: string;
  inactiveIconColor: string;
  /**
   * Paint applied to the notch cutout region. `'transparent'` (the default)
   * renders it as a true see-through hole via SVG evenodd compositing, so
   * whatever sits behind the bar shows through, instead of assuming the
   * surrounding backdrop is any particular flat color.
   */
  notchColor: string;
}

export const DOCK_TABBAR_DEFAULT_PALETTE: DockTabbarPalette = {
  barFill: '#FFFFFF',
  activeIconColor: '#6C22C4',
  // Darkened from the raw measured #B1ADB0 to meet WCAG 1.4.11 non-text
  // contrast (>=3:1) against the white bar fill.
  inactiveIconColor: '#6E6E73',
  notchColor: 'transparent',
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
  notchIndicator: {
    ...StyleSheet.absoluteFillObject,
  },
});
