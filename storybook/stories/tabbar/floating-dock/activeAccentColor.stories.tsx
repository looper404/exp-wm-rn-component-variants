/**
 * Floating Dock Tabbar — activeAccentColor
 *
 * GENERATED from the component API manifest (floating-dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FloatingDockTabbar } from '@wavemaker/rn-components/tabbar/floating-dock';
import {
  FLOATING_DOCK_TABBAR_ACCENT,
  FLOATING_DOCK_TABBAR_ACTIVE_LABEL_COLOR,
} from '@wavemaker/rn-components/tabbar/floating-dock/floating-dock.styles';

const meta = {
  title: 'Tabbar/Floating Dock Tabbar/activeAccentColor',
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

/** activeAccentColor at its default, the design's accent teal. */
export const Default: Story = {
  args: {
    activeAccentColor: FLOATING_DOCK_TABBAR_ACCENT,
  },
};

/** activeAccentColor pointed at another palette constant. */
export const Alternate: Story = {
  args: {
    activeAccentColor: FLOATING_DOCK_TABBAR_ACTIVE_LABEL_COLOR,
  },
};
