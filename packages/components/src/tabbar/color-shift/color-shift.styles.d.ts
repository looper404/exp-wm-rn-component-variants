import type { TabbarIconPalette } from '../shared/tabbar-icon-palette';
/**
 * Color Shift Tabbar — a plain rounded-rectangle bar with five evenly spaced
 * tabs. The active tab is shown purely by tinting its icon and label; there
 * is no pill, bubble, or lift behind it.
 */
export declare const COLOR_SHIFT_TABBAR_CLASS = "app-tabbar-color-shift";
/** Every colour this design uses lives here. A hex anywhere else defeats theming. */
export declare const COLOR_SHIFT_TABBAR_BAR_FILL = "#1C1C1E";
export declare const COLOR_SHIFT_TABBAR_ACCENT = "#34D399";
export declare const COLOR_SHIFT_TABBAR_INACTIVE_ICON = "#8E8E93";
export declare const COLOR_SHIFT_TABBAR_INACTIVE_LABEL = "#8E8E93";
export declare const COLOR_SHIFT_TABBAR_ACTIVE_LABEL = "#34D399";
export declare const COLOR_SHIFT_TABBAR_ICON_PALETTE: TabbarIconPalette;
export declare const COLOR_SHIFT_TABBAR_BAR_HEIGHT = 64;
export declare const COLOR_SHIFT_TABBAR_BAR_RADIUS = 32;
export declare const COLOR_SHIFT_TABBAR_ICON_SIZE = 22;
export declare const COLOR_SHIFT_TABBAR_LABEL_FONT_SIZE = 11;
export declare const COLOR_SHIFT_TABBAR_TAB_PADDING_VERTICAL = 10;
export declare const COLOR_SHIFT_TABBAR_ICON_LABEL_GAP = 4;
export declare const colorShiftTabbarStyles: {
    shell: {
        paddingHorizontal: number;
    };
    barSurface: {
        height: number;
        borderRadius: number;
        backgroundColor: string;
        overflow: "hidden";
    };
    tabsRow: {
        flex: number;
        flexDirection: "row";
    };
    tabItem: {
        flex: number;
        alignItems: "center";
        justifyContent: "center";
        paddingVertical: number;
        gap: number;
    };
    iconSlot: {
        width: number;
        height: number;
        alignItems: "center";
        justifyContent: "center";
    };
    tabLabel: {
        fontSize: number;
        color: string;
    };
    activeTabLabel: {
        fontSize: number;
        color: string;
    };
};
//# sourceMappingURL=color-shift.styles.d.ts.map