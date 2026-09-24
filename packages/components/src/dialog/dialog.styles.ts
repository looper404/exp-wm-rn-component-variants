import { StyleSheet } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/** Region-level style overrides accepted by `Dialog`, merged as `[default, override]`. */
export interface DialogStylesProp {
  backdrop?: StyleProp<ViewStyle>;
  root?: StyleProp<ViewStyle>;
  header?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  body?: StyleProp<ViewStyle>;
  footer?: StyleProp<ViewStyle>;
}

export interface DialogPalette {
  backdrop: string;
  background: string;
  title: string;
  border: string;
}

export const DIALOG_DEFAULT_PALETTE: DialogPalette = {
  backdrop: 'rgba(15, 23, 42, 0.5)',
  background: '#ffffff',
  title: '#0f172a',
  border: '#e2e8f0',
};

export interface DialogAnimationPhaseState {
  opacity: number;
  translateX: number;
  translateY: number;
  scale: number;
}

/**
 * The collapsed/off-screen `{ opacity, translateX, translateY, scale }` a dialog
 * animates from (opening) or to (closing) for each animation type.
 * `DIALOG_IDENTITY_STATE` is the fully-visible state both directions converge
 * on/diverge from.
 */
export const DIALOG_HIDDEN_STATE: Record<
  'fade' | 'slide' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce' | 'none',
  DialogAnimationPhaseState
> = {
  fade: { opacity: 0, translateX: 0, translateY: 0, scale: 1 },
  // Bottom-sheet style entrance — the most common mobile dialog animation.
  slide: { opacity: 1, translateX: 0, translateY: 320, scale: 1 },
  // Banner/notification style entrance from the top edge.
  slideDown: { opacity: 1, translateX: 0, translateY: -320, scale: 1 },
  // Side-panel style entrance sliding in from the right edge.
  slideLeft: { opacity: 1, translateX: 320, translateY: 0, scale: 1 },
  // Side-panel style entrance sliding in from the left edge.
  slideRight: { opacity: 1, translateX: -320, translateY: 0, scale: 1 },
  scale: { opacity: 0, translateX: 0, translateY: 0, scale: 0.85 },
  // Playful pop-in driven by a spring rather than a timing curve — overshoots
  // past the identity scale before settling, like iOS/Material success alerts.
  bounce: { opacity: 0, translateX: 0, translateY: 0, scale: 0.5 },
  none: { opacity: 1, translateX: 0, translateY: 0, scale: 1 },
};

export const DIALOG_IDENTITY_STATE: DialogAnimationPhaseState = {
  opacity: 1,
  translateX: 0,
  translateY: 0,
  scale: 1,
};

/**
 * Animation types that animate via `Animated.spring` (overshoot/settle)
 * instead of `Animated.timing` (linear/eased duration curve).
 */
export const DIALOG_SPRING_ANIMATIONS: ReadonlySet<string> = new Set(['bounce']);

/** Scale a `genie`-animated dialog collapses to at its point of origin. */
export const DIALOG_GENIE_COLLAPSED_SCALE = 0.05;

export const dialogStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  backdropPress: {
    ...StyleSheet.absoluteFillObject,
  },
  root: {
    width: '100%',
    maxWidth: 480,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
});
