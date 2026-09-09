import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/styles',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    styles: { control: false },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `styles` is omitted by default — only the default `StyleSheet` applies. */
export const Default: Story = {};

/** Merges caller overrides onto the `root`/`text` regions. */
export const Custom: Story = {
  args: {
    styles: {
      root: { borderRadius: 999, borderWidth: 2 },
      text: { fontStyle: 'italic', letterSpacing: 1 },
    },
  },
};
