import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/palette',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    palette: { control: false },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `palette` is omitted by default — the built-in color palette is used. */
export const Default: Story = {};

/** Overrides the `filled` variant's colors. */
export const Custom: Story = {
  args: {
    palette: {
      filled: { background: '#7B4FD4', text: '#ffffff', border: '#7B4FD4' },
    },
  },
};
