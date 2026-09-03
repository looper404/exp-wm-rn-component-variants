import type { TabbarIconPaletteProp } from '../shared/tabbar-style-utils';
import type { ColorShiftTabbarStylesProp, ColorShiftTabbarLayoutProp } from './color-shift.style-props';
export declare function useColorShiftTabbarResolvedStyles(stylesProp?: ColorShiftTabbarStylesProp, iconPaletteProp?: TabbarIconPaletteProp, layoutProp?: ColorShiftTabbarLayoutProp): {
    styles: {
        shell: import("react-native").StyleProp<import("react-native").ViewStyle>;
        barSurface: import("react-native").StyleProp<import("react-native").ViewStyle>;
        tabsRow: import("react-native").StyleProp<import("react-native").ViewStyle>;
        tabItem: import("react-native").StyleProp<import("react-native").ViewStyle>;
        iconSlot: import("react-native").StyleProp<import("react-native").ViewStyle>;
        tabLabel: import("react-native").StyleProp<import("react-native").TextStyle>;
        activeTabLabel: import("react-native").StyleProp<import("react-native").TextStyle>;
    };
    iconPalette: import("../shared/tabbar-icon-palette").TabbarIconPalette;
    layout: Required<ColorShiftTabbarLayoutProp>;
};
//# sourceMappingURL=use-color-shift-styles.d.ts.map