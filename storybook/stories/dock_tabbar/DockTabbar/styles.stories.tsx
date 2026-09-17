import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { View } from 'react-native';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

const meta = {
  title: 'dock_tabbar/DockTabbar/styles',
  component: DockTabbar,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0, onChange: fn() },
  argTypes: {
    styles: { control: false },
    items: { control: false },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** No overrides — the default 358x64dp white pill. */
export const Default: Story = {};

/**
 * Renders on a colored backdrop instead of the canvas default. The notch's
 * dip is a transparent cutout, so its contrast (and the nested dot's — see
 * TRA-14) only shows up against a non-white surface; the plain white canvas
 * this story's `Default` renders on can't catch a regression here.
 */
export const OnColoredBackdrop: Story = {
  decorators: [
    (StoryFn) => (
      <View style={{ backgroundColor: '#7B4FD4', padding: 24 }}>
        <StoryFn />
      </View>
    ),
  ],
};

/** `styles.barSurface` overrides merge on top of (not instead of) the defaults. */
export const CustomBarSurface: Story = {
  args: {
    styles: {
      barSurface: { borderWidth: 1, borderColor: '#E5E5EA' },
    },
  },
};

/** `styles.tabItem` overrides add spacing between slots. */
export const CustomTabItemSpacing: Story = {
  args: {
    styles: {
      tabItem: { marginHorizontal: 2 },
    },
  },
};
