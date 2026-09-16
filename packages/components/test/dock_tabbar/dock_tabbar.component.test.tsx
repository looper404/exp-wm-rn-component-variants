import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Text } from 'react-native';

// react-native-svg's own dependency chain pulls in a Flow-typed react-native
// entrypoint that Vitest's CJS interop can't parse; the notch cutout it draws
// is a visual concern verified via Storybook, not this logic-level suite, so
// stub the module instead.
vi.mock('react-native-svg', () => ({
  __esModule: true,
  default: () => null,
  Rect: () => null,
  Circle: () => null,
  Defs: () => null,
  Mask: () => null,
}));

import { DockTabbar } from '../../src/dock_tabbar';
import type { DockTabbarItem } from '../../src/dock_tabbar';
import { DOCK_TABBAR_DEFAULT_PALETTE } from '../../src/dock_tabbar';

const makeItems = (): DockTabbarItem[] =>
  Array.from({ length: 5 }, (_, index) => ({
    icon: ({ color }) => <Text testID={`glyph_${index}`}>{color}</Text>,
  }));

describe('DockTabbar', () => {
  it('renders exactly 5 tabs', () => {
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={makeItems()} />);
    expect(screen.getAllByRole('tab')).toHaveLength(5);
  });

  it('falls back to Tab N as the accessibility label per item', () => {
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={makeItems()} />);
    expect(screen.getByLabelText('Tab 1')).toBeTruthy();
    expect(screen.getByLabelText('Tab 5')).toBeTruthy();
  });

  it('lets an explicit item accessibilityLabel win over the Tab N fallback', () => {
    const items = makeItems();
    items[0] = { ...items[0], accessibilityLabel: 'Home' };
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={items} />);
    expect(screen.getByLabelText('Home')).toBeTruthy();
    expect(screen.queryByLabelText('Tab 1')).toBeNull();
  });

  it('renders the active glyph filled with activeIconColor and others with inactiveIconColor', () => {
    render(<DockTabbar name="dockTabbar1" activeIndex={2} items={makeItems()} />);
    expect(screen.getByTestId('glyph_2').textContent).toBe(DOCK_TABBAR_DEFAULT_PALETTE.activeIconColor);
    expect(screen.getByTestId('glyph_0').textContent).toBe(DOCK_TABBAR_DEFAULT_PALETTE.inactiveIconColor);
    expect(screen.getByTestId('glyph_4').textContent).toBe(DOCK_TABBAR_DEFAULT_PALETTE.inactiveIconColor);
  });

  it('marks only the active tab as selected', () => {
    render(<DockTabbar name="dockTabbar1" activeIndex={1} items={makeItems()} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
  });

  it('fires onChange with the tapped index', () => {
    const onChange = vi.fn();
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={makeItems()} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole('tab')[3]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('fires onTap on any tap on the widget', () => {
    const onTap = vi.fn();
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={makeItems()} onTap={onTap} />);
    fireEvent.click(screen.getAllByRole('tab')[0]);
    fireEvent.click(screen.getAllByRole('tab')[4]);
    expect(onTap).toHaveBeenCalledTimes(2);
  });

  it('does not fire onChange or onTap when disabled', () => {
    const onChange = vi.fn();
    const onTap = vi.fn();
    render(
      <DockTabbar
        name="dockTabbar1"
        activeIndex={0}
        items={makeItems()}
        disabled
        onChange={onChange}
        onTap={onTap}
      />
    );
    fireEvent.click(screen.getAllByRole('tab')[1]);
    expect(onChange).not.toHaveBeenCalled();
    expect(onTap).not.toHaveBeenCalled();
  });

  // `onLongPress` is wired straight to Pressable's own prop (same as every
  // other widget in this package) — its timed gesture recognition is
  // react-native-web's own Responder System, which doesn't reliably fire in
  // jsdom via synthetic pointer events. Verified manually via Storybook
  // instead of simulated here.

  it('renders nothing when show is false', () => {
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={makeItems()} show={false} testID="dock" />);
    expect(screen.queryByTestId('dock')).toBeNull();
  });

  it('forwards testID to the root and derives per-item testIDs', () => {
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={makeItems()} testID="dock" />);
    expect(screen.getByTestId('dock')).toBeTruthy();
    expect(screen.getByTestId('dock_item_0')).toBeTruthy();
    expect(screen.getByTestId('dock_item_4')).toBeTruthy();
  });

  it('uses name as the default accessibility label', () => {
    render(<DockTabbar name="dockTabbar1" activeIndex={0} items={makeItems()} testID="dock" />);
    expect(screen.getByTestId('dock').getAttribute('aria-label')).toBe('dockTabbar1');
  });
});
