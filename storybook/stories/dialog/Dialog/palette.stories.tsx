import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/palette',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    palette: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `palette` is omitted by default — the built-in colors are used. */
export const Default: Story = {};

/** Overrides the backdrop tint and card background/title colors. */
export const Custom: Story = {
  args: {
    palette: {
      backdrop: 'rgba(76, 29, 149, 0.6)',
      background: '#faf5ff',
      title: '#4c1d95',
      border: '#c4b5fd',
    },
  },
};
