import { describe, expect, it, vi } from 'vitest';

// react-native-svg's own dependency chain pulls in a Flow-typed react-native
// entrypoint that Vitest's CJS interop can't parse; this test only needs the
// props factory, so stub the module rather than exercise that path.
vi.mock('react-native-svg', () => ({
  __esModule: true,
  default: () => null,
  Rect: () => null,
  Circle: () => null,
  Path: () => null,
  Defs: () => null,
  Mask: () => null,
}));

import { createDockTabbarProps } from '../../src/dock_tabbar';

const items = [
  { icon: () => null },
  { icon: () => null },
  { icon: () => null },
  { icon: () => null },
  { icon: () => null },
];

describe('createDockTabbarProps', () => {
  it('returns sensible defaults', () => {
    expect(createDockTabbarProps({ activeIndex: 0, items, name: 'dockTabbar1' })).toEqual({
      activeIndex: 0,
      items,
      name: 'dockTabbar1',
      show: true,
      disabled: false,
    });
  });

  it('lets overrides win over defaults', () => {
    const props = createDockTabbarProps({
      activeIndex: 2,
      items,
      name: 'dockTabbar1',
      show: false,
      disabled: true,
    });
    expect(props.show).toBe(false);
    expect(props.disabled).toBe(true);
    expect(props.activeIndex).toBe(2);
  });
});
