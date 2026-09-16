import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { DockTabbarStylesProp } from './dock_tabbar.styles';
import {
  DOCK_TABBAR_BAR_HEIGHT,
  DOCK_TABBAR_BAR_RADIUS,
  DOCK_TABBAR_BAR_WIDTH,
  DOCK_TABBAR_DEFAULT_PALETTE,
  DOCK_TABBAR_DISABLED_OPACITY,
  DOCK_TABBAR_ICON_SIZE,
  DOCK_TABBAR_NOTCH_RADIUS,
  dockTabbarStyles,
} from './dock_tabbar.styles';

interface UseDockTabbarStylesArgs {
  disabled: boolean;
  styles?: DockTabbarStylesProp;
}

/** Resolves the default styles/palette/metrics, merged with caller overrides. */
export const useDockTabbarStyles = ({ disabled, styles }: UseDockTabbarStylesArgs) => {
  return useMemo(() => {
    const root: StyleProp<ViewStyle> = [dockTabbarStyles.root, styles?.root];

    const barSurface: StyleProp<ViewStyle> = [
      dockTabbarStyles.barSurface,
      disabled ? { opacity: DOCK_TABBAR_DISABLED_OPACITY } : null,
      styles?.barSurface,
    ];

    return {
      root,
      barSurface,
      tabItem: [dockTabbarStyles.tabItem, styles?.tabItem] as StyleProp<ViewStyle>,
      iconGlyph: [dockTabbarStyles.iconGlyph, styles?.iconGlyph] as StyleProp<ViewStyle>,
      notchIndicator: [dockTabbarStyles.notchIndicator, styles?.notchIndicator] as StyleProp<ViewStyle>,
      palette: DOCK_TABBAR_DEFAULT_PALETTE,
      iconSize: DOCK_TABBAR_ICON_SIZE,
      barWidth: DOCK_TABBAR_BAR_WIDTH,
      barHeight: DOCK_TABBAR_BAR_HEIGHT,
      barRadius: DOCK_TABBAR_BAR_RADIUS,
      notchRadius: DOCK_TABBAR_NOTCH_RADIUS,
    };
  }, [disabled, styles]);
};
