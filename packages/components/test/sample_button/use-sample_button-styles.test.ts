import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { StyleSheet } from 'react-native';
import { useSampleButtonStyles } from '../../src/sample_button/use-sample_button-styles';
import { SAMPLE_BUTTON_DEFAULT_PALETTE, SAMPLE_BUTTON_SIZE_METRICS } from '../../src/sample_button/sample_button.styles';

const flatten = (style: unknown) => StyleSheet.flatten(style as never) as Record<string, unknown>;

describe('useSampleButtonStyles', () => {
  it('resolves palette colors per variant', () => {
    (['filled', 'outlined', 'text'] as const).forEach((variant) => {
      const { result } = renderHook(() =>
        useSampleButtonStyles({ variant, size: 'medium', disabled: false, fullWidth: false })
      );
      const root = flatten(result.current.root);
      const text = flatten(result.current.text);
      expect(root.backgroundColor).toBe(SAMPLE_BUTTON_DEFAULT_PALETTE[variant].background);
      expect(root.borderColor).toBe(SAMPLE_BUTTON_DEFAULT_PALETTE[variant].border);
      expect(text.color).toBe(SAMPLE_BUTTON_DEFAULT_PALETTE[variant].text);
    });
  });

  it('falls back to the disabled palette regardless of variant', () => {
    const { result } = renderHook(() =>
      useSampleButtonStyles({ variant: 'filled', size: 'medium', disabled: true, fullWidth: false })
    );
    const root = flatten(result.current.root);
    expect(root.backgroundColor).toBe(SAMPLE_BUTTON_DEFAULT_PALETTE.disabled.background);
  });

  it('resolves size metrics', () => {
    (['small', 'medium', 'large'] as const).forEach((size) => {
      const { result } = renderHook(() =>
        useSampleButtonStyles({ variant: 'filled', size, disabled: false, fullWidth: false })
      );
      const root = flatten(result.current.root);
      const text = flatten(result.current.text);
      expect(root.paddingVertical).toBe(SAMPLE_BUTTON_SIZE_METRICS[size].paddingVertical);
      expect(root.paddingHorizontal).toBe(SAMPLE_BUTTON_SIZE_METRICS[size].paddingHorizontal);
      expect(text.fontSize).toBe(SAMPLE_BUTTON_SIZE_METRICS[size].fontSize);
      expect(result.current.iconSize).toBe(SAMPLE_BUTTON_SIZE_METRICS[size].iconSize);
    });
  });

  it('applies fullWidth stretching', () => {
    const { result: stretched } = renderHook(() =>
      useSampleButtonStyles({ variant: 'filled', size: 'medium', disabled: false, fullWidth: true })
    );
    const { result: notStretched } = renderHook(() =>
      useSampleButtonStyles({ variant: 'filled', size: 'medium', disabled: false, fullWidth: false })
    );
    expect(flatten(stretched.current.root).alignSelf).toBe('stretch');
    expect(flatten(notStretched.current.root).alignSelf).toBe('flex-start');
  });

  it('merges caller style overrides on top of the defaults', () => {
    const { result } = renderHook(() =>
      useSampleButtonStyles({
        variant: 'filled',
        size: 'medium',
        disabled: false,
        fullWidth: false,
        styles: { root: { borderRadius: 999 }, text: { fontStyle: 'italic' } },
      })
    );
    const root = flatten(result.current.root);
    const text = flatten(result.current.text);
    expect(root.borderRadius).toBe(999);
    expect(root.backgroundColor).toBe(SAMPLE_BUTTON_DEFAULT_PALETTE.filled.background);
    expect(text.fontStyle).toBe('italic');
  });

  it('lets a custom palette override the default colors', () => {
    const { result } = renderHook(() =>
      useSampleButtonStyles({
        variant: 'filled',
        size: 'medium',
        disabled: false,
        fullWidth: false,
        palette: { filled: { background: '#111111', text: '#fefefe', border: '#111111' } },
      })
    );
    const root = flatten(result.current.root);
    expect(root.backgroundColor).toBe('#111111');
  });
});
