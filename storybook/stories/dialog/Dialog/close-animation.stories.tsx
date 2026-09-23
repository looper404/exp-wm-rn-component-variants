import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/closeAnimation',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    closeAnimation: { control: 'select', options: ['fade', 'slide', 'scale', 'none'] },
    visible: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`closeAnimation` is independent of `openAnimation` — toggle `visible` off in the Controls panel to see the exit transition for the selected value.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `closeAnimation` defaults to `fade`. */
export const Default: Story = {};

export const Slide: Story = { args: { closeAnimation: 'slide' } };

export const Scale: Story = { args: { closeAnimation: 'scale' } };

export const None: Story = { args: { closeAnimation: 'none' } };
