import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { StyleSheet } from 'react-native';
import { useDockTabbarStyles } from '../../src/dock_tabbar/use-dock_tabbar-styles';
import {
  DOCK_TABBAR_BAR_HEIGHT,
  DOCK_TABBAR_BAR_RADIUS,
  DOCK_TABBAR_BAR_WIDTH,
  DOCK_TABBAR_DEFAULT_PALETTE,
  DOCK_TABBAR_DISABLED_OPACITY,
  DOCK_TABBAR_ICON_SIZE,
  DOCK_TABBAR_LABEL_MARGIN_TOP,
} from '../../src/dock_tabbar/dock_tabbar.styles';

const flatten = (style: unknown) => StyleSheet.flatten(style as never) as Record<string, unknown>;

describe('useDockTabbarStyles', () => {
  it('resolves the default metrics and palette', () => {
    const { result } = renderHook(() => useDockTabbarStyles({ disabled: false }));
    const barSurface = flatten(result.current.barSurface);
    expect(barSurface.width).toBe(DOCK_TABBAR_BAR_WIDTH);
    expect(barSurface.height).toBe(DOCK_TABBAR_BAR_HEIGHT);
    expect(barSurface.borderRadius).toBe(DOCK_TABBAR_BAR_RADIUS);
    expect(barSurface.opacity).toBeUndefined();
    expect(result.current.palette).toEqual(DOCK_TABBAR_DEFAULT_PALETTE);
    expect(result.current.iconSize).toBe(DOCK_TABBAR_ICON_SIZE);
  });

  it('dims the bar surface when disabled', () => {
    const { result } = renderHook(() => useDockTabbarStyles({ disabled: true }));
    const barSurface = flatten(result.current.barSurface);
    expect(barSurface.opacity).toBe(DOCK_TABBAR_DISABLED_OPACITY);
  });

  it('merges caller style overrides on top of the defaults', () => {
    const { result } = renderHook(() =>
      useDockTabbarStyles({
        disabled: false,
        styles: { barSurface: { borderRadius: 999 }, tabItem: { marginHorizontal: 4 } },
      })
    );
    const barSurface = flatten(result.current.barSurface);
    const tabItem = flatten(result.current.tabItem);
    expect(barSurface.borderRadius).toBe(999);
    expect(barSurface.width).toBe(DOCK_TABBAR_BAR_WIDTH);
    expect(tabItem.marginHorizontal).toBe(4);
  });

  it('defaults the notch dot color to activeIconColor when dotColor is not provided', () => {
    const { result } = renderHook(() => useDockTabbarStyles({ disabled: false }));
    expect(result.current.palette.notchDotColor).toBe(DOCK_TABBAR_DEFAULT_PALETTE.activeIconColor);
  });

  it('lets dotColor override the default notch dot color', () => {
    const { result } = renderHook(() => useDockTabbarStyles({ disabled: false, dotColor: '#FF3B30' }));
    expect(result.current.palette.notchDotColor).toBe('#FF3B30');
    // Overriding the dot color leaves the rest of the palette untouched.
    expect(result.current.palette.barFill).toBe(DOCK_TABBAR_DEFAULT_PALETTE.barFill);
  });

  it('resolves the default label margin and merges caller overrides', () => {
    const { result } = renderHook(() => useDockTabbarStyles({ disabled: false }));
    expect(flatten(result.current.label).marginTop).toBe(DOCK_TABBAR_LABEL_MARGIN_TOP);

    const { result: overridden } = renderHook(() =>
      useDockTabbarStyles({ disabled: false, styles: { label: { marginTop: 6 } } })
    );
    expect(flatten(overridden.current.label).marginTop).toBe(6);
  });
});
