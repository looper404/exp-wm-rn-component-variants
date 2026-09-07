import { useMemo } from 'react';
import { mergeTextStyle, mergeViewStyle, resolveIconPalette } from '../shared/tabbar-style-utils';
import type { TabbarIconPaletteProp } from '../shared/tabbar-style-utils';
import { DOCK_TABBAR_ICON_PALETTE, dockTabbarStyles } from './dock.styles';
import type { DockTabbarStylesProp, DockTabbarLayoutProp } from './dock.style-props';

export function useDockTabbarResolvedStyles(
  stylesProp?: DockTabbarStylesProp,
  iconPaletteProp?: TabbarIconPaletteProp,
  layoutProp?: DockTabbarLayoutProp
) {
  const iconPalette = useMemo(
    () => resolveIconPalette(DOCK_TABBAR_ICON_PALETTE, iconPaletteProp),
    [iconPaletteProp]
  );

  const styles = useMemo(
    () => ({
      barSurface: mergeViewStyle(dockTabbarStyles.barSurface, stylesProp?.barSurface),
      tabsRow: mergeViewStyle(dockTabbarStyles.tabsRow, stylesProp?.tabsRow),
      tabItem: mergeViewStyle(dockTabbarStyles.tabItem, stylesProp?.tabItem),
      iconSlot: mergeViewStyle(dockTabbarStyles.iconSlot, stylesProp?.iconSlot),
      tabLabel: mergeTextStyle(dockTabbarStyles.tabLabel, stylesProp?.tabLabel),
      activeTabLabel: mergeTextStyle(dockTabbarStyles.activeTabLabel, stylesProp?.activeTabLabel),
      activePill: mergeViewStyle(dockTabbarStyles.activePill, stylesProp?.activePill),
    }),
    [stylesProp]
  );

  return { styles, iconPalette, layout: layoutProp ?? {} };
}
