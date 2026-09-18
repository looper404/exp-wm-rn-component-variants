import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { AllStyle } from '@wavemaker-ai/app-rn-runtime/styles/theme';
import {
  BaseComponent,
  BaseComponentState,
  BaseProps,
  BaseStyles,
} from '@wavemaker-ai/app-rn-runtime/core/base.component';
import WmIcon from '@wavemaker-ai/app-rn-runtime/components/basic/icon/icon.component';
import type { WmIconStyles } from '@wavemaker-ai/app-rn-runtime/components/basic/icon/icon.styles';
import WmLabel from '@wavemaker-ai/app-rn-runtime/components/basic/label/label.component';
import type { WmLabelStyles } from '@wavemaker-ai/app-rn-runtime/components/basic/label/label.styles';
import { DockTabbar } from '@wavemaker/rn-components/dock_tabbar';
import type { DockTabbarItem } from '@wavemaker/rn-components/dock_tabbar';

export const DEFAULT_CLASS = 'app-dock-tabbar';

export type WmDockTabbarStyles = BaseStyles & {
  barSurface: AllStyle;
  tabItem: AllStyle;
  iconGlyph: AllStyle;
  label: AllStyle;
  notchIndicator: AllStyle;
  icon: WmIconStyles;
  itemLabel: WmLabelStyles;
};

/**
 * DockTabbar is fixed at 5 slots (DOCK_TABBAR_ITEM_COUNT), so Studio's static
 * prop schema exposes each slot as its own flat
 * item<N>iconclass/item<N>iconurl/item<N>label prop rather than a dataset
 * binding. `item<N>label` doubles as the tab's visible label text (rendered
 * below its icon) and its accessibility label.
 */
export class WmDockTabbarProps extends BaseProps {
  activeindex?: number;
  dotcolor?: string;
  accessibilitylabel?: string;
  item1iconclass?: string;
  item1iconurl?: string;
  item1label?: string;
  item2iconclass?: string;
  item2iconurl?: string;
  item2label?: string;
  item3iconclass?: string;
  item3iconurl?: string;
  item3label?: string;
  item4iconclass?: string;
  item4iconurl?: string;
  item4label?: string;
  item5iconclass?: string;
  item5iconurl?: string;
  item5label?: string;
  // No native event object is available (DockTabbar's own onChange/onLongPress
  // /onTap all fire without one), unlike most runtime widgets' ($event,
  // instance) callback shape.
  onChange?: (instance: WmDockTabbar, activeIndex: number) => unknown;
  onItemLongPress?: (instance: WmDockTabbar, index: number) => unknown;
  onTap?: (instance: WmDockTabbar) => unknown;
}

export class WmDockTabbarState extends BaseComponentState<WmDockTabbarProps> {}

/**
 * Studio widget wrapping the standalone @wavemaker/rn-components DockTabbar —
 * a floating 5-tab bottom bar with an active-tab notch indicator.
 */
export default class WmDockTabbar extends BaseComponent<
  WmDockTabbarProps,
  WmDockTabbarState,
  WmDockTabbarStyles
> {
  constructor(props: WmDockTabbarProps) {
    super(props, DEFAULT_CLASS, new WmDockTabbarProps());
  }

  renderWidget(props: WmDockTabbarProps) {
    const itemProps = [
      { iconclass: props.item1iconclass, iconurl: props.item1iconurl, label: props.item1label },
      { iconclass: props.item2iconclass, iconurl: props.item2iconurl, label: props.item2label },
      { iconclass: props.item3iconclass, iconurl: props.item3iconurl, label: props.item3label },
      { iconclass: props.item4iconclass, iconurl: props.item4iconurl, label: props.item4label },
      { iconclass: props.item5iconclass, iconurl: props.item5iconurl, label: props.item5label },
    ];

    const items: DockTabbarItem[] = itemProps.map((item, index) => ({
      accessibilityLabel: item.label,
      icon: ({ size }) => (
        <WmIcon
          id={this.getTestId(`item_${index}_icon`)}
          styles={this.styles.icon}
          name={`${props.name}_item_${index}_icon`}
          iconclass={item.iconclass}
          iconurl={item.iconurl}
          iconsize={size}
          accessible={false}
        />
      ),
      label: item.label
        ? () => (
            <WmLabel
              id={this.getTestId(`item_${index}_label`)}
              styles={this.styles.itemLabel}
              name={`${props.name}_item_${index}_label`}
              caption={item.label}
              accessible={false}
            />
          )
        : undefined,
    }));

    return (
      <DockTabbar
        testID={this.getTestId()}
        name={props.name ?? DEFAULT_CLASS}
        items={items}
        activeIndex={props.activeindex ?? 0}
        disabled={props.disabled}
        dotColor={props.dotcolor}
        accessibilityLabel={props.accessibilitylabel}
        // this.styles.* are typed against the react-native copy nested inside
        // @wavemaker-ai/app-rn-runtime's own node_modules, which can diverge
        // from the workspace's top-level react-native (the one
        // DockTabbarStylesProp is typed against) — same shape at runtime,
        // different nominal types.
        styles={{
          root: this.styles.root as unknown as StyleProp<ViewStyle>,
          barSurface: this.styles.barSurface as unknown as StyleProp<ViewStyle>,
          tabItem: this.styles.tabItem as unknown as StyleProp<ViewStyle>,
          iconGlyph: this.styles.iconGlyph as unknown as StyleProp<ViewStyle>,
          label: this.styles.label as unknown as StyleProp<ViewStyle>,
          notchIndicator: this.styles.notchIndicator as unknown as StyleProp<ViewStyle>,
        }}
        onChange={(index) => this.invokeEventCallback('onChange', [this, index])}
        onLongPress={(index) => this.invokeEventCallback('onItemLongPress', [this, index])}
        onTap={() => this.invokeEventCallback('onTap', [this])}
      />
    );
  }
}
