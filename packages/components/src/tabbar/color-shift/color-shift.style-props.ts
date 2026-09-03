import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/** `styles` map for {@link ColorShiftTabbar}: region keys → React Native style objects. */
export type ColorShiftTabbarStylesProp = {
  shell?: StyleProp<ViewStyle>;
  barSurface?: StyleProp<ViewStyle>;
  tabsRow?: StyleProp<ViewStyle>;
  tabItem?: StyleProp<ViewStyle>;
  iconSlot?: StyleProp<ViewStyle>;
  tabLabel?: StyleProp<TextStyle>;
  activeTabLabel?: StyleProp<TextStyle>;
};

/** Non-style values this design feeds to its SVG. */
export type ColorShiftTabbarLayoutProp = {
  barFill?: string;
  accent?: string;
};
