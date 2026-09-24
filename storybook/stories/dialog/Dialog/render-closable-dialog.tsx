import type { ReactElement } from 'react';
import { useArgs } from 'storybook/preview-api';
import { Dialog } from '@wavemaker/rn-components/dialog';
import type { DialogProps } from '@wavemaker/rn-components/dialog';

/**
 * Storybook args are static per render, so a story that only spies on
 * `onRequestClose` (e.g. via `fn()`) never actually closes the dialog —
 * nothing drives `visible` back to `false`, so the close animation is
 * undemonstrable no matter how the backdrop/back button is triggered. This
 * mirrors how a real consumer wires `visible` off `onRequestClose`, writing
 * the change back into args so the close animation plays and the Controls
 * panel stays in sync.
 */
export const renderClosableDialog = (args: DialogProps): ReactElement => {
  const [, updateArgs] = useArgs<DialogProps>();
  return (
    <Dialog
      {...args}
      onRequestClose={() => {
        args.onRequestClose?.();
        updateArgs({ visible: false });
      }}
    />
  );
};
