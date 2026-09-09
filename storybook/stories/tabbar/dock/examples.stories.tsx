/**
 * Dock Tabbar — Examples
 *
 * GENERATED from the component API manifest (dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { DockTabbar } from '../../../../packages/components/src/tabbar/dock';

const meta = {
  title: 'Tabbar/Dock Tabbar/Examples',
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

const longGetLabel = (index: number) => `Section number ${index + 1}`;

/** The component exactly as the design specifies it. The verify loop screenshots this story. */
export const Default: Story = {
  args: {},
};

/** The shape an app actually uses: a dataset with the label field bound. */
export const BoundToData: Story = {
  name: 'Bound To Data',
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
    itemlabel: 'label',
  },
};

/** Nothing to show. The widget should degrade, not throw. */
export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    dataset: [],
  },
};

/** Labels past the width of a tab, to show the truncation behaviour. */
export const LongLabels: Story = {
  name: 'Long Labels',
  args: {
    getLabel: longGetLabel,
  },
};

/** More items than fit, so the rest collapse behind the overflow button. */
export const OverflowMenu: Story = {
  name: 'Overflow Menu',
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
    maxvisibleitems: 4,
  },
};

/** A caller restyling the widget through the styles prop. */
export const Themed: Story = {
  args: {
    styles: { shell: { opacity: 0.9 } },
  },
};
