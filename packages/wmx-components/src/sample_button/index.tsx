import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { BaseComponent, BaseComponentState } from '@wavemaker-ai/app-rn-runtime/core/base.component';
import WmButtonProps from '@wavemaker-ai/app-rn-runtime/components/basic/button/button.props';
import { DEFAULT_CLASS, WmButtonStyles } from '@wavemaker-ai/app-rn-runtime/components/basic/button/button.styles';
import WmIcon from '@wavemaker-ai/app-rn-runtime/components/basic/icon/icon.component';
import { SampleButton } from '@wavemaker/rn-components/sample_button';
import type { SampleButtonIconPosition } from '@wavemaker/rn-components/sample_button';

export class WmSampleButtonState extends BaseComponentState<WmButtonProps> {}

const ICON_POSITIONS: SampleButtonIconPosition[] = ['left', 'right', 'top'];

/**
 * Sample Studio widget demonstrating how to override the built-in `wm-button`
 * widget: keeps `WmButtonProps` and the `BaseComponent` lifecycle from
 * `@wavemaker/app-rn-runtime` (so it binds/behaves the same as the framework
 * widget), but renders through the standalone `@wavemaker/rn-components`
 * `SampleButton` instead of the runtime's own markup.
 */
export default class WmSampleButton extends BaseComponent<
  WmButtonProps,
  WmSampleButtonState,
  WmButtonStyles
> {
  constructor(props: WmButtonProps) {
    super(props, DEFAULT_CLASS, new WmButtonProps());
  }

  private renderIcon = ({ size, color: _color }: { size: number; color: string }) => {
    const { iconclass, iconurl, iconsize, iconheight, iconwidth, iconmargin, hint, name } =
      this.state.props;
    return (
      <WmIcon
        id={this.getTestId('icon')}
        hint={hint}
        styles={this.styles.icon}
        name={`${name}_icon`}
        iconclass={iconclass}
        iconsize={iconsize || size}
        iconurl={iconurl}
        iconheight={iconheight}
        iconmargin={iconmargin}
        iconwidth={iconwidth}
        accessible={false}
      />
    );
  };

  renderWidget(props: WmButtonProps) {
    const hasIcon = Boolean(props.iconclass || props.iconurl);
    const iconPosition = ICON_POSITIONS.includes(props.iconposition as SampleButtonIconPosition)
      ? (props.iconposition as SampleButtonIconPosition)
      : 'left';

    return (
      <SampleButton
        testID={this.getTestId()}
        caption={props.caption}
        iconPosition={iconPosition}
        icon={hasIcon ? this.renderIcon : undefined}
        badgeCount={props.badgevalue}
        disabled={props.disabled}
        accessibilityLabel={props.accessibilitylabel || props.caption}
        onPress={(event) => this.invokeEventCallback('onTap', [event, this])}
        // this.styles.* are typed against the react-native copy nested inside
        // @wavemaker-ai/app-rn-runtime's own node_modules, which can diverge
        // from the workspace's top-level react-native (the one SampleButtonProps
        // is typed against) — same shape at runtime, different nominal types.
        styles={{
          root: this.styles.root as unknown as StyleProp<ViewStyle>,
          content: this.styles.content as unknown as StyleProp<ViewStyle>,
          text: this.styles.text as unknown as StyleProp<TextStyle>,
          badge: this.styles.badge as unknown as StyleProp<ViewStyle>,
        }}
      />
    );
  }
}
