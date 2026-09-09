import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';
import { StarIcon } from './icons';

const meta = {
  title: 'sample_button/SampleButton/caption',
  component: SampleButton,
  args: { caption: 'Sample Button', onPress: fn() },
  argTypes: {
    caption: { control: 'text' },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Omitting `caption` renders an icon-only button — pair with `accessibilityLabel`. */
export const Empty: Story = {
  args: { caption: undefined, icon: StarIcon, accessibilityLabel: 'Favorite' },
};

export const Long: Story = {
  args: { caption: 'This is a much longer caption to check wrapping and truncation' },
};
