import type { FloatingDockTabbarProps } from './floating-dock';

/** Every tabbar variant id this family currently ships. */
export const TABBAR_VARIANTS = ['floating-dock-tabbar'] as const;

export type TabbarVariant = (typeof TABBAR_VARIANTS)[number];

/** Union of every variant's own props, for code that dispatches on `variant`. */
export type TabbarVariantProps = FloatingDockTabbarProps;
