import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/testID',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    visible: { control: 'boolean' },
    testID: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`testID` has no visual effect — it forwards to the root `Modal` plus `_backdrop`/`_card`/`_content`/`_header`/`_body`/`_footer` region suffixes for test queries.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `testID` is omitted by default. */
export const Default: Story = {};

export const Provided: Story = { args: { testID: 'confirm-dialog' } };
