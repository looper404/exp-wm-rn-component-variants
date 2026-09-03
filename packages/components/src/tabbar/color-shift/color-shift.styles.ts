import { StyleSheet } from 'react-native';
import type { TabbarIconPalette } from '../shared/tabbar-icon-palette';

/**
 * Color Shift Tabbar — a plain rounded-rectangle bar with five evenly spaced
 * tabs. The active tab is shown purely by tinting its icon and label; there
 * is no pill, bubble, or lift behind it.
 */

export const COLOR_SHIFT_TABBAR_CLASS = 'app-tabbar-color-shift';

/** Every colour this design uses lives here. A hex anywhere else defeats theming. */
export const COLOR_SHIFT_TABBAR_BAR_FILL = '#1C1C1E';
export const COLOR_SHIFT_TABBAR_ACCENT = '#34D399';
export const COLOR_SHIFT_TABBAR_INACTIVE_ICON = '#8E8E93';
export const COLOR_SHIFT_TABBAR_INACTIVE_LABEL = '#8E8E93';
export const COLOR_SHIFT_TABBAR_ACTIVE_LABEL = '#34D399';

export const COLOR_SHIFT_TABBAR_ICON_PALETTE: TabbarIconPalette = {
  inactive: COLOR_SHIFT_TABBAR_INACTIVE_ICON,
  active: COLOR_SHIFT_TABBAR_ACCENT,
};

export const COLOR_SHIFT_TABBAR_BAR_HEIGHT = 64;
export const COLOR_SHIFT_TABBAR_BAR_RADIUS = 32;
export const COLOR_SHIFT_TABBAR_ICON_SIZE = 22;
export const COLOR_SHIFT_TABBAR_LABEL_FONT_SIZE = 11;
export const COLOR_SHIFT_TABBAR_TAB_PADDING_VERTICAL = 10;
export const COLOR_SHIFT_TABBAR_ICON_LABEL_GAP = 4;

export const colorShiftTabbarStyles = StyleSheet.create({
  shell: {
    paddingHorizontal: 16,
  },
  barSurface: {
    height: COLOR_SHIFT_TABBAR_BAR_HEIGHT,
    borderRadius: COLOR_SHIFT_TABBAR_BAR_RADIUS,
    backgroundColor: COLOR_SHIFT_TABBAR_BAR_FILL,
    overflow: 'hidden',
  },
  tabsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: COLOR_SHIFT_TABBAR_TAB_PADDING_VERTICAL,
    gap: COLOR_SHIFT_TABBAR_ICON_LABEL_GAP,
  },
  iconSlot: {
    width: COLOR_SHIFT_TABBAR_ICON_SIZE,
    height: COLOR_SHIFT_TABBAR_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: COLOR_SHIFT_TABBAR_LABEL_FONT_SIZE,
    color: COLOR_SHIFT_TABBAR_INACTIVE_LABEL,
  },
  activeTabLabel: {
    fontSize: COLOR_SHIFT_TABBAR_LABEL_FONT_SIZE,
    color: COLOR_SHIFT_TABBAR_ACTIVE_LABEL,
  },
});
