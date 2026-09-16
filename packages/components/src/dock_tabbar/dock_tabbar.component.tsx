import React, { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Mask, Rect } from 'react-native-svg';
import { createDockTabbarProps, type DockTabbarProps } from './dock_tabbar.props';
import { useDockTabbarStyles } from './use-dock_tabbar-styles';

/**
 * Dock Tabbar — a single floating white pill, 358x64dp with a 32dp (full
 * height/2) radius and no drop shadow. Five icon-only tabs are spaced evenly
 * across it; the active tab renders its glyph filled/solid in the brand
 * accent color, inactive tabs render outline/stroked in muted grey. There is
 * no active pill background — the filled glyph + color is the only active
 * indicator.
 *
 * A decorative semicircular notch is cut into the top edge above slot 0. It
 * is a true cutout (not a painted shape) via an SVG mask, and is currently
 * fixed to slot 0 regardless of `activeIndex` — whether it should track the
 * active tab instead was unverified against the source design and is called
 * out as an open question in this widget's introducing PR.
 *
 * `classname` is declared for the Studio wrapper/metadata layer, matching
 * the WaveMaker widget contract — resolving a class name needs a runtime
 * this standalone package intentionally doesn't depend on, so it stays
 * unwired here.
 */
export function DockTabbar(partial: DockTabbarProps) {
  const props = createDockTabbarProps(partial);
  const {
    accessibilityLabel,
    activeIndex,
    disabled = false,
    items,
    name,
    show = true,
    styles,
    testID,
    onChange,
    onLongPress,
    onTap,
  } = props;

  const resolved = useDockTabbarStyles({ disabled, styles });
  const maskId = `dock-tabbar-notch-mask-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  if (!show) {
    return null;
  }

  const slotWidth = resolved.barWidth / items.length;
  const notchCenterX = slotWidth / 2;
  const isTransparentNotch = resolved.palette.notchColor === 'transparent';

  const handlePress = (index: number) => {
    if (disabled) {
      return;
    }
    onTap?.();
    onChange?.(index);
  };

  const handleLongPress = (index: number) => {
    if (disabled) {
      return;
    }
    onLongPress?.(index);
  };

  return (
    <View style={resolved.root} testID={testID} accessibilityLabel={accessibilityLabel ?? name}>
      <View style={resolved.barSurface}>
        <Svg
          width={resolved.barWidth}
          height={resolved.barHeight}
          viewBox={`0 0 ${resolved.barWidth} ${resolved.barHeight}`}
          style={resolved.notchIndicator}
        >
          {isTransparentNotch ? (
            <Defs>
              <Mask id={maskId}>
                <Rect
                  x={0}
                  y={0}
                  width={resolved.barWidth}
                  height={resolved.barHeight}
                  rx={resolved.barRadius}
                  ry={resolved.barRadius}
                  fill="#FFFFFF"
                />
                <Circle cx={notchCenterX} cy={0} r={resolved.notchRadius} fill="#000000" />
              </Mask>
            </Defs>
          ) : null}
          <Rect
            x={0}
            y={0}
            width={resolved.barWidth}
            height={resolved.barHeight}
            rx={resolved.barRadius}
            ry={resolved.barRadius}
            fill={resolved.palette.barFill}
            mask={isTransparentNotch ? `url(#${maskId})` : undefined}
          />
          {!isTransparentNotch ? (
            <Circle
              cx={notchCenterX}
              cy={0}
              r={resolved.notchRadius}
              fill={resolved.palette.notchColor}
            />
          ) : null}
        </Svg>
        {items.map((item, index) => {
          const active = index === activeIndex;
          const itemLabel = item.accessibilityLabel ?? `Tab ${index + 1}`;
          const color = active ? resolved.palette.activeIconColor : resolved.palette.inactiveIconColor;

          return (
            <Pressable
              key={index}
              style={resolved.tabItem}
              disabled={disabled}
              accessibilityRole="tab"
              aria-selected={active}
              accessibilityLabel={itemLabel}
              testID={testID ? `${testID}_item_${index}` : undefined}
              onPress={() => handlePress(index)}
              onLongPress={() => handleLongPress(index)}
            >
              <View style={resolved.iconGlyph}>
                {item.icon({ size: resolved.iconSize, color, active })}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

DockTabbar.displayName = 'DockTabbar';

export default DockTabbar;
