import { useMemo } from 'react';
import { mergeViewStyle, resolveIconPalette } from '../shared/tabbar-style-utils';
import type { TabbarIconPaletteProp } from '../shared/tabbar-style-utils';
import {
  DOCK_TABBAR_ACTIVE_PILL_FILL,
  DOCK_TABBAR_BAR_FILL,
  DOCK_TABBAR_ICON_PALETTE,
  dockTabbarStyles,
} from './dock.styles';
import type { DockTabbarStylesProp, DockTabbarLayoutProp } from './dock.style-props';

/** `layout`, resolved so `barFill`/`accent` are always concrete colours. */
type ResolvedDockTabbarLayout = Required<DockTabbarLayoutProp>;

export function useDockTabbarResolvedStyles(
  stylesProp?: DockTabbarStylesProp,
  iconPaletteProp?: TabbarIconPaletteProp,
  layoutProp?: DockTabbarLayoutProp
) {
  const iconPalette = useMemo(
    () => resolveIconPalette(DOCK_TABBAR_ICON_PALETTE, iconPaletteProp),
    [iconPaletteProp]
  );

  const layout = useMemo<ResolvedDockTabbarLayout>(
    () => ({
      barFill: layoutProp?.barFill ?? DOCK_TABBAR_BAR_FILL,
      accent: layoutProp?.accent ?? DOCK_TABBAR_ACTIVE_PILL_FILL,
    }),
    [layoutProp]
  );

  const styles = useMemo(
    () => ({
      shell: mergeViewStyle(dockTabbarStyles.shell, stylesProp?.shell),
      barContainer: mergeViewStyle(dockTabbarStyles.barContainer, stylesProp?.barContainer),
      barSurface: mergeViewStyle(dockTabbarStyles.barSurface, stylesProp?.barSurface),
      tabsRow: mergeViewStyle(dockTabbarStyles.tabsRow, stylesProp?.tabsRow),
      tabItem: mergeViewStyle(dockTabbarStyles.tabItem, stylesProp?.tabItem),
      iconSlot: mergeViewStyle(dockTabbarStyles.iconSlot, stylesProp?.iconSlot),
      activePill: mergeViewStyle(dockTabbarStyles.activePill, stylesProp?.activePill),
    }),
    [stylesProp]
  );

  return { styles, iconPalette, layout };
}
