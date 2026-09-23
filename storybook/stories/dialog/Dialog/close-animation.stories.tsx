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
    closeAnimation: {
      control: 'select',
      options: ['fade', 'slide', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'bounce', 'none'],
    },
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

export const SlideDown: Story = { args: { closeAnimation: 'slideDown' } };

export const SlideLeft: Story = { args: { closeAnimation: 'slideLeft' } };

export const SlideRight: Story = { args: { closeAnimation: 'slideRight' } };

export const Scale: Story = { args: { closeAnimation: 'scale' } };

export const Bounce: Story = { args: { closeAnimation: 'bounce' } };

export const None: Story = { args: { closeAnimation: 'none' } };
