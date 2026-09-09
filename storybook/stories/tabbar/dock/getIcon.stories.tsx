/**
 * Dock Tabbar — getIcon
 *
 * GENERATED from the component API manifest (dock.api.ts) by
 * scripts/scaffold-stories.ts. One group per property; the default value first,
 * then every other value alphabetically. Add stories, but do not rename or
 * reorder these — the registration gate checks them against the manifest.
 */
import React from 'react';
import { Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { DockTabbar } from '../../../../packages/components/src/tabbar/dock';

const meta = {
  title: 'Tabbar/Dock Tabbar/getIcon',
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

const customGetIcon = (_index: number, active: boolean) => (
  <Text style={{ opacity: active ? 1 : 0.4 }}>{active ? '\u25CF' : '\u25CB'}</Text>
);

/** getIcon left unset, so the component's own default applies. */
export const Default: Story = {
  args: {},
};

/** getIcon supplied by the caller. */
export const CustomRenderer: Story = {
  name: 'Custom Renderer',
  args: {
    getIcon: customGetIcon,
  },
};
