import React from "react";
import { View } from "react-native";

/** Storybook shim — no native worklets; enough for WmTabbar + StickyWrapper. */
export function useSharedValue(initial) {
  const ref = React.useRef({ value: initial });
  return ref.current;
}

export function useAnimatedStyle(updater) {
  try {
    return updater();
  } catch {
    return {};
  }
}

export function useAnimatedScrollHandler(handlers) {
  return (event) => {
    handlers?.onScroll?.(event);
  };
}

export function runOnJS(fn) {
  return (...args) => fn(...args);
}

export function withTiming(value) {
  return value;
}

export function makeMutable(value) {
  return { value };
}

export function cancelAnimation() {}

export const Easing = { linear: (t) => t };

const Animated = {
  View,
  createAnimatedComponent: (Component) => Component,
};

export default Animated;
