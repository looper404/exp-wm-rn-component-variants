/**
 * Floating Dock Tabbar — dataset
 *
 * GENERATED from the component API manifest (floating-dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingDockTabbar } from '@wavemaker/rn-components/tabbar/floating-dock';

const meta = {
  title: 'Tabbar/Floating Dock Tabbar/dataset',
  component: FloatingDockTabbar,
  argTypes: {
    onItemClick: { action: 'onItemClick' },
    onItemSelect: { action: 'onItemSelect' },
    onLongPress: { action: 'onLongPress' },
    onMoreClick: { action: 'onMoreClick' },
    onMoreItemClick: { action: 'onMoreItemClick' },
  },
} satisfies Meta<typeof FloatingDockTabbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** dataset left unset, so the component's own default applies. */
export const Default: Story = {
  args: {},
};

/** dataset empty — the widget must not crash. */
export const Empty: Story = {
  args: {
    dataset: [],
  },
};

/** dataset at eight items, past what usually fits. */
export const Many: Story = {
  args: {
    dataset: [
      { label: 'Home', icon: 'home' },
      { label: 'Search', icon: 'search' },
      { label: 'Create', icon: 'plus' },
      { label: 'Inbox', icon: 'bell' },
      { label: 'Library', icon: 'book' },
      { label: 'Profile', icon: 'user' },
      { label: 'Settings', icon: 'cog' },
      { label: 'About', icon: 'info' },
    ],
  },
};

/** dataset with one item. */
export const Single: Story = {
  args: {
    dataset: [{ label: 'Home', icon: 'home' }],
  },
};
