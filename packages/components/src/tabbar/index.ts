// Tabbar family barrel. Each variant re-exports its component, props factory,
// prop/style types and generated API manifest; add the new entries here (and
// to the variant map below) when a variant is added.
import { DockTabbar } from './dock';

export {
  DockTabbar,
  createDockTabbarProps,
  type DockTabbarProps,
  type DockTabbarEvents,
  type DockTabbarStylesProp,
  type DockTabbarLayoutProp,
  DOCK_TABBAR_CLASS,
  DOCK_TABBAR_ICON_PALETTE,
} from './dock';

export { TABBAR_VARIANTS, type TabbarVariant, type TabbarVariantProps } from './tabbar.props';
export type { TabbarWidgetProps, TabbarNavItem } from './shared/tabbar-types';
export type { TabbarIconPalette } from './shared/tabbar-icon-palette';

/** Variant id → component, for code that renders whichever variant is configured. */
export const TABBAR_VARIANT_COMPONENTS = {
  'dock-tabbar': DockTabbar,
} as const;
