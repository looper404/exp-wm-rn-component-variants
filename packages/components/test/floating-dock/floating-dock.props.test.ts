import { describe, it, expect } from 'vitest';
import { createFloatingDockTabbarProps } from '../../src/tabbar/floating-dock/floating-dock.props';
import {
  FLOATING_DOCK_TABBAR_API,
  FLOATING_DOCK_TABBAR_EVENT_NAMES,
  FLOATING_DOCK_TABBAR_PROP_NAMES,
} from '../../src/tabbar/floating-dock/floating-dock.api';

/** The manifest's declared default for prop `name`, per floating-dock.api.ts. */
function manifestDefault(name: string) {
  return FLOATING_DOCK_TABBAR_API.props.find((prop) => prop.name === name)?.default;
}

describe('createFloatingDockTabbarProps', () => {
  it('applies the design defaults when nothing is passed', () => {
    const props = createFloatingDockTabbarProps();
    expect(props.activeAccentColor).toBe(manifestDefault('activeAccentColor'));
    expect(props.activeBubbleColor).toBe(manifestDefault('activeBubbleColor'));
    expect(props.activeIndex).toBe(manifestDefault('activeIndex'));
    expect(props.disabled).toBe(manifestDefault('disabled'));
    expect(props.morebuttonlabel).toBe(manifestDefault('morebuttonlabel'));
    expect(props.show).toBe(manifestDefault('show'));
    expect(props.showLabels).toBe(manifestDefault('showLabels'));
  });

  it('leaves numberOfItems unset so the component falls back to its curated 5-item set', () => {
    // The manifest's numberOfItems default (4) is the family-wide Studio
    // default. Baking it in here would shadow this design's own 5-item
    // fallback for every caller that doesn't pass the prop — see the comment
    // above FLOATING_DOCK_TABBAR_DEFAULTS in floating-dock.props.ts.
    expect(createFloatingDockTabbarProps().numberOfItems).toBeUndefined();
  });

  it('lets a caller override a default', () => {
    const props = createFloatingDockTabbarProps({ activeIndex: 2, show: false });
    expect(props.activeIndex).toBe(2);
    expect(props.show).toBe(false);
  });

  it('leaves props the design has no default for unset', () => {
    const props = createFloatingDockTabbarProps();
    expect(props.name).toBeUndefined();
    expect(props.dataset).toBeUndefined();
    expect(props.getIcon).toBeUndefined();
    expect(props.getLabel).toBeUndefined();
  });
});

describe('FLOATING_DOCK_TABBAR_API', () => {
  it('names every prop the component actually reads', () => {
    const wired = [
      'activeAccentColor',
      'activeBubbleColor',
      'activeIndex',
      'dataset',
      'disabled',
      'getIcon',
      'getLabel',
      'iconPalette',
      'name',
      'numberOfItems',
      'show',
      'showLabels',
      'styles',
    ];
    for (const propName of wired) {
      expect(FLOATING_DOCK_TABBAR_PROP_NAMES).toContain(propName);
    }
  });

  it('names every event the component actually fires', () => {
    const wired = ['onItemClick', 'onItemSelect', 'onLongPress'];
    for (const eventName of wired) {
      expect(FLOATING_DOCK_TABBAR_EVENT_NAMES).toContain(eventName);
    }
  });
});
