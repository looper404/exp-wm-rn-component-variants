import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { TabbarIconPalette } from './tabbar-icon-palette';
/** Caller override for one or both icon tints; merged over a variant's defaults. */
export type TabbarIconPaletteProp = Partial<TabbarIconPalette>;
/** Merge a variant's base view style with a caller override, if any. */
export declare function mergeViewStyle(base: StyleProp<ViewStyle>, override?: StyleProp<ViewStyle>): StyleProp<ViewStyle>;
/** Merge a variant's base text style with a caller override, if any. */
export declare function mergeTextStyle(base: StyleProp<TextStyle>, override?: StyleProp<TextStyle>): StyleProp<TextStyle>;
/** Merge a variant's default icon palette with a caller's partial override. */
export declare function resolveIconPalette(defaults: TabbarIconPalette, override?: TabbarIconPaletteProp): TabbarIconPalette;
//# sourceMappingURL=tabbar-style-utils.d.ts.map