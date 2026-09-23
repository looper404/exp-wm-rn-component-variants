import { describe, expect, it } from 'vitest';
import { createDialogProps } from '../../src/dialog';

describe('createDialogProps', () => {
  it('returns sensible defaults', () => {
    expect(createDialogProps()).toEqual({
      visible: false,
      openAnimation: 'fade',
      closeAnimation: 'fade',
      animationDuration: 250,
      dismissable: true,
    });
  });

  it('lets overrides win over defaults', () => {
    const props = createDialogProps({
      visible: true,
      openAnimation: 'slide',
      closeAnimation: 'scale',
      dismissable: false,
    });
    expect(props.visible).toBe(true);
    expect(props.openAnimation).toBe('slide');
    expect(props.closeAnimation).toBe('scale');
    expect(props.dismissable).toBe(false);
    expect(props.animationDuration).toBe(250);
  });
});
