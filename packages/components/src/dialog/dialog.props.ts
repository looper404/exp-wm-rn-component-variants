import type { ReactNode } from 'react';
import type { DialogPalette, DialogStylesProp } from './dialog.styles';

/**
 * - `fade` — cross-fade only.
 * - `slide` — slides up from the bottom (bottom-sheet style).
 * - `slideDown` — slides in from the top (banner/notification style).
 * - `slideLeft` / `slideRight` — slides in from the right/left edge (side-panel style).
 * - `scale` — grows/shrinks from a slightly smaller size while fading.
 * - `bounce` — pops in with a spring overshoot instead of an eased duration curve.
 * - `none` — swaps content in/out instantly with no transition — useful when
 *   the caller wants only the backdrop to fade.
 */
export type DialogAnimationType =
  | 'fade'
  | 'slide'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'bounce'
  | 'none';

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
