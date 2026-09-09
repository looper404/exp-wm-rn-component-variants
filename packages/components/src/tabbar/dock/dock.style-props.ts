import type { StyleProp, ViewStyle } from 'react-native';

/** `styles` map for {@link DockTabbar}: region keys → React Native style objects. */
export type DockTabbarStylesProp = {
  shell?: StyleProp<ViewStyle>;
  barContainer?: StyleProp<ViewStyle>;
  barSurface?: StyleProp<ViewStyle>;
  tabsRow?: StyleProp<ViewStyle>;
  tabItem?: StyleProp<ViewStyle>;
  iconSlot?: StyleProp<ViewStyle>;
  activePill?: StyleProp<ViewStyle>;
};

/** Non-style values this design feeds to its SVG. */
export type DockTabbarLayoutProp = {
  barFill?: string;
  accent?: string;
};
