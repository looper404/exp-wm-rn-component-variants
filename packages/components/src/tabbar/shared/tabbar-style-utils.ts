import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { TabbarIconPalette } from './tabbar-icon-palette';

/** Caller override for one or both icon tints; merged over a variant's defaults. */
export type TabbarIconPaletteProp = Partial<TabbarIconPalette>;

/** Merge a variant's base view style with a caller override, if any. */
export function mergeViewStyle(
  base: StyleProp<ViewStyle>,
  override?: StyleProp<ViewStyle>
): StyleProp<ViewStyle> {
  return override ? [base, override] : base;
}

/** Merge a variant's base text style with a caller override, if any. */
export function mergeTextStyle(
  base: StyleProp<TextStyle>,
  override?: StyleProp<TextStyle>
): StyleProp<TextStyle> {
  return override ? [base, override] : base;
}

/** Merge a variant's default icon palette with a caller's partial override. */
export function resolveIconPalette(
  defaults: TabbarIconPalette,
  override?: TabbarIconPaletteProp
): TabbarIconPalette {
  return { ...defaults, ...override };
}
