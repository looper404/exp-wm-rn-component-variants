import { StyleSheet } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { SampleButtonSize } from './sample_button.props';

/** Region-level style overrides accepted by `SampleButton`, merged as `[default, override]`. */
export interface SampleButtonStylesProp {
  root?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
  icon?: StyleProp<ViewStyle>;
  badge?: StyleProp<ViewStyle>;
  badgeText?: StyleProp<TextStyle>;
}

export interface SampleButtonPaletteEntry {
  background: string;
  text: string;
  border: string;
}

export interface SampleButtonPalette {
  filled: SampleButtonPaletteEntry;
  outlined: SampleButtonPaletteEntry;
  text: SampleButtonPaletteEntry;
  disabled: SampleButtonPaletteEntry;
}

export const SAMPLE_BUTTON_DEFAULT_PALETTE: SampleButtonPalette = {
  filled: { background: '#2563eb', text: '#ffffff', border: '#2563eb' },
  outlined: { background: 'transparent', text: '#2563eb', border: '#2563eb' },
  text: { background: 'transparent', text: '#2563eb', border: 'transparent' },
  disabled: { background: '#e2e8f0', text: '#94a3b8', border: '#e2e8f0' },
};

interface SampleButtonSizeMetrics {
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  iconSize: number;
  gap: number;
}

export const SAMPLE_BUTTON_SIZE_METRICS: Record<SampleButtonSize, SampleButtonSizeMetrics> = {
  small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 13, iconSize: 14, gap: 6 },
  medium: { paddingVertical: 10, paddingHorizontal: 16, fontSize: 15, iconSize: 16, gap: 8 },
  large: { paddingVertical: 14, paddingHorizontal: 20, fontSize: 17, iconSize: 20, gap: 10 },
};

export const sampleButtonStyles = StyleSheet.create({
  root: {
    position: 'relative',
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentIconTop: {
    flexDirection: 'column',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
});
