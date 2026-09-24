import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/animationDuration',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    openAnimation: 'slide',
    closeAnimation: 'slide',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    animationDuration: { control: 'number' },
    visible: { control: 'boolean' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `animationDuration` defaults to `250`ms for both the open and close animation. */
export const Default: Story = {};

export const Slow: Story = { args: { animationDuration: 900 } };

export const Instant: Story = { args: { animationDuration: 0 } };
