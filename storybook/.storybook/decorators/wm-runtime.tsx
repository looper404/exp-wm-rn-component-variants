import React, { useMemo } from 'react';
import type { Decorator } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Theme, { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import { ModalProvider } from '@wavemaker/app-rn-runtime/core/modal.service';
import { NavigationServiceProvider } from '@wavemaker/app-rn-runtime/core/navigation.service';
import injector from '@wavemaker/app-rn-runtime/core/injector';

/** Minimal Wavemaker runtime context for tab bar components in Storybook web. */
export const withWmRuntime: Decorator = (Story) => {
  const navigationService = useMemo(
    () => ({
      goToPage: async () => {},
      goBack: async () => {},
      openUrl: async () => {},
    }),
    []
  );

  const modalService = useMemo(
    () => ({
      showModal: () => {},
      hideModal: () => {},
      refresh: () => {},
    }),
    []
  );

  React.useEffect(() => {
    injector.set('APP_CONFIG', {
      edgeToEdgeConfig: { isEdgeToEdgeApp: false },
    });
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={Theme}>
        <NavigationServiceProvider value={navigationService}>
          <ModalProvider value={modalService}>
            <Story />
          </ModalProvider>
        </NavigationServiceProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
