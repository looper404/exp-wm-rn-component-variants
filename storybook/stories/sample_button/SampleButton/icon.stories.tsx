import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';
import { StarIcon } from './icons';

const meta = {
  title: 'sample_button/SampleButton/icon',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    icon: { control: false },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `icon` is omitted by default — no icon slot is rendered. */
export const Default: Story = {};

export const IconOnly: Story = {
  args: { caption: undefined, icon: StarIcon, accessibilityLabel: 'Favorite' },
};

export const WithIcon: Story = { args: { icon: StarIcon } };
