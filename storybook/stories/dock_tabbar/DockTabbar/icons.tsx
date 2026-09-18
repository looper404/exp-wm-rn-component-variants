import React from 'react';
import { Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import type { DockTabbarItem, DockTabbarItemIconArgs } from '@wavemaker/rn-components/dock_tabbar';

type GlyphName = 'home' | 'explore' | 'saved' | 'profile' | 'settings';

type ShapeProps = {
  fill: string;
  stroke: string;
  strokeWidth?: number;
  strokeLinecap?: 'round';
  strokeLinejoin?: 'round';
};

/** Solid silhouette when `active`, stroked outline otherwise — per the finalized spec. */
const Glyph = ({ name, size, color, active }: { name: GlyphName } & DockTabbarItemIconArgs) => {
  const shapeProps: ShapeProps = active
    ? { fill: color, stroke: 'none' }
    : { fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {GLYPH_PATHS[name](shapeProps)}
    </Svg>
  );
};

const GLYPH_PATHS: Record<GlyphName, (shapeProps: ShapeProps) => React.ReactNode> = {
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
  settings: (shapeProps) => (
    <>
      <Circle cx={12} cy={12} r={3.2} {...shapeProps} />
      <Path
        d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8 6.2 6.2"
        fill="none"
        stroke={shapeProps.stroke === 'none' ? shapeProps.fill : shapeProps.stroke}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </>
  ),
};

const GLYPH_NAMES: GlyphName[] = ['home', 'explore', 'saved', 'profile', 'settings'];

/** The 5-item demo dataset used across every DockTabbar story. */
export const demoItems: DockTabbarItem[] = GLYPH_NAMES.map((name) => ({
  accessibilityLabel: name[0].toUpperCase() + name.slice(1),
  icon: (args) => <Glyph name={name} {...args} />,
}));

/** Same as `demoItems`, plus a text label rendered below each icon. */
export const demoItemsWithLabels: DockTabbarItem[] = GLYPH_NAMES.map((name) => {
  const displayName = name[0].toUpperCase() + name.slice(1);
  return {
    accessibilityLabel: displayName,
    icon: (args) => <Glyph name={name} {...args} />,
    label: () => (
      <Text style={{ fontSize: 11, color: '#6E6E73' }} numberOfLines={1} ellipsizeMode="tail">
        {displayName}
      </Text>
    ),
  };
});

/**
 * Same as `demoItemsWithLabels`, but the last slot uses a longer word
 * ("Notifications" in place of "Settings") to exercise the label-overflow
 * fix — the slot should clip/ellipsize the label within its own bounds
 * instead of bleeding into the neighboring "Profile" tab.
 */
export const demoItemsWithLongLabel: DockTabbarItem[] = demoItemsWithLabels.map((item, index) =>
  index === demoItemsWithLabels.length - 1
    ? {
        ...item,
        accessibilityLabel: 'Notifications',
        label: () => (
          <Text style={{ fontSize: 11, color: '#6E6E73' }} numberOfLines={1} ellipsizeMode="tail">
            Notifications
          </Text>
        ),
      }
    : item
);
