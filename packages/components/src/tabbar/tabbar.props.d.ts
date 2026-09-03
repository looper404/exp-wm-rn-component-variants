import type { ColorShiftTabbarProps } from './color-shift';
/** Ids of every tabbar design registered in this package, in registration order. */
export declare const TABBAR_VARIANTS: readonly ["color-shift-tabbar"];
/** A registered tabbar design id — matches the `id` in its design spec. */
export type TabbarVariantId = (typeof TABBAR_VARIANTS)[number];
/** Union of every variant's own props type. Extend with `|` as each variant is added. */
export type TabbarVariantProps = ColorShiftTabbarProps;
//# sourceMappingURL=tabbar.props.d.ts.map