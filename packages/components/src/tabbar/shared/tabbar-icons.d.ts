/**
 * The curated nav glyphs every variant's default `getIcon` draws from. Callers
 * can always supply their own `getIcon` to bypass this entirely — this only
 * gives the out-of-the-box tab bar something to show.
 */
export type TabbarGlyphName = 'home' | 'explore' | 'saved' | 'profile' | 'settings' | 'more';
export type TabbarGlyphProps = {
    name: TabbarGlyphName;
    /** Square size in density-independent pixels. */
    size?: number;
    color: string;
    /** Solid rendering for the active tab; stroked outline otherwise. */
    filled?: boolean;
};
/** One glyph, drawn either as a solid silhouette or a stroked outline. */
export declare function TabbarGlyph({ name, size, color, filled }: TabbarGlyphProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tabbar-icons.d.ts.map