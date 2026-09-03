import type { ComponentType } from 'react';
import { ColorShiftTabbar } from './color-shift';
import type { TabbarVariantId, TabbarVariantProps } from './tabbar.props';

export {
  ColorShiftTabbar,
  createColorShiftTabbarProps,
  type ColorShiftTabbarProps,
  type ColorShiftTabbarStylesProp,
  type ColorShiftTabbarLayoutProp,
  COLOR_SHIFT_TABBAR_CLASS,
  COLOR_SHIFT_TABBAR_ICON_PALETTE,
} from './color-shift';

export { TABBAR_VARIANTS, type TabbarVariantId, type TabbarVariantProps } from './tabbar.props';

/**
 * Every registered variant's component, keyed by its design id, for generic
 * dispatch by id. `Record<TabbarVariantId, ...>` means TS itself rejects a
 * variant added to `TABBAR_VARIANTS` without a matching entry here (or vice
 * versa) — each variant takes its own prop type, so the map is intentionally
 * loose on props.
 */
export const TABBAR_VARIANT_COMPONENTS: Record<TabbarVariantId, ComponentType<TabbarVariantProps>> = {
  'color-shift-tabbar': ColorShiftTabbar,
};
