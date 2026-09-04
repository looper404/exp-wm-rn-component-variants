/**
 * Floating Dock Tabbar — generated skeleton, filled in by hand.
 * Source design: floating-dock-tabbar. Regenerating overwrites nothing that exists.
 */
/** Shape of the manifest below. Declared locally so this file depends on nothing. */
export type FloatingDockTabbarApiProp = {
    name: string;
    kind: 'string' | 'number' | 'boolean' | 'color' | 'list' | 'style' | 'function';
    required: boolean;
    default: string | number | boolean | null;
    description: string;
    source: 'family' | 'repo' | 'design';
};
export type FloatingDockTabbarApiEvent = {
    name: string;
    payload: string;
    description: string;
    source: 'family' | 'repo' | 'design';
};
export declare const FLOATING_DOCK_TABBAR_API: {
    props: FloatingDockTabbarApiProp[];
    events: FloatingDockTabbarApiEvent[];
};
/** Prop names, for tests and metadata that must stay exhaustive. */
export declare const FLOATING_DOCK_TABBAR_PROP_NAMES: readonly ["activeAccentColor", "activeBubbleColor", "activeIndex", "classname", "dataset", "disabled", "getIcon", "getLabel", "iconPalette", "itembadge", "itemicon", "itemlabel", "itemlink", "maxvisibleitems", "morebuttoniconclass", "morebuttonlabel", "name", "numberOfItems", "show", "showLabels", "styles"];
/** Event names, same reason. */
export declare const FLOATING_DOCK_TABBAR_EVENT_NAMES: readonly ["onItemClick", "onItemSelect", "onLongPress", "onMoreClick", "onMoreItemClick"];
//# sourceMappingURL=floating-dock.api.d.ts.map