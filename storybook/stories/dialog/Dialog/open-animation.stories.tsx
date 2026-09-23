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
    openAnimation: {
      control: 'select',
      options: ['fade', 'slide', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'bounce', 'none'],
    },
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

/** Bottom-sheet style entrance — the most common mobile dialog animation. */
export const Slide: Story = { args: { openAnimation: 'slide' } };

/** Banner/notification style entrance from the top edge. */
export const SlideDown: Story = { args: { openAnimation: 'slideDown' } };

/** Side-panel style entrance sliding in from the right edge. */
export const SlideLeft: Story = { args: { openAnimation: 'slideLeft' } };

/** Side-panel style entrance sliding in from the left edge. */
export const SlideRight: Story = { args: { openAnimation: 'slideRight' } };

export const Scale: Story = { args: { openAnimation: 'scale' } };

/** Spring-driven pop-in that overshoots before settling, like iOS/Material success alerts. */
export const Bounce: Story = { args: { openAnimation: 'bounce' } };

export const None: Story = { args: { openAnimation: 'none' } };
