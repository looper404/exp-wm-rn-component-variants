import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar, type DockTabbarProps } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

/**
 * `DockTabbar` itself has no transition — its `show` prop mounts/unmounts
 * the bar instantly. The widget's original auto-generated candidate (see
 * `.widget-studio/dock/`) assumed a "fade" entrance/exit motion that was
 * never verified against a real story. This wraps the widget in the fade a
 * host screen would typically apply so that assumption can be reviewed —
 * it does not add a transition to the widget itself.
 */
function AnimatedDock({ show = true, ...props }: DockTabbarProps) {
  const opacity = useRef(new Animated.Value(show ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: show ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [show, opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <DockTabbar {...props} show />
    </Animated.View>
  );
}

const meta = {
  title: 'dock_tabbar/DockTabbar/motion',
  component: AnimatedDock,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0, onChange: fn(), show: true },
  argTypes: {
    show: { control: 'boolean' },
    items: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Toggle `show` in Controls to fade the dock in/out over 220ms. Demonstrates a candidate entrance/exit motion for a host screen wrapping the widget — the widget itself stays a plain instant mount/unmount.',
      },
    },
  },
} satisfies Meta<typeof AnimatedDock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fades in on mount; toggle `show` in Controls to fade out/back in. */
export const FadeInOut: Story = {};
