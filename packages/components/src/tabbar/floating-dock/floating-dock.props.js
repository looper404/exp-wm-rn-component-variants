// numberOfItems is deliberately absent here: leaving it unset lets the
// component fall back to the design's 5-item curated set (Home, Explore,
// Saved, Profile, Settings) when no dataset is bound. Baking a default in
// would shadow that fallback for every caller who doesn't pass the prop.
const FLOATING_DOCK_TABBAR_DEFAULTS = {
    activeAccentColor: "#2DD4BF",
    activeBubbleColor: "#1E2A33",
    activeIndex: 0,
    disabled: false,
    morebuttonlabel: "more",
    show: true,
    showLabels: true,
};
/** Merge caller props with Floating Dock Tabbar defaults. */
export function createFloatingDockTabbarProps(partial) {
    return { ...FLOATING_DOCK_TABBAR_DEFAULTS, ...partial };
}
//# sourceMappingURL=floating-dock.props.js.map