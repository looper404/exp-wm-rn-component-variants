import { StyleSheet } from 'react-native';
import type { TabbarIconPalette } from '../shared/tabbar-icon-palette';

/**
 * Dock Tabbar — a single fully-rounded, floating white pill with margin on
 * both sides and a flat drop shadow separating it from the background. Five
 * icon-only tabs are spaced evenly across it; the active tab's icon sits on
 * a filled pill-shaped background, with no vertical lift and no labels.
 */

export const DOCK_TABBAR_CLASS = 'app-tabbar-dock';

/** Every colour this design uses lives here. A hex anywhere else defeats theming. */
export const DOCK_TABBAR_BAR_FILL = '#FFFFFF';
export const DOCK_TABBAR_ICON_COLOR = '#8E8E93';
export const DOCK_TABBAR_ACTIVE_ICON_COLOR = '#000000';
export const DOCK_TABBAR_ACTIVE_PILL_FILL = '#F2F2F7';
export const DOCK_TABBAR_SHADOW_COLOR = '#000000';

export const DOCK_TABBAR_ICON_PALETTE: TabbarIconPalette = {
  inactive: DOCK_TABBAR_ICON_COLOR,
  active: DOCK_TABBAR_ACTIVE_ICON_COLOR,
};

// Geometry, measured from the design spec.
export const DOCK_TABBAR_BAR_HEIGHT = 72;
export const DOCK_TABBAR_BAR_RADIUS = 36;
export const DOCK_TABBAR_HORIZONTAL_PADDING = 16;
export const DOCK_TABBAR_VERTICAL_PADDING = 8;
export const DOCK_TABBAR_ICON_SIZE = 24;
export const DOCK_TABBAR_ITEM_GAP = 12;
export const DOCK_TABBAR_PILL_SIZE = 48;
export const DOCK_TABBAR_PILL_RADIUS = 24;

/** Outer gap that reads as "floating". Not part of the design's measured geometry. */
export const DOCK_TABBAR_OUTER_MARGIN = 16;
/** Opacity applied to every tab when `disabled` is set. Not part of the design's measured geometry. */
export const DOCK_TABBAR_DISABLED_OPACITY = 0.45;

export const dockTabbarStyles = StyleSheet.create({
  shell: {
    paddingHorizontal: DOCK_TABBAR_OUTER_MARGIN,
  },
  barContainer: {
    // Flat drop shadow: the bar floats above the screen edge with a soft
    // separation, no notch or cutout of its own.
    shadowColor: DOCK_TABBAR_SHADOW_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    borderRadius: DOCK_TABBAR_BAR_RADIUS,
  },
  barSurface: {
    flexDirection: 'row',
    alignItems: 'center',
    height: DOCK_TABBAR_BAR_HEIGHT,
    borderRadius: DOCK_TABBAR_BAR_RADIUS,
    paddingHorizontal: DOCK_TABBAR_HORIZONTAL_PADDING,
    paddingVertical: DOCK_TABBAR_VERTICAL_PADDING,
    backgroundColor: DOCK_TABBAR_BAR_FILL,
    overflow: 'hidden',
  },
  tabsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: DOCK_TABBAR_ITEM_GAP,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSlot: {
    width: DOCK_TABBAR_PILL_SIZE,
    height: DOCK_TABBAR_PILL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    borderRadius: DOCK_TABBAR_PILL_RADIUS,
    backgroundColor: DOCK_TABBAR_ACTIVE_PILL_FILL,
  },
});
