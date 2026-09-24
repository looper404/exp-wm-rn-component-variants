import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/title',
  component: Dialog,
  args: {
    visible: true,
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    visible: { control: 'boolean' },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: 'Delete item?' } };

/** Omitting `title` renders no header region at all. */
export const Omitted: Story = { args: { title: undefined } };
