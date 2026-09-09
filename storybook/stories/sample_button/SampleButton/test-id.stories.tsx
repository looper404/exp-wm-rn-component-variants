import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/testID',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    testID: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`testID` has no visual effect — it forwards to the root `Pressable` (plus `_badge`/`_loading` suffixes for those regions) for test queries.',
      },
    },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `testID` is omitted by default. */
export const Default: Story = {};

export const Provided: Story = { args: { testID: 'sample-button' } };
