import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/** `styles` map for {@link DockTabbar}: region keys → React Native style objects. */
export type DockTabbarStylesProp = {
  barSurface?: StyleProp<ViewStyle>;
  tabsRow?: StyleProp<ViewStyle>;
  tabItem?: StyleProp<ViewStyle>;
  iconSlot?: StyleProp<ViewStyle>;
  tabLabel?: StyleProp<TextStyle>;
  activeTabLabel?: StyleProp<TextStyle>;
  activePill?: StyleProp<ViewStyle>;
};

/** Non-style values this design feeds to its SVG. */
export type DockTabbarLayoutProp = {
  barFill?: string;
};
