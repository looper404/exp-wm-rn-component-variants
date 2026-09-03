/** The default 5-tab set: Home, Explore, Saved, Profile, Settings. */
export const DEFAULT_TABBAR_NAV_ITEMS = [
    { label: 'Home', glyph: 'home' },
    { label: 'Explore', glyph: 'explore' },
    { label: 'Saved', glyph: 'saved' },
    { label: 'Profile', glyph: 'profile' },
    { label: 'Settings', glyph: 'settings' },
];
/**
 * Tab-item builder: the default label/glyph for tab `index`, used whenever a
 * variant's caller doesn't supply `getIcon`/`getLabel`. Falls back to a
 * numbered "more" item past the curated set.
 */
export function getDefaultTabbarNavItem(index) {
    return DEFAULT_TABBAR_NAV_ITEMS[index] ?? { label: `Item ${index + 1}`, glyph: 'more' };
}
//# sourceMappingURL=tabbar-types.js.map