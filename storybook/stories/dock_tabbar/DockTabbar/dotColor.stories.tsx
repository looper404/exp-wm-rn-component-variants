import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

const meta = {
  title: 'dock_tabbar/DockTabbar/dotColor',
  component: DockTabbar,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0, onChange: fn() },
  argTypes: {
    dotColor: { control: 'color' },
    items: { control: false },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `dotColor` defaults to unset, which falls back to `activeIconColor`. */
export const Default: Story = {};

/** An explicit `dotColor` overrides the `activeIconColor` fallback. */
export const CustomDotColor: Story = { args: { dotColor: '#FF3B30' } };
