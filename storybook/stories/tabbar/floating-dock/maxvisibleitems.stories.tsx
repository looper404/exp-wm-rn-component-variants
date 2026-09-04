/**
 * Floating Dock Tabbar — maxvisibleitems
 *
 * GENERATED from the component API manifest (floating-dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingDockTabbar } from '@wavemaker/rn-components/tabbar/floating-dock';

const meta = {
  title: 'Tabbar/Floating Dock Tabbar/maxvisibleitems',
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

/** maxvisibleitems left unset, so the component's own default applies. */
export const Default: Story = {
  args: {},
};

/** maxvisibleitems at the top of its useful range. */
export const Maximum: Story = {
  args: {
    maxvisibleitems: 5,
  },
};

/** maxvisibleitems at the bottom of its useful range. */
export const Minimum: Story = {
  args: {
    maxvisibleitems: 2,
  },
};
