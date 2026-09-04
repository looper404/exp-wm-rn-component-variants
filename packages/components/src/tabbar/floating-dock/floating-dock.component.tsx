import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createFloatingDockTabbarProps, type FloatingDockTabbarProps } from './floating-dock.props';
import { useFloatingDockTabbarResolvedStyles } from './use-floating-dock-styles';
import { FLOATING_DOCK_TABBAR_DISABLED_OPACITY, FLOATING_DOCK_TABBAR_ICON_SIZE } from './floating-dock.styles';
import { getDefaultTabbarNavItem } from '../shared/tabbar-types';
import { TabbarGlyph } from '../shared/tabbar-icons';

/**
 * Floating Dock Tabbar — a dark, fully rounded pill that floats over the
 * screen with margin on every side, no notch or cutout. Five evenly spaced
 * tabs each show an icon and a label; the active tab's icon sits inside a
 * rounded-rectangle bubble, and its label turns the design's accent green
 * while every inactive icon/label shares one muted gray. No badges are drawn.
 *
 * This design has no overflow menu, so `maxvisibleitems`, `morebuttoniconclass`
 * and the `onMoreClick`/`onMoreItemClick` events stay declared and unwired —
 * nothing in this layout can fire them. `classname` and the
 * `itemicon`/`itemlabel`/`itembadge`/`itemlink` dataset-field selectors are
 * likewise declared for the Studio wrapper/metadata layer: resolving a class
 * name, an expression, or an icon-font class needs a runtime this standalone
 * package intentionally doesn't depend on. `dataset`, when supplied, still
 * drives the tab count and is handed back as the `item` payload on every
 * event.
 */
export function FloatingDockTabbar(partial?: FloatingDockTabbarProps) {
  const props = createFloatingDockTabbarProps(partial);
  const { styles, iconPalette } = useFloatingDockTabbarResolvedStyles(
    props.styles,
    props.iconPalette
  );
  const insets = useSafeAreaInsets();

  if (props.show === false) {
    return null;
  }

  const dataset = props.dataset;
  const count = dataset ? dataset.length : props.numberOfItems ?? 5;
  const activeIndex = props.activeIndex ?? 0;

  return (
    <View style={[styles.shell, { paddingBottom: insets.bottom }]} testID={props.name}>
      <View style={styles.barSurface}>
        <View style={styles.tabsRow}>
          {Array.from({ length: count }, (_, index) => {
            const active = index === activeIndex;
            const item = dataset?.[index];
            const defaults = getDefaultTabbarNavItem(index);
            const label = props.getLabel?.(index) ?? defaults.label;
            const iconColor = active ? props.activeAccentColor : iconPalette.inactive;

            return (
              <Pressable
                key={index}
                accessibilityRole="tab"
                accessibilityState={{ selected: active, disabled: props.disabled }}
                accessibilityLabel={label}
                disabled={props.disabled}
                style={[styles.tabItem, props.disabled && { opacity: FLOATING_DOCK_TABBAR_DISABLED_OPACITY }]}
                onPress={() => {
                  props.onItemClick?.(index, item);
                  props.onItemSelect?.(index, item);
                }}
                onLongPress={() => props.onLongPress?.(index, item)}
              >
                <View
                  style={
                    active
                      ? [styles.iconSlot, styles.activeBubble, { backgroundColor: props.activeBubbleColor }]
                      : styles.iconSlot
                  }
                >
                  {props.getIcon?.(index, active) ?? (
                    <TabbarGlyph
                      name={defaults.glyph}
                      size={FLOATING_DOCK_TABBAR_ICON_SIZE}
                      color={iconColor ?? iconPalette.inactive}
                      filled={active}
                    />
                  )}
                </View>
                {props.showLabels !== false && (
                  <Text style={active ? styles.activeTabLabel : styles.tabLabel}>{label}</Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default FloatingDockTabbar;
