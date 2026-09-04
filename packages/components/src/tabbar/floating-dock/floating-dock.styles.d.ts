import type { TabbarIconPalette } from '../shared/tabbar-icon-palette';
/**
 * Floating Dock Tabbar — a dark, fully rounded pill that floats above the
 * screen content with margin on every side (no notch, no edge-to-edge
 * bleed). Five evenly spaced tabs each show an icon and a label; the active
 * tab's icon sits inside a rounded-rectangle highlight bubble, and its label
 * turns the design's accent green while every inactive icon/label shares one
 * muted gray. No badges are drawn.
 */
export declare const FLOATING_DOCK_TABBAR_CLASS = "app-tabbar-floating-dock";
/** Every colour this design uses lives here. A hex anywhere else defeats theming. */
export declare const FLOATING_DOCK_TABBAR_BAR_FILL = "#12181F";
export declare const FLOATING_DOCK_TABBAR_ACTIVE_BUBBLE_FILL = "#1E2A33";
export declare const FLOATING_DOCK_TABBAR_ACCENT = "#2DD4BF";
export declare const FLOATING_DOCK_TABBAR_INACTIVE_COLOR = "#8B94A3";
export declare const FLOATING_DOCK_TABBAR_ACTIVE_LABEL_COLOR = "#34D399";
/**
 * Inactive icons share the bar's one muted gray; the active icon takes the
 * design's accent (it sits on the bubble, not on the accent itself — see
 * `activeBubble` below).
 */
export declare const FLOATING_DOCK_TABBAR_ICON_PALETTE: TabbarIconPalette;
export declare const FLOATING_DOCK_TABBAR_BAR_HEIGHT = 64;
export declare const FLOATING_DOCK_TABBAR_BAR_RADIUS = 32;
export declare const FLOATING_DOCK_TABBAR_HORIZONTAL_PADDING = 11;
export declare const FLOATING_DOCK_TABBAR_ICON_SIZE = 22;
export declare const FLOATING_DOCK_TABBAR_BUBBLE_WIDTH = 44;
export declare const FLOATING_DOCK_TABBAR_BUBBLE_HEIGHT = 30;
export declare const FLOATING_DOCK_TABBAR_BUBBLE_RADIUS = 10;
export declare const FLOATING_DOCK_TABBAR_ICON_LABEL_GAP = 4;
export declare const FLOATING_DOCK_TABBAR_LABEL_FONT_SIZE = 11;
/** Outer gap that reads as "floating". Not part of the design's measured geometry. */
export declare const FLOATING_DOCK_TABBAR_OUTER_MARGIN = 16;
/** Opacity applied to every tab when `disabled` is set. Not part of the design's measured geometry. */
export declare const FLOATING_DOCK_TABBAR_DISABLED_OPACITY = 0.45;
export declare const floatingDockTabbarStyles: {
    shell: {
        paddingHorizontal: number;
    };
    barSurface: {
        flexDirection: "row";
        alignItems: "center";
        height: number;
        borderRadius: number;
        paddingHorizontal: number;
        backgroundColor: string;
        overflow: "hidden";
    };
    tabsRow: {
        flex: number;
        flexDirection: "row";
        alignItems: "center";
    };
    tabItem: {
        flex: number;
        alignItems: "center";
        justifyContent: "center";
        gap: number;
    };
    iconSlot: {
        width: number;
        height: number;
        borderRadius: number;
        alignItems: "center";
        justifyContent: "center";
    };
    activeBubble: {
        backgroundColor: string;
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
//# sourceMappingURL=floating-dock.styles.d.ts.map