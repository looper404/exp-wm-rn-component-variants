import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Animated, Text } from 'react-native';
import { Dialog } from '../../src/dialog';
import { DIALOG_HIDDEN_STATE } from '../../src/dialog/dialog.styles';

describe('Dialog', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it.each(['fade', 'slide', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'bounce', 'none'] as const)(
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

  it('drives the bounce animation with Animated.spring instead of Animated.timing', () => {
    const springSpy = vi.spyOn(Animated, 'spring');
    const timingSpy = vi.spyOn(Animated, 'timing');
    render(<Dialog visible openAnimation="bounce" testID="confirm-dialog" />);
    expect(springSpy).toHaveBeenCalled();
    // The backdrop always fades linearly, even when the content bounces.
    expect(timingSpy).toHaveBeenCalled();
  });

  it.each(['slideLeft', 'slideRight'] as const)(
    'animates translateX from the %s hidden pose',
    (animation) => {
      const setValueSpy = vi.spyOn(Animated.Value.prototype, 'setValue');
      render(<Dialog visible openAnimation={animation} testID="confirm-dialog" />);
      expect(setValueSpy).toHaveBeenCalledWith(DIALOG_HIDDEN_STATE[animation].translateX);
    }
  );

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

  it('does not snap animated values back to the hidden pose when reopened before the close animation finishes', () => {
    // Stub `Animated.parallel().start()` to never invoke its `finished`
    // callback, standing in for a close animation that's still in flight —
    // the mock `Animated.timing` this package's tests otherwise rely on
    // resolves synchronously, which would leave no way to observe an
    // in-progress close.
    vi.spyOn(Animated, 'parallel').mockReturnValue({
      start: () => undefined,
      stop: () => undefined,
      reset: () => undefined,
    } as unknown as Animated.CompositeAnimation);

    const { rerender } = render(<Dialog visible openAnimation="slide" closeAnimation="slide" testID="confirm-dialog" />);

    rerender(<Dialog visible={false} openAnimation="slide" closeAnimation="slide" testID="confirm-dialog" />);
    // The close animation never reports `finished` (per the stub above), so the
    // dialog stays mounted — simulating a close that's still mid-flight.
    expect(screen.getByTestId('confirm-dialog')).toBeTruthy();

    const setValueSpy = vi.spyOn(Animated.Value.prototype, 'setValue');
    rerender(<Dialog visible openAnimation="slide" closeAnimation="slide" testID="confirm-dialog" />);

    // Reopening mid-close must not snap the values back to the hidden pose
    // (translateY 320 for `slide`) — it should continue from wherever the
    // values currently are instead of flickering to fully-hidden first.
    expect(setValueSpy).not.toHaveBeenCalledWith(DIALOG_HIDDEN_STATE.slide.translateY);
  });
});
