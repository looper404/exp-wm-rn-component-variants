import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/onPress',
  component: SampleButton,
  args: { caption: 'Sample Button' },
  argTypes: {
    onPress: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: 'Check the Actions panel to see `onPress` fire when the button is tapped.',
      },
    },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `onPress` is wired to an action spy. */
export const Default: Story = { args: { onPress: fn() } };

/** Omitting `onPress` still renders a normal, tappable-looking button — it just does nothing. */
export const Unset: Story = { args: { onPress: undefined } };
