import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { createDockTabbarProps, type DockTabbarProps } from './dock.props';
import { useDockTabbarResolvedStyles } from './use-dock-styles';

/**
 * Dock Tab Bar — generated skeleton, filled in by hand.
 * Source design: dock-tabbar. Regenerating overwrites nothing that exists.
 */
// TODO(implementer): render 5 tabs, labels: active-only,
// active treatment: underline.
// Every event below is declared in dock.props.ts and listed in dock.api.ts.
// Wire the ones this design can fire; the rest stay declared and unused.
//   onItemClick(index: number, item?: unknown) — A tab was tapped.
//   onItemSelect(index: number, item?: unknown) — The active tab changed, however it changed.
//   onLongPress(index: number, item?: unknown) — A tab was long-pressed.
//   onMoreClick() — The overflow button was tapped.
//   onMoreItemClick(index: number, item?: unknown) — An item inside the overflow menu was tapped.
export function DockTabbar(partial?: DockTabbarProps) {
  const props = createDockTabbarProps(partial);
  const { styles, iconPalette, layout } = useDockTabbarResolvedStyles(
    props.styles,
    props.iconPalette,
    props.layout
  );
  const count = props.numberOfItems ?? 5;
  const activeIndex = props.activeIndex ?? 0;

  return (
    <View style={styles.shell}>
      <View style={styles.barSurface}>
        
        <View style={styles.tabsRow}>
          {Array.from({ length: count }, (_, index) => {
            const active = index === activeIndex;
            return (
              <Pressable
                key={index}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                style={styles.tabItem}
                onPress={() => {
                  props.onItemClick?.(index);
                  props.onItemSelect?.(index);
                }}
                onLongPress={() => props.onLongPress?.(index)}
              >
                {props.getIcon?.(index, active)}
                {active && (
                  <Text style={active ? styles.activeTabLabel : styles.tabLabel}>
                    {props.getLabel?.(index) ?? ''}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default DockTabbar;
