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

/** Slot 0 is active — the decorative notch sits above it. */
export const Default: Story = {};

/** The notch slides to sit above the active slot. */
export const MiddleItemActive: Story = { args: { activeIndex: 2 } };

/** The notch clamps clear of the right corner radius even at the last slot. */
export const LastItemActive: Story = { args: { activeIndex: 4 } };
