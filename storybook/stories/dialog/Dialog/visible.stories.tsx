import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/visible',
  component: Dialog,
  args: {
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    visible: { control: 'boolean' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Toggle `visible` in the Controls panel to play the open/close animation. */
export const Default: Story = { args: { visible: true } };

/** Renders nothing at all when `visible` is `false`. */
export const False: Story = { args: { visible: false } };
