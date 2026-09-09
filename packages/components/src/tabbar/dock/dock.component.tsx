import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDockTabbarProps, type DockTabbarProps } from './dock.props';
import { useDockTabbarResolvedStyles } from './use-dock-styles';
import { DOCK_TABBAR_DISABLED_OPACITY, DOCK_TABBAR_ICON_SIZE } from './dock.styles';
import { getDefaultTabbarNavItem } from '../shared/tabbar-types';
import { TabbarGlyph } from '../shared/tabbar-icons';

/**
 * Dock Tabbar — a single fully-rounded white pill that floats above the
 * screen edge with visible margin on both sides and a flat drop shadow
 * separating it from the background. Five icon-only tabs (no labels) are
 * spaced evenly across it; the active tab's icon sits on a filled pill-shaped
 * background, with no vertical lift and no notch or cutout in the bar itself.
 *
 * This design has no overflow menu, so `maxvisibleitems`, `morebuttoniconclass`
 * and the `onMoreClick`/`onMoreItemClick` events stay declared and unwired —
 * nothing in this layout can fire them. `classname` and the
 * `itemicon`/`itemlabel`/`itembadge`/`itemlink` dataset-field selectors are
 * likewise declared for the Studio wrapper/metadata layer: resolving a class
 * name, an expression, or an icon-font class needs a runtime this standalone
 * package intentionally doesn't depend on. `dataset`, when supplied, still
 * drives the tab count and is handed back as the `item` payload on every
 * event. `getLabel` stays declared too — there's nowhere in this icon-only
 * layout to draw a label — but it is still called so a bound label reaches
 * `accessibilityLabel`.
 */
export function DockTabbar(partial?: DockTabbarProps) {
  const props = createDockTabbarProps(partial);
  const { styles, iconPalette } = useDockTabbarResolvedStyles(
    props.styles,
    props.iconPalette,
    props.layout
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
      <View style={styles.barContainer}>
        <View style={styles.barSurface}>
          <View style={styles.tabsRow}>
            {Array.from({ length: count }, (_, index) => {
              const active = index === activeIndex;
              const item = dataset?.[index];
              const defaults = getDefaultTabbarNavItem(index);
              const label = props.getLabel?.(index) ?? defaults.label;

              return (
                <Pressable
                  key={index}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active, disabled: props.disabled }}
                  accessibilityLabel={label}
                  disabled={props.disabled}
                  style={[styles.tabItem, props.disabled && { opacity: DOCK_TABBAR_DISABLED_OPACITY }]}
                  onPress={() => {
                    props.onItemClick?.(index, item);
                    props.onItemSelect?.(index, item);
                  }}
                  onLongPress={() => props.onLongPress?.(index, item)}
                >
                  <View style={active ? [styles.iconSlot, styles.activePill] : styles.iconSlot}>
                    {props.getIcon?.(index, active) ?? (
                      <TabbarGlyph
                        name={defaults.glyph}
                        size={DOCK_TABBAR_ICON_SIZE}
                        color={active ? iconPalette.active : iconPalette.inactive}
                        filled={active}
                      />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

export default DockTabbar;
