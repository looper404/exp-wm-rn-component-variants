import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

const meta = {
  title: 'dock_tabbar/DockTabbar/accessibilityLabel',
  component: DockTabbar,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0, onChange: fn() },
  argTypes: {
    items: { control: false },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Falls back to `name` when omitted. */
export const Default: Story = {};

export const Custom: Story = { args: { accessibilityLabel: 'Primary navigation' } };
