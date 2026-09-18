import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

const meta = {
  title: 'dock_tabbar/DockTabbar/show',
  component: DockTabbar,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0, onChange: fn() },
  argTypes: {
    show: { control: 'boolean' },
    items: { control: false },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `show` defaults to `true`. */
export const Default: Story = {};

/** Renders nothing at all when `show` is `false`. */
export const False: Story = { args: { show: false } };
