import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'sample_button/SampleButton/badgeCount',
  component: SampleButton,
  args: { caption: 'Inbox', onPress: fn() },
  argTypes: {
    badgeCount: { control: 'text' },
  },
} satisfies Meta<typeof SampleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `badgeCount` is omitted by default — no badge is rendered. */
export const Default: Story = {};

export const NinePlus: Story = { args: { badgeCount: '9+' } };

export const Number: Story = { args: { badgeCount: 3 } };

export const Zero: Story = { args: { badgeCount: 0 } };
