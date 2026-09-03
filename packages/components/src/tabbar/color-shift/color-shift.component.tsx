import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createColorShiftTabbarProps, type ColorShiftTabbarProps } from './color-shift.props';
import { useColorShiftTabbarResolvedStyles } from './use-color-shift-styles';
import { COLOR_SHIFT_TABBAR_ICON_SIZE } from './color-shift.styles';
import { getDefaultTabbarNavItem } from '../shared/tabbar-types';
import { TabbarGlyph } from '../shared/tabbar-icons';

/**
 * Color Shift Tabbar — a plain rounded-rectangle bar with five evenly spaced
 * tabs (Home, Explore, Saved, Profile, Settings by default). The active tab
 * carries no pill, bubble, or lift — it is shown purely by tinting its icon
 * and label with the accent colour, with the icon switching from outline to
 * filled.
 */
export function ColorShiftTabbar(partial?: ColorShiftTabbarProps) {
  const props = createColorShiftTabbarProps(partial);
  const { styles, iconPalette, layout } = useColorShiftTabbarResolvedStyles(
    props.styles,
    props.iconPalette,
    props.layout
  );
  const insets = useSafeAreaInsets();
  const count = props.numberOfItems ?? 5;
  const activeIndex = props.activeIndex ?? 0;

  return (
    <View style={[styles.shell, { paddingBottom: insets.bottom }]}>
      <View style={[styles.barSurface, { backgroundColor: layout.barFill }]}>
        <View style={styles.tabsRow}>
          {Array.from({ length: count }, (_, index) => {
            const active = index === activeIndex;
            const item = getDefaultTabbarNavItem(index);
            const label = props.getLabel?.(index) ?? item.label;
            return (
              <Pressable
                key={index}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                accessibilityLabel={label}
                style={styles.tabItem}
                onPress={() => props.onItemClick?.(index)}
              >
                <View style={styles.iconSlot}>
                  {props.getIcon?.(index, active) ?? (
                    <TabbarGlyph
                      name={item.glyph}
                      size={COLOR_SHIFT_TABBAR_ICON_SIZE}
                      color={active ? iconPalette.active : iconPalette.inactive}
                      filled={active}
                    />
                  )}
                </View>
                <Text style={active ? [styles.activeTabLabel, { color: layout.accent }] : styles.tabLabel}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default ColorShiftTabbar;
