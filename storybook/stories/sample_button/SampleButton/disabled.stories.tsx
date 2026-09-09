import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/disabled',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `disabled` defaults to `false`. */
export const Default: Story = {};

export const True: Story = { args: { disabled: true } };
