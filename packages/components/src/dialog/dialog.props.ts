import type { ReactNode } from 'react';
import type { DialogPalette, DialogStylesProp } from './dialog.styles';

/**
 * `none` swaps content in/out instantly with no transition — useful when the
 * caller wants only the backdrop to fade.
 */
export type DialogAnimationType = 'fade' | 'slide' | 'scale' | 'none';

export interface DialogProps {
  /** Controls whether the dialog is shown; toggling drives the open/close animation. */
  visible: boolean;
  title?: string;
  children?: ReactNode;
  /** Rendered below the body, typically action buttons. */
  footer?: ReactNode;
  /** Animation played when `visible` becomes `true`. */
  openAnimation?: DialogAnimationType;
  /** Animation played when `visible` becomes `false`. Independent of `openAnimation`. */
  closeAnimation?: DialogAnimationType;
  /** Duration in milliseconds for both the open and close animation. */
  animationDuration?: number;
  /** When true (default), pressing the backdrop or the hardware back button closes the dialog. */
  dismissable?: boolean;
  /** Fired on backdrop press or hardware back button; ignored when `dismissable` is false. */
  onRequestClose?: () => void;
  /** Fired once the close animation finishes and the dialog has fully unmounted. */
  onClosed?: () => void;
  styles?: DialogStylesProp;
  /** Overrides the default backdrop/background/title/border colors. */
  palette?: Partial<DialogPalette>;
  accessibilityLabel?: string;
  testID?: string;
}

export const createDialogProps = (overrides: Partial<DialogProps> = {}): DialogProps => ({
  visible: false,
  openAnimation: 'fade',
  closeAnimation: 'fade',
  animationDuration: 250,
  dismissable: true,
  ...overrides,
});
