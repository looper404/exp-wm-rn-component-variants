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

interface DialogAnimationPhaseState {
  opacity: number;
  translateY: number;
  scale: number;
}

/**
 * The collapsed/off-screen `{ opacity, translateY, scale }` a dialog animates
 * from (opening) or to (closing) for each animation type. `DIALOG_IDENTITY_STATE`
 * is the fully-visible state both directions converge on/diverge from.
 */
export const DIALOG_HIDDEN_STATE: Record<'fade' | 'slide' | 'scale' | 'none', DialogAnimationPhaseState> = {
  fade: { opacity: 0, translateY: 0, scale: 1 },
  slide: { opacity: 1, translateY: 320, scale: 1 },
  scale: { opacity: 0, translateY: 0, scale: 0.85 },
  none: { opacity: 1, translateY: 0, scale: 1 },
};

export const DIALOG_IDENTITY_STATE: DialogAnimationPhaseState = { opacity: 1, translateY: 0, scale: 1 };

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
