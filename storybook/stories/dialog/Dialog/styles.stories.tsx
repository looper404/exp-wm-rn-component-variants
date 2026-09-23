import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/styles',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    styles: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `styles` is omitted by default — only the default `StyleSheet` applies. */
export const Default: Story = {};

/** Merges caller overrides onto the `root`/`title` regions. */
export const Custom: Story = {
  args: {
    styles: {
      root: { borderRadius: 24, borderWidth: 2 },
      title: { fontStyle: 'italic', letterSpacing: 1 },
    },
  },
};
