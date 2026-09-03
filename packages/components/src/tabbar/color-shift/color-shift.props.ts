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

const COLOR_SHIFT_TABBAR_DEFAULTS: ColorShiftTabbarProps = {
  morebuttonlabel: 'more',
};

/** Merge caller props with Color Shift Tabbar defaults. */
export function createColorShiftTabbarProps(partial?: ColorShiftTabbarProps): ColorShiftTabbarProps {
  return { ...COLOR_SHIFT_TABBAR_DEFAULTS, ...partial };
}
