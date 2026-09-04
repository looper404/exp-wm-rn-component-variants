/**
 * Floating Dock Tabbar — itembadge
 *
 * GENERATED from the component API manifest (floating-dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingDockTabbar } from '@wavemaker/rn-components/tabbar/floating-dock';

const meta = {
  title: 'Tabbar/Floating Dock Tabbar/itembadge',
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

/** itembadge left unset, so the component's own default applies. */
export const Default: Story = {
  args: {},
};

/** itembadge set to a caller-supplied value. */
export const Custom: Story = {
  args: {
    itembadge: 'Custom',
  },
};

/** itembadge empty — the fallback should hold. */
export const Empty: Story = {
  args: {
    itembadge: '',
  },
};

/** itembadge long enough to test truncation. */
export const Long: Story = {
  args: {
    itembadge: 'A deliberately long value, to show what happens when it does not fit',
  },
};
