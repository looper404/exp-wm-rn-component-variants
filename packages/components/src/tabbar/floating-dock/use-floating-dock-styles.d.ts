import type { TabbarIconPaletteProp } from '../shared/tabbar-style-utils';
import type { FloatingDockTabbarStylesProp } from './floating-dock.style-props';
export declare function useFloatingDockTabbarResolvedStyles(stylesProp?: FloatingDockTabbarStylesProp, iconPaletteProp?: TabbarIconPaletteProp): {
    styles: {
        shell: import("react-native").StyleProp<import("react-native").ViewStyle>;
        barSurface: import("react-native").StyleProp<import("react-native").ViewStyle>;
        tabsRow: import("react-native").StyleProp<import("react-native").ViewStyle>;
        tabItem: import("react-native").StyleProp<import("react-native").ViewStyle>;
        iconSlot: import("react-native").StyleProp<import("react-native").ViewStyle>;
        tabLabel: import("react-native").StyleProp<import("react-native").TextStyle>;
        activeTabLabel: import("react-native").StyleProp<import("react-native").TextStyle>;
        activeBubble: import("react-native").StyleProp<import("react-native").ViewStyle>;
    };
    iconPalette: import("../shared/tabbar-icon-palette").TabbarIconPalette;
};
//# sourceMappingURL=use-floating-dock-styles.d.ts.map