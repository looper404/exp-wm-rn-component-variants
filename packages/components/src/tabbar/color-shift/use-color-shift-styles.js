import { useMemo } from 'react';
import { mergeTextStyle, mergeViewStyle, resolveIconPalette } from '../shared/tabbar-style-utils';
import { COLOR_SHIFT_TABBAR_ACCENT, COLOR_SHIFT_TABBAR_BAR_FILL, COLOR_SHIFT_TABBAR_ICON_PALETTE, colorShiftTabbarStyles, } from './color-shift.styles';
export function useColorShiftTabbarResolvedStyles(stylesProp, iconPaletteProp, layoutProp) {
    const iconPalette = useMemo(() => resolveIconPalette(COLOR_SHIFT_TABBAR_ICON_PALETTE, iconPaletteProp), [iconPaletteProp]);
    const layout = useMemo(() => ({
        barFill: layoutProp?.barFill ?? COLOR_SHIFT_TABBAR_BAR_FILL,
        accent: layoutProp?.accent ?? COLOR_SHIFT_TABBAR_ACCENT,
    }), [layoutProp]);
    const styles = useMemo(() => ({
        shell: mergeViewStyle(colorShiftTabbarStyles.shell, stylesProp?.shell),
        barSurface: mergeViewStyle(colorShiftTabbarStyles.barSurface, stylesProp?.barSurface),
        tabsRow: mergeViewStyle(colorShiftTabbarStyles.tabsRow, stylesProp?.tabsRow),
        tabItem: mergeViewStyle(colorShiftTabbarStyles.tabItem, stylesProp?.tabItem),
        iconSlot: mergeViewStyle(colorShiftTabbarStyles.iconSlot, stylesProp?.iconSlot),
        tabLabel: mergeTextStyle(colorShiftTabbarStyles.tabLabel, stylesProp?.tabLabel),
        activeTabLabel: mergeTextStyle(colorShiftTabbarStyles.activeTabLabel, stylesProp?.activeTabLabel),
    }), [stylesProp]);
    return { styles, iconPalette, layout };
}
//# sourceMappingURL=use-color-shift-styles.js.map