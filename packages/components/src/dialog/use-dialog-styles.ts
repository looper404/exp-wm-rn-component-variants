import { useMemo } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import {
  DIALOG_DEFAULT_PALETTE,
  dialogStyles,
  type DialogPalette,
  type DialogStylesProp,
} from './dialog.styles';

interface UseDialogStylesArgs {
  styles?: DialogStylesProp;
  palette?: Partial<DialogPalette>;
}

/** Resolves the default backdrop/card colors, merged with caller style/palette overrides. */
export const useDialogStyles = ({ styles, palette }: UseDialogStylesArgs) => {
  return useMemo(() => {
    const resolvedPalette: DialogPalette = { ...DIALOG_DEFAULT_PALETTE, ...palette };

    const backdrop: StyleProp<ViewStyle> = [
      dialogStyles.backdrop,
      { backgroundColor: resolvedPalette.backdrop },
      styles?.backdrop,
    ];

    const root: StyleProp<ViewStyle> = [
      dialogStyles.root,
      { backgroundColor: resolvedPalette.background, borderColor: resolvedPalette.border },
      styles?.root,
    ];

    const title: StyleProp<TextStyle> = [dialogStyles.title, { color: resolvedPalette.title }, styles?.title];

    return {
      backdrop,
      backdropPress: dialogStyles.backdropPress,
      root,
      header: [dialogStyles.header, styles?.header] as StyleProp<ViewStyle>,
      title,
      body: [dialogStyles.body, styles?.body] as StyleProp<ViewStyle>,
      footer: [dialogStyles.footer, styles?.footer] as StyleProp<ViewStyle>,
    };
  }, [styles, palette]);
};
