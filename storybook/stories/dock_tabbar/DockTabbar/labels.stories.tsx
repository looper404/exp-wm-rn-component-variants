import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems, demoItemsWithLabels, demoItemsWithLongLabel } from './icons';

const meta = {
  title: 'dock_tabbar/DockTabbar/labels',
  component: DockTabbar,
  args: { name: 'dockTabbar1', items: demoItemsWithLabels, activeIndex: 0, onChange: fn() },
  argTypes: {
    items: { control: false },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Each item's `label` renders text below its icon, sourced from the item's own props. */
export const Default: Story = {};

/** Items that omit `label` render icon-only, same as before this feature. */
export const WithoutLabels: Story = { args: { items: demoItems } };

/**
 * A long label ("Notifications") clips within its own slot instead of
 * overflowing into the neighboring tab — see TRA-19 review feedback.
 */
export const LongLabel: Story = { args: { items: demoItemsWithLongLabel, activeIndex: 4 } };
