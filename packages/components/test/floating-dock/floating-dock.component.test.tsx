import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingDockTabbar } from '../../src/tabbar/floating-dock';

// react-native-svg's native entry point pulls in codegen helpers that assume
// a real react-native runtime; that isn't resolvable through the
// react-native-web alias this suite runs under. The default icon
// (`TabbarGlyph`, see ../../src/tabbar/shared/tabbar-icons.tsx) only ever
// draws `Svg`/`Path`/`Circle`, so a minimal stub is enough to let the
// component render through its real default-icon path. vitest hoists this
// above the import above, so the mock is in place before it resolves.
vi.mock('react-native-svg', () => {
  const stub = (tag: string) =>
    function Stub(props: Record<string, unknown>) {
      return React.createElement(tag, props, (props as { children?: React.ReactNode }).children);
    };
  const Svg = stub('svg-stub');
  return { __esModule: true, default: Svg, Svg, Path: stub('path-stub'), Circle: stub('circle-stub') };
});

// Same story for react-native-safe-area-context: its native entry point
// needs a real device to report insets from. The component only reads
// `useSafeAreaInsets` to pad the shell for a device notch, which doesn't
// matter for these behavioural assertions, so a zero-inset stub stands in.
vi.mock('react-native-safe-area-context', () => ({
  __esModule: true,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe('FloatingDockTabbar', () => {
  it('renders the design’s curated 5-item set with a label under each icon', () => {
    render(<FloatingDockTabbar />);
    expect(screen.getAllByRole('tab')).toHaveLength(5);
    for (const label of ['Home', 'Explore', 'Saved', 'Profile', 'Settings']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('marks only the active tab as selected', () => {
    render(<FloatingDockTabbar activeIndex={2} />);
    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab, index) => {
      expect(tab.getAttribute('aria-selected')).toBe(String(index === 2));
    });
  });

  it('renders one tab per dataset item and hands the item back on click', () => {
    const dataset = [{ label: 'Cart' }, { label: 'Wallet' }, { label: 'Alerts' }];
    const onItemClick = vi.fn();
    const onItemSelect = vi.fn();
    render(
      <FloatingDockTabbar
        dataset={dataset}
        getLabel={(index) => dataset[index].label}
        onItemClick={onItemClick}
        onItemSelect={onItemSelect}
      />
    );

    expect(screen.getAllByRole('tab')).toHaveLength(3);
    fireEvent.click(screen.getByText('Wallet'));
    expect(onItemClick).toHaveBeenCalledWith(1, dataset[1]);
    expect(onItemSelect).toHaveBeenCalledWith(1, dataset[1]);
  });

  it('hides labels when showLabels is false', () => {
    render(<FloatingDockTabbar showLabels={false} />);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('draws no badge for any tab', () => {
    render(<FloatingDockTabbar />);
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it('disables every tab and marks that state for assistive tech', () => {
    render(<FloatingDockTabbar disabled />);
    for (const tab of screen.getAllByRole('tab')) {
      expect(tab.getAttribute('aria-disabled')).toBe('true');
    }
  });

  it('renders nothing when show is false', () => {
    const { container } = render(<FloatingDockTabbar show={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('lets a caller override the icon without touching the default glyphs', () => {
    render(<FloatingDockTabbar getIcon={(index) => <>icon-{index}</>} />);
    expect(screen.getByText('icon-0')).toBeInTheDocument();
  });
});
