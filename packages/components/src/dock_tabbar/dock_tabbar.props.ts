import type { ReactNode } from 'react';
import type { DockTabbarStylesProp } from './dock_tabbar.styles';

export interface DockTabbarItemIconArgs {
  size: number;
  color: string;
  active: boolean;
}

export interface DockTabbarItem {
  /** Renders the item's glyph; receives the resolved size/color/active state for the current slot. */
  icon: (args: DockTabbarItemIconArgs) => ReactNode;
  /**
   * Renders the item's label below its icon; receives the slot's index. Omit
   * to render no label. The label region clips overflow at its own slot's
   * width, but for plain-text labels callers should still render with
   * `<Text numberOfLines={1} ellipsizeMode="tail">` — `DockTabbar` can't
   * impose that on an arbitrary `ReactNode`, and this prop is commonly fed
   * user- or Studio-authored strings (and i18n, where translations often run
   * longer) that can otherwise clip mid-word.
   */
  label?: (index: number) => ReactNode;
  /** Falls back to `Tab ${index + 1}` when omitted. */
  accessibilityLabel?: string;
}

export const DOCK_TABBAR_ITEM_COUNT = 5;

export interface DockTabbarProps {
  accessibilityLabel?: string;
  /** Index (0-4) of the currently selected item. */
  activeIndex: number;
  classname?: string;
  disabled?: boolean;
  /** Color of the notch dot. Defaults to the active tab's icon color (`activeIconColor`). */
  dotColor?: string;
  /** Exactly 5 entries, one per slot. */
  items: DockTabbarItem[];
  name: string;
  show?: boolean;
  styles?: DockTabbarStylesProp;
  testID?: string;
  /** Fired with the new active index when an item is tapped. */
  onChange?: (index: number) => void;
  /** Fired with the item's index when it is long-pressed. */
  onLongPress?: (index: number) => void;
  /** Fired on any tap on the widget. */
  onTap?: () => void;
}

export const createDockTabbarProps = (
  overrides: Partial<DockTabbarProps> & Pick<DockTabbarProps, 'activeIndex' | 'items' | 'name'>
): DockTabbarProps => ({
  show: true,
  disabled: false,
  ...overrides,
});
