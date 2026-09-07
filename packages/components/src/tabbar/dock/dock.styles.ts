import { StyleSheet } from 'react-native';
import type { TabbarIconPalette } from '../shared/tabbar-icon-palette';

/**
 * Dock Tab Bar — generated skeleton, filled in by hand.
 * Source design: dock-tabbar. Regenerating overwrites nothing that exists.
 */

export const DOCK_TABBAR_CLASS = 'app-tabbar-dock';

/** Every colour this design uses lives here. A hex anywhere else defeats theming. */
export const DOCK_TABBAR_BAR_FILL = '#FFFFFF';
export const DOCK_TABBAR_TAB_ITEM_DEFAULT = '#999999';
export const DOCK_TABBAR_TAB_ITEM_ACTIVE = '#007AFF';
export const DOCK_TABBAR_LABEL_DEFAULT = '#666666';
export const DOCK_TABBAR_LABEL_ACTIVE = '#007AFF';

export const DOCK_TABBAR_ICON_PALETTE: TabbarIconPalette = {
  inactive: DOCK_TABBAR_BAR_FILL,
  active: DOCK_TABBAR_TAB_ITEM_ACTIVE,
};

export const DOCK_TABBAR_BAR_HEIGHT = 64;
export const DOCK_TABBAR_BAR_RADIUS = 20;

export const dockTabbarStyles = StyleSheet.create({
  barSurface: {},
  tabsRow: {},
  tabItem: {},
  iconSlot: {},
  tabLabel: {},
  activeTabLabel: {},
  activePill: {},
});
