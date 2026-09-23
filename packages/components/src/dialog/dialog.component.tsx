import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import type { DialogAnimationType, DialogProps } from './dialog.props';
import { DIALOG_HIDDEN_STATE, DIALOG_IDENTITY_STATE, DIALOG_SPRING_ANIMATIONS } from './dialog.styles';
import { useDialogStyles } from './use-dialog-styles';

const hiddenStateOf = (animation: DialogAnimationType) => DIALOG_HIDDEN_STATE[animation];

/** `bounce` overshoots via a spring; every other animation eases over `duration`. */
const animateTo = (value: Animated.Value, toValue: number, animation: DialogAnimationType, duration: number) =>
  DIALOG_SPRING_ANIMATIONS.has(animation)
    ? Animated.spring(value, { toValue, useNativeDriver: false, friction: 5, tension: 40 })
    : Animated.timing(value, { toValue, duration, useNativeDriver: false });

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
  const translateX = useRef(new Animated.Value(hiddenStateOf(openAnimation).translateX)).current;
  const translateY = useRef(new Animated.Value(hiddenStateOf(openAnimation).translateY)).current;
  const scale = useRef(new Animated.Value(hiddenStateOf(openAnimation).scale)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const isUnmounted = useRef(false);
  const isClosing = useRef(false);

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
      if (!isClosing.current) {
        // Only snap to the hidden pose on a clean open (i.e. not reopening
        // while the close animation is still in flight) — otherwise this
        // would force a visible jump to fully-hidden before animating back
        // in, instead of continuing smoothly from the current values.
        const hidden = hiddenStateOf(openAnimation);
        opacity.setValue(hidden.opacity);
        translateX.setValue(hidden.translateX);
        translateY.setValue(hidden.translateY);
        scale.setValue(hidden.scale);
        backdropOpacity.setValue(0);
      }
      isClosing.current = false;

      Animated.parallel([
        animateTo(opacity, DIALOG_IDENTITY_STATE.opacity, openAnimation, animationDuration),
        animateTo(translateX, DIALOG_IDENTITY_STATE.translateX, openAnimation, animationDuration),
        animateTo(translateY, DIALOG_IDENTITY_STATE.translateY, openAnimation, animationDuration),
        animateTo(scale, DIALOG_IDENTITY_STATE.scale, openAnimation, animationDuration),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: false,
        }),
      ]).start();
    } else if (mounted) {
      isClosing.current = true;
      const hidden = hiddenStateOf(closeAnimation);

      Animated.parallel([
        animateTo(opacity, hidden.opacity, closeAnimation, animationDuration),
        animateTo(translateX, hidden.translateX, closeAnimation, animationDuration),
        animateTo(translateY, hidden.translateY, closeAnimation, animationDuration),
        animateTo(scale, hidden.scale, closeAnimation, animationDuration),
        Animated.timing(backdropOpacity, { toValue: 0, duration: animationDuration, useNativeDriver: false }),
      ]).start(({ finished }) => {
        if (finished && !isUnmounted.current) {
          isClosing.current = false;
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
            style={[resolved.root, { opacity, transform: [{ translateX }, { translateY }, { scale }] }]}
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
