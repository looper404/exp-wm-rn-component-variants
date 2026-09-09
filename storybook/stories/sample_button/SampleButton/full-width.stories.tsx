import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { View } from 'react-native';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/fullWidth',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    fullWidth: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View style={{ width: 320 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `fullWidth` defaults to `false` — the button hugs its content. */
export const Default: Story = {};

/** Stretches the button to fill its container. */
export const True: Story = { args: { fullWidth: true } };
