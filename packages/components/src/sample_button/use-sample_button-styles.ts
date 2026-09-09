import { useMemo } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { SampleButtonSize, SampleButtonVariant } from './sample_button.props';
import {
  SAMPLE_BUTTON_DEFAULT_PALETTE,
  SAMPLE_BUTTON_SIZE_METRICS,
  sampleButtonStyles,
  type SampleButtonPalette,
  type SampleButtonStylesProp,
} from './sample_button.styles';

interface UseSampleButtonStylesArgs {
  variant: SampleButtonVariant;
  size: SampleButtonSize;
  disabled: boolean;
  fullWidth: boolean;
  styles?: SampleButtonStylesProp;
  palette?: Partial<SampleButtonPalette>;
}

/** Resolves the default styles for `variant`/`size`/`disabled`, merged with caller overrides. */
export const useSampleButtonStyles = ({
  variant,
  size,
  disabled,
  fullWidth,
  styles,
  palette,
}: UseSampleButtonStylesArgs) => {
  return useMemo(() => {
    const resolvedPalette: SampleButtonPalette = { ...SAMPLE_BUTTON_DEFAULT_PALETTE, ...palette };
    const colors = disabled ? resolvedPalette.disabled : resolvedPalette[variant];
    const metrics = SAMPLE_BUTTON_SIZE_METRICS[size];

    const root: StyleProp<ViewStyle> = [
      sampleButtonStyles.root,
      {
        backgroundColor: colors.background,
        borderColor: colors.border,
        paddingVertical: metrics.paddingVertical,
        paddingHorizontal: metrics.paddingHorizontal,
      },
      fullWidth ? sampleButtonStyles.fullWidth : null,
      styles?.root,
    ];

    const text: StyleProp<TextStyle> = [
      sampleButtonStyles.text,
      { color: colors.text, fontSize: metrics.fontSize },
      styles?.text,
    ];

    return {
      root,
      content: [sampleButtonStyles.content, styles?.content] as StyleProp<ViewStyle>,
      contentIconTop: sampleButtonStyles.contentIconTop,
      text,
      icon: [sampleButtonStyles.icon, styles?.icon] as StyleProp<ViewStyle>,
      badge: [sampleButtonStyles.badge, styles?.badge] as StyleProp<ViewStyle>,
      badgeText: [sampleButtonStyles.badgeText, styles?.badgeText] as StyleProp<TextStyle>,
      iconColor: colors.text,
      iconSize: metrics.iconSize,
      gap: metrics.gap,
    };
  }, [variant, size, disabled, fullWidth, styles, palette]);
};
