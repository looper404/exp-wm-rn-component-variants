import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/accessibilityLabel',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    accessibilityLabel: { control: 'text' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `accessibilityLabel` is omitted by default — the `title` is used instead. */
export const Default: Story = {};

export const Custom: Story = { args: { accessibilityLabel: 'Confirm deletion of this item' } };
