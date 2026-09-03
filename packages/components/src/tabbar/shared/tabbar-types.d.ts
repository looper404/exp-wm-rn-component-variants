import type { ReactNode } from 'react';
import type { TabbarGlyphName } from './tabbar-icons';
/**
 * The contract every tabbar variant renders against. Variants are
 * standalone — there is no navigation stack behind this — so the host wires
 * `activeIndex`/`onItemClick` up to whatever routing it uses, and supplies
 * per-index content through the callbacks.
 */
export interface TabbarWidgetProps {
    /** How many tabs to render. */
    numberOfItems?: number;
    /** Index of the currently selected tab. */
    activeIndex?: number;
    /** Fired with the tapped tab's index. */
    onItemClick?: (index: number) => void;
    /** Icon for tab `index`; `active` is true for the selected tab. Falls back to a curated default glyph. */
    getIcon?: (index: number, active: boolean) => ReactNode;
    /** Label for tab `index`. Falls back to a curated default label. */
    getLabel?: (index: number) => string;
    /** Badge count for tab `index`, if the variant renders badges. */
    getBadgeCount?: (index: number) => number | undefined;
    /** Accessible label for the overflow "more" tab, on variants that render one. */
    morebuttonlabel?: string;
}
/** One entry of the curated default nav set variants fall back to. */
export interface TabbarNavItem {
    label: string;
    glyph: TabbarGlyphName;
}
/** The default 5-tab set: Home, Explore, Saved, Profile, Settings. */
export declare const DEFAULT_TABBAR_NAV_ITEMS: readonly TabbarNavItem[];
/**
 * Tab-item builder: the default label/glyph for tab `index`, used whenever a
 * variant's caller doesn't supply `getIcon`/`getLabel`. Falls back to a
 * numbered "more" item past the curated set.
 */
export declare function getDefaultTabbarNavItem(index: number): TabbarNavItem;
//# sourceMappingURL=tabbar-types.d.ts.map