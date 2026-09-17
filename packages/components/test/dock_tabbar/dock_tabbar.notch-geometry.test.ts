import { describe, expect, it } from 'vitest';
import {
  computeDockTabbarNotchGeometry,
  DOCK_TABBAR_BAR_RADIUS,
  DOCK_TABBAR_BAR_WIDTH,
  DOCK_TABBAR_NOTCH_DIP_DEPTH,
  DOCK_TABBAR_NOTCH_DIP_WIDTH,
} from '../../src/dock_tabbar/dock_tabbar.styles';

const geometryFor = (activeIndex: number) =>
  computeDockTabbarNotchGeometry({
    activeIndex,
    itemCount: 5,
    barWidth: DOCK_TABBAR_BAR_WIDTH,
    barRadius: DOCK_TABBAR_BAR_RADIUS,
    notchDipWidth: DOCK_TABBAR_NOTCH_DIP_WIDTH,
    notchDipDepth: DOCK_TABBAR_NOTCH_DIP_DEPTH,
  });

describe('computeDockTabbarNotchGeometry', () => {
  it('clamps slot 0 clear of the left corner radius', () => {
    const geometry = geometryFor(0);
    expect(geometry.dipLeft).toBe(DOCK_TABBAR_BAR_RADIUS);
    expect(geometry.dipRight).toBe(DOCK_TABBAR_BAR_RADIUS + DOCK_TABBAR_NOTCH_DIP_WIDTH);
  });

  it('clamps the last slot clear of the right corner radius', () => {
    const geometry = geometryFor(4);
    expect(geometry.dipRight).toBe(DOCK_TABBAR_BAR_WIDTH - DOCK_TABBAR_BAR_RADIUS);
    expect(geometry.dipLeft).toBe(DOCK_TABBAR_BAR_WIDTH - DOCK_TABBAR_BAR_RADIUS - DOCK_TABBAR_NOTCH_DIP_WIDTH);
  });

  it('centers unclamped middle slots on their own slot center', () => {
    const geometry = geometryFor(2);
    const slotWidth = DOCK_TABBAR_BAR_WIDTH / 5;
    expect(geometry.dipMidX).toBeCloseTo(slotWidth * 2.5);
  });

  it('moves the dip/dot rightward as activeIndex increases', () => {
    const first = geometryFor(0);
    const middle = geometryFor(2);
    const last = geometryFor(4);
    expect(middle.dipMidX).toBeGreaterThan(first.dipMidX);
    expect(last.dipMidX).toBeGreaterThan(middle.dipMidX);
  });

  it('keeps the dot centered on the dip', () => {
    const geometry = geometryFor(3);
    expect(geometry.dotCenterX).toBe(geometry.dipMidX);
  });
});
