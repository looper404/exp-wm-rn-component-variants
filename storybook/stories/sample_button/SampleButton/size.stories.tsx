import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/size',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `size` defaults to `medium`. */
export const Default: Story = {};

export const Large: Story = { args: { size: 'large' } };

export const Small: Story = { args: { size: 'small' } };
