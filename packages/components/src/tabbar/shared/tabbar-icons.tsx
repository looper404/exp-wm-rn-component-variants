import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

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

type ShapeProps = {
  fill: string;
  stroke: string;
  strokeWidth?: number;
  strokeLinecap?: 'round';
  strokeLinejoin?: 'round';
};

/** One glyph, drawn either as a solid silhouette or a stroked outline. */
export function TabbarGlyph({ name, size = 24, color, filled = false }: TabbarGlyphProps) {
  const shapeProps: ShapeProps = filled
    ? { fill: color, stroke: 'none' }
    : {
        fill: 'none',
        stroke: color,
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {GLYPH_PATHS[name](shapeProps, color)}
    </Svg>
  );
}

const GLYPH_PATHS: Record<
  TabbarGlyphName,
  (shapeProps: ShapeProps, color: string) => React.ReactNode
> = {
  home: (shapeProps) => (
    <Path
      d="M4 11.5 12 4l8 7.5V19a1.5 1.5 0 0 1-1.5 1.5h-3.75v-6h-5.5v6H5.5A1.5 1.5 0 0 1 4 19z"
      {...shapeProps}
    />
  ),
  explore: (shapeProps) => (
    <>
      <Circle cx={12} cy={12} r={8.2} {...shapeProps} />
      <Path d="M15 9l-4.5 1.5L9 15l4.5-1.5z" {...shapeProps} />
    </>
  ),
  saved: (shapeProps) => (
    <Path d="M6.5 3.5h11a.5.5 0 0 1 .5.5v16.2l-6-3.6-6 3.6V4a.5.5 0 0 1 .5-.5z" {...shapeProps} />
  ),
  profile: (shapeProps) => (
    <>
      <Circle cx={12} cy={8.3} r={3.6} {...shapeProps} />
      <Path d="M4.8 20c.6-3.8 3.8-6 7.2-6s6.6 2.2 7.2 6z" {...shapeProps} />
    </>
  ),
  settings: (shapeProps, color) => (
    <>
      <Circle cx={12} cy={12} r={3.2} {...shapeProps} />
      {/* Spokes always render as hairlines in `color` — folding them into the
          filled fill/stroke swap would make them vanish when filled. */}
      <Path
        d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8 6.2 6.2"
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </>
  ),
  more: (shapeProps) => (
    <>
      <Circle cx={5.5} cy={12} r={1.8} {...shapeProps} />
      <Circle cx={12} cy={12} r={1.8} {...shapeProps} />
      <Circle cx={18.5} cy={12} r={1.8} {...shapeProps} />
    </>
  ),
};
