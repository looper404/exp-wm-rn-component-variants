import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Text } from 'react-native';
import { Dialog } from '../../src/dialog';

describe('Dialog', () => {
  it('renders nothing when not visible', () => {
    render(
      <Dialog visible={false} testID="confirm-dialog">
        <Text>Body</Text>
      </Dialog>
    );
    expect(screen.queryByTestId('confirm-dialog')).toBeNull();
  });

  it('renders the title, body and footer when visible', () => {
    render(
      <Dialog visible title="Delete item?" footer={<Text>Actions</Text>} testID="confirm-dialog">
        <Text>This cannot be undone.</Text>
      </Dialog>
    );
    expect(screen.getByText('Delete item?')).toBeTruthy();
    expect(screen.getByText('This cannot be undone.')).toBeTruthy();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  it('uses the title as the default accessibility label', () => {
    render(<Dialog visible title="Delete item?" testID="confirm-dialog" />);
    expect(screen.getByTestId('confirm-dialog_content').getAttribute('aria-label')).toBe('Delete item?');
  });

  it('lets an explicit accessibilityLabel win over the title', () => {
    render(<Dialog visible title="Delete item?" accessibilityLabel="Confirm deletion" testID="confirm-dialog" />);
    expect(screen.getByTestId('confirm-dialog_content').getAttribute('aria-label')).toBe('Confirm deletion');
  });

  it('fires onRequestClose when the backdrop is pressed', () => {
    const onRequestClose = vi.fn();
    render(<Dialog visible onRequestClose={onRequestClose} testID="confirm-dialog" />);
    fireEvent.click(screen.getByTestId('confirm-dialog_backdrop'));
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('does not fire onRequestClose on backdrop press when dismissable is false', () => {
    const onRequestClose = vi.fn();
    render(<Dialog visible dismissable={false} onRequestClose={onRequestClose} testID="confirm-dialog" />);
    fireEvent.click(screen.getByTestId('confirm-dialog_backdrop'));
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('does not fire onRequestClose when the card itself is pressed', () => {
    const onRequestClose = vi.fn();
    render(<Dialog visible title="Delete item?" onRequestClose={onRequestClose} testID="confirm-dialog" />);
    fireEvent.click(screen.getByTestId('confirm-dialog_card'));
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('unmounts and calls onClosed once the close animation finishes', () => {
    const onClosed = vi.fn();
    const { rerender } = render(<Dialog visible onClosed={onClosed} testID="confirm-dialog" />);
    expect(screen.getByTestId('confirm-dialog')).toBeTruthy();

    rerender(<Dialog visible={false} onClosed={onClosed} testID="confirm-dialog" />);
    expect(onClosed).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('confirm-dialog')).toBeNull();
  });

  it.each(['fade', 'slide', 'scale', 'none'] as const)(
    'opens and closes with the %s animation type',
    (animation) => {
      const { rerender } = render(
        <Dialog visible openAnimation={animation} closeAnimation={animation} testID="confirm-dialog" />
      );
      expect(screen.getByTestId('confirm-dialog')).toBeTruthy();

      rerender(
        <Dialog visible={false} openAnimation={animation} closeAnimation={animation} testID="confirm-dialog" />
      );
      expect(screen.queryByTestId('confirm-dialog')).toBeNull();
    }
  );

  it('supports different animation types for opening and closing', () => {
    const { rerender } = render(
      <Dialog visible openAnimation="scale" closeAnimation="slide" testID="confirm-dialog" />
    );
    expect(screen.getByTestId('confirm-dialog')).toBeTruthy();
    rerender(<Dialog visible={false} openAnimation="scale" closeAnimation="slide" testID="confirm-dialog" />);
    expect(screen.queryByTestId('confirm-dialog')).toBeNull();
  });

  it('forwards testID to header, body, and footer regions', () => {
    render(
      <Dialog visible title="Delete item?" footer={<Text>Actions</Text>} testID="confirm-dialog">
        <Text>Body</Text>
      </Dialog>
    );
    expect(screen.getByTestId('confirm-dialog_header')).toBeTruthy();
    expect(screen.getByTestId('confirm-dialog_body')).toBeTruthy();
    expect(screen.getByTestId('confirm-dialog_footer')).toBeTruthy();
  });

  it('renders no header/footer regions when title/footer are omitted', () => {
    render(<Dialog visible testID="confirm-dialog" />);
    expect(screen.queryByTestId('confirm-dialog_header')).toBeNull();
    expect(screen.queryByTestId('confirm-dialog_footer')).toBeNull();
  });
});
