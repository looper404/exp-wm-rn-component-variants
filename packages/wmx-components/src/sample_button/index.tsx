import React from 'react';
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
        styles={{
          root: this.styles.root,
          content: this.styles.content,
          text: this.styles.text,
          badge: this.styles.badge,
        }}
      />
    );
  }
}
