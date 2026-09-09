/**
 * Dock Tabbar — name
 *
 * GENERATED from the component API manifest (dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { DockTabbar } from '../../../../packages/components/src/tabbar/dock';

const meta = {
  title: 'Tabbar/Dock Tabbar/name',
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

/** name left unset, so the component's own default applies. */
export const Default: Story = {
  args: {},
};

/** name set to a caller-supplied value. */
export const Custom: Story = {
  args: {
    name: 'Custom',
  },
};

/** name empty — the fallback should hold. */
export const Empty: Story = {
  args: {
    name: '',
  },
};

/** name long enough to test truncation. */
export const Long: Story = {
  args: {
    name: 'A deliberately long value, to show what happens when it does not fit',
  },
};
