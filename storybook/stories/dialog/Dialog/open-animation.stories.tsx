import type { Meta, StoryObj } from '@storybook/react';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';

const meta = {
  title: 'dialog/Dialog/openAnimation',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    openAnimation: { control: 'select', options: ['fade', 'slide', 'scale', 'none'] },
    visible: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Toggle `visible` off and back on in the Controls panel to replay the entrance animation for the selected `openAnimation`.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `openAnimation` defaults to `fade`. */
export const Default: Story = {};

export const Slide: Story = { args: { openAnimation: 'slide' } };

export const Scale: Story = { args: { openAnimation: 'scale' } };

export const None: Story = { args: { openAnimation: 'none' } };
