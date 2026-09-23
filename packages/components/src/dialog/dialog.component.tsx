import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import type { DialogAnimationType, DialogProps } from './dialog.props';
import { DIALOG_HIDDEN_STATE, DIALOG_IDENTITY_STATE } from './dialog.styles';
import { useDialogStyles } from './use-dialog-styles';

const hiddenStateOf = (animation: DialogAnimationType) => DIALOG_HIDDEN_STATE[animation];

export const Dialog: React.FC<DialogProps> = ({
  visible,
  title,
  children,
  footer,
  openAnimation = 'fade',
  closeAnimation = 'fade',
  animationDuration = 250,
  dismissable = true,
  onRequestClose,
  onClosed,
  styles,
  palette,
  accessibilityLabel,
  testID,
}) => {
  const resolved = useDialogStyles({ styles, palette });
  const [mounted, setMounted] = useState(visible);

  const opacity = useRef(new Animated.Value(hiddenStateOf(openAnimation).opacity)).current;
  const translateY = useRef(new Animated.Value(hiddenStateOf(openAnimation).translateY)).current;
  const scale = useRef(new Animated.Value(hiddenStateOf(openAnimation).scale)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const isUnmounted = useRef(false);

  useEffect(
    () => () => {
      isUnmounted.current = true;
    },
    []
  );

  // Driven only by `visible` toggling — this imperatively reads the latest
  // animation/prop values on each transition rather than depending on them,
  // since including `mounted` (which this effect itself sets) would restart
  // the animation on every setState.
  useEffect(() => {
    if (visible) {
      setMounted(true);
      const hidden = hiddenStateOf(openAnimation);
      opacity.setValue(hidden.opacity);
      translateY.setValue(hidden.translateY);
      scale.setValue(hidden.scale);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: DIALOG_IDENTITY_STATE.opacity,
          duration: animationDuration,
          useNativeDriver: false,
        }),
        Animated.timing(translateY, {
          toValue: DIALOG_IDENTITY_STATE.translateY,
          duration: animationDuration,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: DIALOG_IDENTITY_STATE.scale,
          duration: animationDuration,
          useNativeDriver: false,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (mounted) {
      const hidden = hiddenStateOf(closeAnimation);

      Animated.parallel([
        Animated.timing(opacity, { toValue: hidden.opacity, duration: animationDuration, useNativeDriver: false }),
        Animated.timing(translateY, {
          toValue: hidden.translateY,
          duration: animationDuration,
          useNativeDriver: false,
        }),
        Animated.timing(scale, { toValue: hidden.scale, duration: animationDuration, useNativeDriver: false }),
        Animated.timing(backdropOpacity, { toValue: 0, duration: animationDuration, useNativeDriver: false }),
      ]).start(({ finished }) => {
        if (finished && !isUnmounted.current) {
          setMounted(false);
          onClosed?.();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!mounted) {
    return null;
  }

  const handleRequestClose = () => {
    if (dismissable) {
      onRequestClose?.();
    }
  };

  return (
    <Modal transparent visible={mounted} animationType="none" onRequestClose={handleRequestClose} testID={testID}>
      <Animated.View style={[resolved.backdrop, { opacity: backdropOpacity }]}>
        <Pressable
          style={resolved.backdropPress}
          onPress={handleRequestClose}
          disabled={!dismissable}
          testID={testID ? `${testID}_backdrop` : undefined}
          accessibilityLabel="Dismiss dialog"
        />
        <Pressable onPress={() => undefined} testID={testID ? `${testID}_card` : undefined}>
          <Animated.View
            style={[resolved.root, { opacity, transform: [{ translateY }, { scale }] }]}
            accessibilityViewIsModal
            accessibilityLabel={accessibilityLabel ?? title}
            testID={testID ? `${testID}_content` : undefined}
          >
            {title ? (
              <View style={resolved.header} testID={testID ? `${testID}_header` : undefined}>
                <Text style={resolved.title}>{title}</Text>
              </View>
            ) : null}
            <View style={resolved.body} testID={testID ? `${testID}_body` : undefined}>
              {children}
            </View>
            {footer ? (
              <View style={resolved.footer} testID={testID ? `${testID}_footer` : undefined}>
                {footer}
              </View>
            ) : null}
          </Animated.View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;
