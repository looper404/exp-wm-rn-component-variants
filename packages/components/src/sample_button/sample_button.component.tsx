import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import type { SampleButtonProps } from './sample_button.props';
import { useSampleButtonStyles } from './use-sample_button-styles';

export const SampleButton: React.FC<SampleButtonProps> = ({
  caption,
  variant = 'filled',
  size = 'medium',
  iconPosition = 'left',
  icon,
  badgeCount,
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
  styles,
  palette,
  accessibilityLabel,
  testID,
}) => {
  const resolved = useSampleButtonStyles({ variant, size, disabled, fullWidth, styles, palette });
  const isDisabled = disabled || loading;
  const hasBadge = badgeCount !== undefined && badgeCount !== null && badgeCount !== '';

  const iconNode = icon ? icon({ size: resolved.iconSize, color: resolved.iconColor }) : null;
  const showIconGap = Boolean(iconNode) && Boolean(caption || loading);
  const iconGapStyle = showIconGap
    ? iconPosition === 'top'
      ? { marginBottom: resolved.gap }
      : iconPosition === 'right'
        ? { marginLeft: resolved.gap }
        : { marginRight: resolved.gap }
    : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={accessibilityLabel ?? caption}
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      style={resolved.root}
    >
      <View style={[resolved.content, iconPosition === 'top' ? resolved.contentIconTop : null]}>
        {(iconPosition === 'left' || iconPosition === 'top') && iconNode ? (
          <View style={[resolved.icon, iconGapStyle]}>{iconNode}</View>
        ) : null}
        {loading ? (
          <ActivityIndicator
            size="small"
            color={resolved.iconColor}
            testID={testID ? `${testID}_loading` : undefined}
          />
        ) : caption ? (
          <Text style={resolved.text}>{caption}</Text>
        ) : null}
        {iconPosition === 'right' && iconNode ? (
          <View style={[resolved.icon, iconGapStyle]}>{iconNode}</View>
        ) : null}
      </View>
      {hasBadge ? (
        <View style={resolved.badge} testID={testID ? `${testID}_badge` : undefined}>
          <Text style={resolved.badgeText}>{badgeCount}</Text>
        </View>
      ) : null}
    </Pressable>
  );
};

SampleButton.displayName = 'SampleButton';

export default SampleButton;
