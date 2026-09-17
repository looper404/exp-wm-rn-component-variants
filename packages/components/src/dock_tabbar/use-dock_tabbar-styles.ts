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
  DOCK_TABBAR_NOTCH_DIP_DEPTH,
  DOCK_TABBAR_NOTCH_DIP_WIDTH,
  DOCK_TABBAR_NOTCH_DOT_RADIUS,
  dockTabbarStyles,
} from './dock_tabbar.styles';

interface UseDockTabbarStylesArgs {
  disabled: boolean;
  /** Overrides `palette.notchDotColor`; defaults to `activeIconColor` when omitted. */
  dotColor?: string;
  styles?: DockTabbarStylesProp;
}

/** Resolves the default styles/palette/metrics, merged with caller overrides. */
export const useDockTabbarStyles = ({ disabled, dotColor, styles }: UseDockTabbarStylesArgs) => {
  return useMemo(() => {
    const root: StyleProp<ViewStyle> = [dockTabbarStyles.root, styles?.root];

    const barSurface: StyleProp<ViewStyle> = [
      dockTabbarStyles.barSurface,
      disabled ? { opacity: DOCK_TABBAR_DISABLED_OPACITY } : null,
      styles?.barSurface,
    ];

    const palette = dotColor
      ? { ...DOCK_TABBAR_DEFAULT_PALETTE, notchDotColor: dotColor }
      : DOCK_TABBAR_DEFAULT_PALETTE;

    return {
      root,
      barSurface,
      tabItem: [dockTabbarStyles.tabItem, styles?.tabItem] as StyleProp<ViewStyle>,
      iconGlyph: [dockTabbarStyles.iconGlyph, styles?.iconGlyph] as StyleProp<ViewStyle>,
      notchIndicator: [dockTabbarStyles.notchIndicator, styles?.notchIndicator] as StyleProp<ViewStyle>,
      palette,
      iconSize: DOCK_TABBAR_ICON_SIZE,
      barWidth: DOCK_TABBAR_BAR_WIDTH,
      barHeight: DOCK_TABBAR_BAR_HEIGHT,
      barRadius: DOCK_TABBAR_BAR_RADIUS,
      notchDipWidth: DOCK_TABBAR_NOTCH_DIP_WIDTH,
      notchDipDepth: DOCK_TABBAR_NOTCH_DIP_DEPTH,
      notchDotRadius: DOCK_TABBAR_NOTCH_DOT_RADIUS,
    };
  }, [disabled, dotColor, styles]);
};
