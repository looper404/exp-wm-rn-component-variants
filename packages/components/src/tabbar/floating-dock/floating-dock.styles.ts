import { StyleSheet } from 'react-native';
import type { TabbarIconPalette } from '../shared/tabbar-icon-palette';

/**
 * Floating Dock Tabbar — a dark, fully rounded pill that floats above the
 * screen content with margin on every side (no notch, no edge-to-edge
 * bleed). Five evenly spaced tabs each show an icon and a label; the active
 * tab's icon sits inside a rounded-rectangle highlight bubble, and its label
 * turns the design's accent green while every inactive icon/label shares one
 * muted gray. No badges are drawn.
 */

export const FLOATING_DOCK_TABBAR_CLASS = 'app-tabbar-floating-dock';

/** Every colour this design uses lives here. A hex anywhere else defeats theming. */
export const FLOATING_DOCK_TABBAR_BAR_FILL = '#12181F';
export const FLOATING_DOCK_TABBAR_ACTIVE_BUBBLE_FILL = '#1E2A33';
export const FLOATING_DOCK_TABBAR_ACCENT = '#2DD4BF';
export const FLOATING_DOCK_TABBAR_INACTIVE_COLOR = '#8B94A3';
export const FLOATING_DOCK_TABBAR_ACTIVE_LABEL_COLOR = '#34D399';

/**
 * Inactive icons share the bar's one muted gray; the active icon takes the
 * design's accent (it sits on the bubble, not on the accent itself — see
 * `activeBubble` below).
 */
export const FLOATING_DOCK_TABBAR_ICON_PALETTE: TabbarIconPalette = {
  inactive: FLOATING_DOCK_TABBAR_INACTIVE_COLOR,
  active: FLOATING_DOCK_TABBAR_ACCENT,
};

// Geometry, measured from the design spec.
export const FLOATING_DOCK_TABBAR_BAR_HEIGHT = 64;
export const FLOATING_DOCK_TABBAR_BAR_RADIUS = 32;
export const FLOATING_DOCK_TABBAR_HORIZONTAL_PADDING = 11;
export const FLOATING_DOCK_TABBAR_ICON_SIZE = 22;
export const FLOATING_DOCK_TABBAR_BUBBLE_WIDTH = 44;
export const FLOATING_DOCK_TABBAR_BUBBLE_HEIGHT = 34;
export const FLOATING_DOCK_TABBAR_BUBBLE_RADIUS = 14;
export const FLOATING_DOCK_TABBAR_ICON_LABEL_GAP = 4;
export const FLOATING_DOCK_TABBAR_LABEL_FONT_SIZE = 11;

/** Outer gap that reads as "floating". Not part of the design's measured geometry. */
export const FLOATING_DOCK_TABBAR_OUTER_MARGIN = 16;
/** Opacity applied to every tab when `disabled` is set. Not part of the design's measured geometry. */
export const FLOATING_DOCK_TABBAR_DISABLED_OPACITY = 0.45;

export const floatingDockTabbarStyles = StyleSheet.create({
  shell: {
    paddingHorizontal: FLOATING_DOCK_TABBAR_OUTER_MARGIN,
  },
  barSurface: {
    flexDirection: 'row',
    alignItems: 'center',
    height: FLOATING_DOCK_TABBAR_BAR_HEIGHT,
    borderRadius: FLOATING_DOCK_TABBAR_BAR_RADIUS,
    paddingHorizontal: FLOATING_DOCK_TABBAR_HORIZONTAL_PADDING,
    backgroundColor: FLOATING_DOCK_TABBAR_BAR_FILL,
    overflow: 'hidden',
  },
  tabsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: FLOATING_DOCK_TABBAR_ICON_LABEL_GAP,
  },
  iconSlot: {
    width: FLOATING_DOCK_TABBAR_BUBBLE_WIDTH,
    height: FLOATING_DOCK_TABBAR_BUBBLE_HEIGHT,
    borderRadius: FLOATING_DOCK_TABBAR_BUBBLE_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBubble: {
    backgroundColor: FLOATING_DOCK_TABBAR_ACTIVE_BUBBLE_FILL,
  },
  tabLabel: {
    fontSize: FLOATING_DOCK_TABBAR_LABEL_FONT_SIZE,
    color: FLOATING_DOCK_TABBAR_INACTIVE_COLOR,
  },
  activeTabLabel: {
    fontSize: FLOATING_DOCK_TABBAR_LABEL_FONT_SIZE,
    color: FLOATING_DOCK_TABBAR_ACTIVE_LABEL_COLOR,
  },
});
