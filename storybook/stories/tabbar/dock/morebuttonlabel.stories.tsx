/**
 * Dock Tabbar — morebuttonlabel
 *
 * GENERATED from the component API manifest (dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { DockTabbar } from '../../../../packages/components/src/tabbar/dock';

const meta = {
  title: 'Tabbar/Dock Tabbar/morebuttonlabel',
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

/** morebuttonlabel at its default of "more". */
export const Default: Story = {
  args: {
    morebuttonlabel: "more",
  },
};

/** morebuttonlabel set to a caller-supplied value. */
export const Custom: Story = {
  args: {
    morebuttonlabel: 'Custom',
  },
};

/** morebuttonlabel empty — the fallback should hold. */
export const Empty: Story = {
  args: {
    morebuttonlabel: '',
  },
};

/** morebuttonlabel long enough to test truncation. */
export const Long: Story = {
  args: {
    morebuttonlabel: 'A deliberately long value, to show what happens when it does not fit',
  },
};
