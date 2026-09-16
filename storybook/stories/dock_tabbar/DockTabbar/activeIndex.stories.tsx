import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

const meta = {
  title: 'dock_tabbar/DockTabbar/activeIndex',
  component: DockTabbar,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0, onChange: fn() },
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0, max: 4, step: 1 } },
    items: { control: false },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Slot 0 is active — also where the decorative notch sits. */
export const Default: Story = {};

export const MiddleItemActive: Story = { args: { activeIndex: 2 } };

export const LastItemActive: Story = { args: { activeIndex: 4 } };
