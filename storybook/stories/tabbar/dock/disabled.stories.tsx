/**
 * Dock Tab Bar — disabled
 *
 * GENERATED from the component API manifest (dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { DockTabbar } from '../../../../packages/components/src/tabbar/dock';

const meta = {
  title: 'Tabbar/Dock Tab Bar/disabled',
  component: DockTabbar,
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    onItemSelect: { action: 'onItemSelect' },
    onLongPress: { action: 'onLongPress' },
    onMoreClick: { action: 'onMoreClick' },
    onMoreItemClick: { action: 'onMoreItemClick' },
  },
} satisfies Meta<typeof DockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** disabled at its default of false. */
export const Default: Story = {
  args: {
    disabled: false,
  },
};

/** disabled turned on. */
export const On: Story = {
  args: {
    disabled: true,
  },
};
