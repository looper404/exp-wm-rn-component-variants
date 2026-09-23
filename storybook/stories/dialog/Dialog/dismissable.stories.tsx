import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/dismissable',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
    onRequestClose: fn(),
  },
  argTypes: {
    dismissable: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Tapping the backdrop fires `onRequestClose` when `dismissable` (the default). Check the Actions panel.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `dismissable` defaults to `true` — backdrop press closes the dialog. */
export const Default: Story = {};

/** The backdrop no longer responds to presses. */
export const False: Story = { args: { dismissable: false } };
