import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'dialog/Dialog/footer',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    footer: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `footer` is omitted by default — no footer region is rendered. */
export const Default: Story = {};

/** Renders a pair of action buttons below the body. */
export const Actions: Story = {
  args: {
    footer: (
      <>
        <SampleButton caption="Cancel" variant="text" onPress={fn()} />
        <SampleButton caption="Delete" variant="filled" onPress={fn()} />
      </>
    ),
  },
};
