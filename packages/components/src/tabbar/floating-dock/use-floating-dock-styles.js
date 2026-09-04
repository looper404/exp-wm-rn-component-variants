import { useMemo } from 'react';
import { mergeTextStyle, mergeViewStyle, resolveIconPalette } from '../shared/tabbar-style-utils';
import { FLOATING_DOCK_TABBAR_ICON_PALETTE, floatingDockTabbarStyles } from './floating-dock.styles';
export function useFloatingDockTabbarResolvedStyles(stylesProp, iconPaletteProp) {
    const iconPalette = useMemo(() => resolveIconPalette(FLOATING_DOCK_TABBAR_ICON_PALETTE, iconPaletteProp), [iconPaletteProp]);
    const styles = useMemo(() => ({
        shell: mergeViewStyle(floatingDockTabbarStyles.shell, stylesProp?.shell),
        barSurface: mergeViewStyle(floatingDockTabbarStyles.barSurface, stylesProp?.barSurface),
        tabsRow: mergeViewStyle(floatingDockTabbarStyles.tabsRow, stylesProp?.tabsRow),
        tabItem: mergeViewStyle(floatingDockTabbarStyles.tabItem, stylesProp?.tabItem),
        iconSlot: mergeViewStyle(floatingDockTabbarStyles.iconSlot, stylesProp?.iconSlot),
        tabLabel: mergeTextStyle(floatingDockTabbarStyles.tabLabel, stylesProp?.tabLabel),
        activeTabLabel: mergeTextStyle(floatingDockTabbarStyles.activeTabLabel, stylesProp?.activeTabLabel),
        activeBubble: mergeViewStyle(floatingDockTabbarStyles.activeBubble, stylesProp?.activeBubble),
    }), [stylesProp]);
    return { styles, iconPalette };
}
//# sourceMappingURL=use-floating-dock-styles.js.map