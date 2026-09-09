import { describe, expect, it } from 'vitest';
import { createSampleButtonProps } from '../../src/sample_button';

describe('createSampleButtonProps', () => {
  it('returns sensible defaults', () => {
    expect(createSampleButtonProps()).toEqual({
      caption: 'Sample Button',
      variant: 'filled',
      size: 'medium',
      iconPosition: 'left',
      disabled: false,
      loading: false,
      fullWidth: false,
    });
  });

  it('lets overrides win over defaults', () => {
    const props = createSampleButtonProps({ caption: 'Save', variant: 'outlined', disabled: true });
    expect(props.caption).toBe('Save');
    expect(props.variant).toBe('outlined');
    expect(props.disabled).toBe(true);
    expect(props.size).toBe('medium');
  });
});
