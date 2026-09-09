import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { View } from 'react-native';
import { SampleButton } from '../../src/sample_button';

describe('SampleButton', () => {
  it('renders the caption', () => {
    render(<SampleButton caption="Save" />);
    expect(screen.getByText('Save')).toBeTruthy();
  });

  it('renders as an accessible button', () => {
    render(<SampleButton caption="Save" />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('uses the caption as the default accessibility label', () => {
    render(<SampleButton caption="Save" testID="save-btn" />);
    expect(screen.getByTestId('save-btn').getAttribute('aria-label')).toBe('Save');
  });

  it('lets an explicit accessibilityLabel win over the caption', () => {
    render(<SampleButton caption="Save" accessibilityLabel="Save the form" testID="save-btn" />);
    expect(screen.getByTestId('save-btn').getAttribute('aria-label')).toBe('Save the form');
  });

  it('fires onPress when tapped', () => {
    const onPress = vi.fn();
    render(<SampleButton caption="Save" onPress={onPress} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = vi.fn();
    render(<SampleButton caption="Save" onPress={onPress} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not fire onPress while loading', () => {
    const onPress = vi.fn();
    render(<SampleButton caption="Save" onPress={onPress} loading />);
    fireEvent.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('replaces the caption with a spinner while loading', () => {
    render(<SampleButton caption="Save" loading testID="save-btn" />);
    expect(screen.queryByText('Save')).toBeNull();
    expect(screen.getByTestId('save-btn_loading')).toBeTruthy();
  });

  it.each(['left', 'right', 'top'] as const)('renders the icon on the %s side', (iconPosition) => {
    render(
      <SampleButton
        caption="Save"
        iconPosition={iconPosition}
        icon={() => <View testID="icon" />}
      />
    );
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByText('Save')).toBeTruthy();
  });

  it('renders icon-only when no caption is given', () => {
    render(<SampleButton icon={() => <View testID="icon" />} />);
    expect(screen.getByTestId('icon')).toBeTruthy();
  });

  it('renders no icon slot when icon is omitted', () => {
    render(<SampleButton caption="Save" />);
    expect(screen.queryByTestId('icon')).toBeNull();
  });

  it.each([1, '9+', 0])('renders a badge for badgeCount=%s', (badgeCount) => {
    render(<SampleButton caption="Save" badgeCount={badgeCount} testID="save-btn" />);
    expect(screen.getByTestId('save-btn_badge')).toBeTruthy();
    expect(screen.getByText(String(badgeCount))).toBeTruthy();
  });

  it('renders no badge when badgeCount is not set', () => {
    render(<SampleButton caption="Save" testID="save-btn" />);
    expect(screen.queryByTestId('save-btn_badge')).toBeNull();
  });

  it('forwards testID to the root element', () => {
    render(<SampleButton caption="Save" testID="save-btn" />);
    expect(screen.getByTestId('save-btn')).toBeTruthy();
  });
});
