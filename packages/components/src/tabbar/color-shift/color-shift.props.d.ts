import type { TabbarWidgetProps } from '../shared/tabbar-types';
import type { TabbarIconPaletteProp } from '../shared/tabbar-style-utils';
import type { ColorShiftTabbarStylesProp, ColorShiftTabbarLayoutProp } from './color-shift.style-props';
export type { ColorShiftTabbarStylesProp, ColorShiftTabbarLayoutProp } from './color-shift.style-props';
/** Color Shift Tabbar — `Partial<TabbarWidgetProps>` plus this design's own overrides. */
export type ColorShiftTabbarProps = Partial<TabbarWidgetProps> & {
    styles?: ColorShiftTabbarStylesProp;
    layout?: ColorShiftTabbarLayoutProp;
    iconPalette?: TabbarIconPaletteProp;
};
/** Merge caller props with Color Shift Tabbar defaults. */
export declare function createColorShiftTabbarProps(partial?: ColorShiftTabbarProps): ColorShiftTabbarProps;
//# sourceMappingURL=color-shift.props.d.ts.map