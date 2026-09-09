import type { GestureResponderEvent } from 'react-native';
import type { ReactNode } from 'react';
import type { SampleButtonStylesProp, SampleButtonPalette } from './sample_button.styles';

export type SampleButtonVariant = 'filled' | 'outlined' | 'text';
export type SampleButtonSize = 'small' | 'medium' | 'large';
export type SampleButtonIconPosition = 'left' | 'right' | 'top';

export interface SampleButtonIconRenderArgs {
  size: number;
  color: string;
}

export interface SampleButtonProps {
  /** Label rendered inside the button. Omit to render an icon-only button. */
  caption?: string;
  variant?: SampleButtonVariant;
  size?: SampleButtonSize;
  /** Where the icon sits relative to the caption. Ignored when `icon` is not provided. */
  iconPosition?: SampleButtonIconPosition;
  /** Renders the icon; receives the resolved size/color for the current variant + size. */
  icon?: (args: SampleButtonIconRenderArgs) => ReactNode;
  /** Shown as a small badge pinned to the top-right corner when set. */
  badgeCount?: number | string;
  disabled?: boolean;
  /** Replaces the caption with a spinner and disables presses. */
  loading?: boolean;
  fullWidth?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  styles?: SampleButtonStylesProp;
  /** Overrides the default color palette per variant/disabled state. */
  palette?: Partial<SampleButtonPalette>;
  accessibilityLabel?: string;
  testID?: string;
}

export const createSampleButtonProps = (
  overrides: Partial<SampleButtonProps> = {}
): SampleButtonProps => ({
  caption: 'Sample Button',
  variant: 'filled',
  size: 'medium',
  iconPosition: 'left',
  disabled: false,
  loading: false,
  fullWidth: false,
  ...overrides,
});
