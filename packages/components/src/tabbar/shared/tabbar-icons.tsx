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
    <Path
      d="M12 20.3l-1.1-1C5.7 14.8 3 12.2 3 9c0-2.6 2-4.6 4.6-4.6 1.4 0 2.8.6 3.6 1.7.9-1.1 2.2-1.7 3.6-1.7C17.4 4.4 19.4 6.4 19.4 9c0 3.2-2.7 5.8-7.9 10.3z"
      {...shapeProps}
    />
  ),
  profile: (shapeProps) => (
    <>
      <Circle cx={12} cy={8.3} r={3.6} {...shapeProps} />
      <Path d="M4.8 20c.6-3.8 3.8-6 7.2-6s6.6 2.2 7.2 6z" {...shapeProps} />
    </>
  ),
  settings: (shapeProps) => (
    <>
      <Path
        d="M11.1 4.5 10.8 2 13.2 2 12.9 4.5 16.7 6 18.2 4 20 5.8 18 7.3 19.5 11.1 22 10.8 22 13.2 19.5 12.9 18 16.7 20 18.2 18.2 20 16.7 18 12.9 19.5 13.2 22 10.8 22 11.1 19.5 7.3 18 5.8 20 4 18.2 6 16.7 4.5 12.9 2 13.2 2 10.8 4.5 11.1 6 7.3 4 5.8 5.8 4 7.3 6 Z"
        {...shapeProps}
      />
      <Circle cx={12} cy={12} r={3.2} {...shapeProps} />
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
