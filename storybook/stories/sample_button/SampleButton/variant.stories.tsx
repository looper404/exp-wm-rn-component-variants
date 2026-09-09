import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/variant',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'text'] },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `variant` defaults to `filled`. */
export const Default: Story = {};

export const Outlined: Story = { args: { variant: 'outlined' } };

export const Text: Story = { args: { variant: 'text' } };
