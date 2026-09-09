import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/loading',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `loading` defaults to `false`. */
export const Default: Story = {};

/** Replaces the caption with a spinner and suppresses `onPress`. */
export const True: Story = { args: { loading: true } };
