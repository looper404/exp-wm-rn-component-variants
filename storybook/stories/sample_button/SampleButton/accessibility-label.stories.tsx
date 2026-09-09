import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/accessibilityLabel',
  component: SampleButton,
  args: { caption: 'Save', onPress: fn() },
  argTypes: {
    accessibilityLabel: { control: 'text' },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `accessibilityLabel` is omitted by default — the `caption` is used instead. */
export const Default: Story = {};

export const Custom: Story = { args: { accessibilityLabel: 'Save the current form' } };
