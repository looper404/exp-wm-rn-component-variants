/**
 * Floating Dock Tabbar — numberOfItems
 *
 * GENERATED from the component API manifest (floating-dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingDockTabbar } from '@wavemaker/rn-components/tabbar/floating-dock';

const meta = {
  title: 'Tabbar/Floating Dock Tabbar/numberOfItems',
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

/** numberOfItems at its default of 4. */
export const Default: Story = {
  args: {
    numberOfItems: 4,
  },
};

/** numberOfItems at the top of its useful range. */
export const Maximum: Story = {
  args: {
    numberOfItems: 8,
  },
};

/** numberOfItems at the bottom of its useful range. */
export const Minimum: Story = {
  args: {
    numberOfItems: 2,
  },
};
