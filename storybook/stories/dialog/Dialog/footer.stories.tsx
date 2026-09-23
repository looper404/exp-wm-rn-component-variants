import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import { Text } from 'react-native';
import { Dialog } from '@wavemaker/rn-components/dialog';
import type { DialogProps } from '@wavemaker/rn-components/dialog';
import { SampleButton } from '@wavemaker/rn-components/sample_button';

const meta = {
  title: 'dialog/Dialog/footer',
  component: Dialog,
  args: {
    visible: true,
    title: 'Delete item?',
    children: <Text>This action cannot be undone.</Text>,
  },
  argTypes: {
    visible: { control: 'boolean' },
    footer: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `footer` is omitted by default — no footer region is rendered. */
export const Default: Story = {};

const onCancel = fn();
const onDelete = fn();

/** Renders a pair of action buttons below the body — either one closes the dialog. */
export const Actions: Story = {
  render: (args: DialogProps) => {
    const [, updateArgs] = useArgs<DialogProps>();
    const close = () => updateArgs({ visible: false });
    return (
      <Dialog
        {...args}
        footer={
          <>
            <SampleButton
              caption="Cancel"
              variant="text"
              onPress={() => {
                onCancel();
                close();
              }}
            />
            <SampleButton
              caption="Delete"
              variant="filled"
              onPress={() => {
                onDelete();
                close();
              }}
            />
          </>
        }
      />
    );
  },
};
