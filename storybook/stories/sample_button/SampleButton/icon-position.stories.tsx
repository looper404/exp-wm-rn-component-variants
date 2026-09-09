import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';
import { StarIcon } from './icons';

const meta = {
  title: 'sample_button/SampleButton/iconPosition',
  component: SampleButton,
  args: { caption: 'Favorite', icon: StarIcon, onPress: fn() },
  argTypes: {
    iconPosition: { control: 'select', options: ['left', 'right', 'top'] },
    icon: { control: false },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `iconPosition` defaults to `left`. */
export const Default: Story = {};

export const Right: Story = { args: { iconPosition: 'right' } };

export const Top: Story = { args: { iconPosition: 'top' } };
