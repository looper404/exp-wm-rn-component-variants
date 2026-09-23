import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { DockTabbar, type DockTabbarProps } from '@wavemaker/rn-components/dock_tabbar';
import { demoItems } from './icons';

/**
 * `DockTabbar` owns `activeIndex` as a controlled prop — tapping a tab only
 * moves the notch once the host updates `activeIndex` from `onChange`, so
 * this wrapper does that with local state (the `activeIndex` and `onChange`
 * stories cover the controlled prop and the raw event in isolation; this one
 * demonstrates them wired together, the way a real host screen would). Once
 * `activeIndex` changes, the widget slides its own decorative notch (dip +
 * dot) horizontally to the newly active slot itself — see
 * `dock_tabbar.component.tsx`'s `slideValue` animation; no host-side
 * animation is needed for that part.
 */
function InteractiveDock(props: DockTabbarProps) {
  const [activeIndex, setActiveIndex] = useState(props.activeIndex);

  return (
    <DockTabbar
      {...props}
      activeIndex={activeIndex}
      onChange={(index) => {
        setActiveIndex(index);
        props.onChange?.(index);
      }}
    />
  );
}

const meta = {
  title: 'dock_tabbar/DockTabbar/slide',
  component: InteractiveDock,
  args: { name: 'dockTabbar1', items: demoItems, activeIndex: 0, onChange: fn() },
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0, max: 4, step: 1 } },
    items: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: 'Tap any tab: it becomes active and the notch slides horizontally to sit above it.',
      },
    },
  },
} satisfies Meta<typeof InteractiveDock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tap a tab — it becomes active and the notch slides to it. */
export const SlideToTappedTab: Story = {};
