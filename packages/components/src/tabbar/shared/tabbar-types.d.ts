import type { ReactNode } from 'react';
import type { TabbarGlyphName } from './tabbar-icons';
/**
 * The family-wide contract every tabbar variant renders against, on top of
 * its own design-specific props. Variants are standalone — there is no
 * navigation stack behind this — so the host wires `activeIndex`/`onItemClick`
 * up to whatever routing it uses. Per-tab content comes from a bound
 * `dataset` (each variant hands the raw item back through its events) or,
 * absent one, from the `getIcon`/`getLabel` render overrides, falling back to
 * a curated default set.
 *
 * `itemicon`/`itemlabel`/`itembadge`/`itemlink`/`classname` are dataset-field
 * and web-theming hooks this standalone package declares for its Studio
 * wrapper to consume — resolving an expression, an icon-font class, or a CSS
 * class needs a runtime this package intentionally doesn't depend on. Same
 * for `maxvisibleitems`/`morebuttoniconclass`/`onMoreClick`/`onMoreItemClick`:
 * they only do something on variants whose design actually has an overflow
 * menu.
 */
export interface TabbarWidgetProps {
    /** Widget name, unique within the page. */
    name?: string;
    /** Tab count when no dataset is bound. */
    numberOfItems?: number;
    /** Items to render as tabs. Overrides numberOfItems when supplied. */
    dataset?: unknown[];
    /** Index of the currently selected tab. */
    activeIndex?: number;
    /** Disables every tab. */
    disabled?: boolean;
    /** Whether the tab bar renders at all. */
    show?: boolean;
    /** Extra class names merged into the root style resolution. */
    classname?: string;
    /** Dataset field, or expression, giving each tab its icon class. */
    itemicon?: string;
    /** Dataset field, or expression, giving each tab its label. */
    itemlabel?: string;
    /** Dataset field, or expression, giving each tab its badge value. */
    itembadge?: string;
    /** Dataset field, or expression, giving each tab its navigation target. */
    itemlink?: string;
    /** Tabs shown before the rest collapse into the overflow menu. */
    maxvisibleitems?: number;
    /** Icon class for the overflow button. */
    morebuttoniconclass?: string;
    /** Label under the overflow button. */
    morebuttonlabel?: string;
    /** Icon for tab `index`; `active` is true for the selected tab. Falls back to a curated default glyph. */
    getIcon?: (index: number, active: boolean) => ReactNode;
    /** Label for tab `index`. Falls back to a curated default label. */
    getLabel?: (index: number) => string;
    /** A tab was tapped. */
    onItemClick?: (index: number, item?: unknown) => void;
    /** The active tab changed, however it changed. */
    onItemSelect?: (index: number, item?: unknown) => void;
    /** A tab was long-pressed. */
    onLongPress?: (index: number, item?: unknown) => void;
    /** The overflow button was tapped. */
    onMoreClick?: () => void;
    /** An item inside the overflow menu was tapped. */
    onMoreItemClick?: (index: number, item?: unknown) => void;
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