import type { ReactNode } from 'react';
import type { TabbarWidgetProps } from '../shared/tabbar-types';
import type { TabbarIconPaletteProp } from '../shared/tabbar-style-utils';
import type { FloatingDockTabbarStylesProp } from './floating-dock.style-props';

export type { FloatingDockTabbarStylesProp } from './floating-dock.style-props';

/**
 * Callbacks this variant fires. Exhaustive: the list comes from the merged
 * component API, not from whatever the implementation happens to call.
 */
export type FloatingDockTabbarEvents = {
  /** A tab was tapped. */
  onItemClick?: (index: number, item?: unknown) => void;
  /** The active tab changed, however it changed. */
  onItemSelect?: (index: number, item?: unknown) => void;
  /** A tab was long-pressed. */
  onLongPress?: (index: number, item?: unknown) => void;
  /** The overflow button was tapped. */
  onMoreClick?: () => void;
  /** An item inside the overflow menu was tapped. */
  onMoreItemClick?: (index: number, item?: unknown) => void;
};

/**
 * Floating Dock Tabbar — `Partial<TabbarWidgetProps>` plus this design's own props.
 *
 * Every member is optional here even where the API manifest marks it required:
 * "required" is a Studio property-panel constraint, and a component that throws
 * on a missing prop is worse than one that falls back. The manifest in
 * floating-dock.api.ts carries the requiredness.
 */
export type FloatingDockTabbarProps = Partial<TabbarWidgetProps> & FloatingDockTabbarEvents & {
  styles?: FloatingDockTabbarStylesProp;
  iconPalette?: TabbarIconPaletteProp;

  /** Color applied to the active tab's icon and label to distinguish it from inactive tabs. */
  activeAccentColor?: string;
  /** Background color of the rounded highlight bubble behind the active tab's icon. */
  activeBubbleColor?: string;
  /** Index of the selected tab. */
  activeIndex?: number;
  /** Extra class names merged into the root style resolution. */
  classname?: string;
  /** Items to render as tabs. Overrides numberOfItems when supplied. */
  dataset?: unknown[];
  /** Disables every tab. */
  disabled?: boolean;
  /** Render override returning a tab’s icon node. */
  getIcon?: (index: number, active: boolean) => ReactNode;
  /** Render override returning a tab’s label. */
  getLabel?: (index: number) => string;
  /** Dataset field, or expression, giving each tab its badge value. */
  itembadge?: string;
  /** Dataset field, or expression, giving each tab its icon class. */
  itemicon?: string;
  /** Dataset field, or expression, giving each tab its label. */
  itemlabel?: string;
  /** Dataset field, or expression, giving each tab its navigation target. */
  itemlink?: string;
  /** Tabs shown before the rest collapse into the overflow menu. */
  maxvisibleitems?: number;
  /** Icon class for the overflow button. */
  morebuttoniconclass?: string;
  /** Label under the overflow button. */
  morebuttonlabel?: string;
  /** Widget name, unique within the page. Required by Studio. */
  name?: string;
  /** Tab count when no dataset is bound. */
  numberOfItems?: number;
  /** Whether the tab bar renders at all. */
  show?: boolean;
  /** Show tab labels. This design draws them: all. */
  showLabels?: boolean;
};

// numberOfItems is deliberately absent here: leaving it unset lets the
// component fall back to the design's 5-item curated set (Home, Explore,
// Saved, Profile, Settings) when no dataset is bound. Baking a default in
// would shadow that fallback for every caller who doesn't pass the prop.
const FLOATING_DOCK_TABBAR_DEFAULTS: FloatingDockTabbarProps = {
  activeAccentColor: "#2DD4BF",
  activeBubbleColor: "#1E2A33",
  activeIndex: 0,
  disabled: false,
  morebuttonlabel: "more",
  show: true,
  showLabels: true,
};

/** Merge caller props with Floating Dock Tabbar defaults. */
export function createFloatingDockTabbarProps(partial?: FloatingDockTabbarProps): FloatingDockTabbarProps {
  return { ...FLOATING_DOCK_TABBAR_DEFAULTS, ...partial };
}
