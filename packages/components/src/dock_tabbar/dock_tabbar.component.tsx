import React, { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Mask, Path, Rect } from 'react-native-svg';
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
 * A decorative notch is cut into the top edge above slot 0 — a shallow wide
 * dip inset clear of the corner radius, plus a small dot nested inside it
 * (not one plain semicircle, which distorts the corner). The dip is a true
 * cutout via an SVG mask; the dot is a solid shape painted in `barFill`
 * (matching the source design, which shows it opaque regardless of
 * backdrop), so it is never affected by the dip's transparency/color. Both
 * are currently fixed to slot 0 regardless of `activeIndex` — whether it
 * should track the active tab instead was unverified against the source
 * design and is called out as an open question in this widget's
 * introducing PR.
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

  const isTransparentNotch = resolved.palette.notchColor === 'transparent';

  // The dip is inset to start exactly where the corner radius sweep ends, so
  // it never overlaps/distorts the rounded corner. The dot is centered at
  // dipMidX (the dip curve's deepest point) and nested inside that depth
  // (see TRA-14), so it overlaps the dip's cutout region — giving it
  // contrast as a barFill-colored accent against a non-white backdrop —
  // while staying inset from the dip's own edges so the two still read as
  // distinct shapes rather than merging into one.
  const dipLeft = resolved.barRadius;
  const dipRight = resolved.barRadius + resolved.notchDipWidth;
  const dipMidX = (dipLeft + dipRight) / 2;
  const dipControlY = resolved.notchDipDepth * 2;
  const dipPath = `M ${dipLeft} 0 Q ${dipMidX} ${dipControlY} ${dipRight} 0 Z`;
  const dotCenterX = dipMidX;
  const dotCenterY = resolved.notchDipDepth / 2;

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
                <Path d={dipPath} fill="#000000" />
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
          {!isTransparentNotch ? <Path d={dipPath} fill={resolved.palette.notchColor} /> : null}
          <Circle cx={dotCenterX} cy={dotCenterY} r={resolved.notchDotRadius} fill={resolved.palette.notchDotColor} />
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
