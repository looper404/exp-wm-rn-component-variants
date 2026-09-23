import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';
import { renderClosableDialog } from './render-closable-dialog';

const meta = {
  title: 'dialog/Dialog/onRequestClose',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    visible: { control: 'boolean' },
    onRequestClose: { control: false },
    onClosed: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Tap the backdrop (or press the hardware back button) to close the dialog and play `closeAnimation` — check the Actions panel: `onRequestClose` fires immediately, `onClosed` once the close animation finishes.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Both callbacks are wired to action spies; the backdrop actually closes the dialog. */
export const Default: Story = { args: { onRequestClose: fn(), onClosed: fn() }, render: renderClosableDialog };
