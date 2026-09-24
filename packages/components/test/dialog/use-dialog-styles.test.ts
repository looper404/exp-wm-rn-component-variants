import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { StyleSheet } from 'react-native';
import { useDialogStyles } from '../../src/dialog/use-dialog-styles';
import { DIALOG_DEFAULT_PALETTE } from '../../src/dialog/dialog.styles';

const flatten = (style: unknown) => StyleSheet.flatten(style as never) as Record<string, unknown>;

describe('useDialogStyles', () => {
  it('resolves the default palette colors', () => {
    const { result } = renderHook(() => useDialogStyles({}));
    const backdrop = flatten(result.current.backdrop);
    const root = flatten(result.current.root);
    const title = flatten(result.current.title);
    expect(backdrop.backgroundColor).toBe(DIALOG_DEFAULT_PALETTE.backdrop);
    expect(root.backgroundColor).toBe(DIALOG_DEFAULT_PALETTE.background);
    expect(root.borderColor).toBe(DIALOG_DEFAULT_PALETTE.border);
    expect(title.color).toBe(DIALOG_DEFAULT_PALETTE.title);
  });

  it('merges caller style overrides on top of the defaults', () => {
    const { result } = renderHook(() =>
      useDialogStyles({ styles: { root: { borderRadius: 999 }, title: { fontStyle: 'italic' } } })
    );
    const root = flatten(result.current.root);
    const title = flatten(result.current.title);
    expect(root.borderRadius).toBe(999);
    expect(root.backgroundColor).toBe(DIALOG_DEFAULT_PALETTE.background);
    expect(title.fontStyle).toBe('italic');
  });

  it('lets a custom palette override the default colors', () => {
    const { result } = renderHook(() => useDialogStyles({ palette: { background: '#111111' } }));
    const root = flatten(result.current.root);
    expect(root.backgroundColor).toBe('#111111');
  });
});
