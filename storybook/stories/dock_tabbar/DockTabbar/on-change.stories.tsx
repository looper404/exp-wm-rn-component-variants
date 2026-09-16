import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

const meta = {
  title: 'dock_tabbar/DockTabbar/onChange',
  component: DockTabbar,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0 },
  argTypes: {
    onChange: { control: false },
    onLongPress: { control: false },
    onTap: { control: false },
    items: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Check the Actions panel: `onTap` fires on every tap, `onChange` fires with the tapped index, and `onLongPress` fires with the index on long-press.',
      },
    },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All three events wired to action spies. */
export const Default: Story = { args: { onChange: fn(), onLongPress: fn(), onTap: fn() } };
