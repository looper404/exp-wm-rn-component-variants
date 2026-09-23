import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/onRequestClose',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    onRequestClose: { control: false },
    onClosed: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Check the Actions panel: `onRequestClose` fires immediately on backdrop press, `onClosed` fires once the close animation finishes.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Both callbacks are wired to action spies. */
export const Default: Story = { args: { onRequestClose: fn(), onClosed: fn() } };
