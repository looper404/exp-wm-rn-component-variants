import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      '**/build/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/storybook-static/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      'packages/*/src/**/*.{ts,tsx}',
      // The WMX package ships source from components/ rather than src/.
      'packages/wmx-components/components/**/*.{ts,tsx}',
    ],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Library code: the runtime provides React globally via JSX transform.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // The WMX wrappers are a bridge layer over `@wavemaker/app-rn-runtime`:
    // they subclass generic runtime widgets (`WmCarousel<D>`,
    // `WmCarouselProps<D>`), so `any` appears as a generic default mirroring
    // those bases, and they export HOC results / anonymous variant-dispatching
    // components, which `react/display-name` flags despite being correct.
    files: ['packages/wmx-components/components/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react/display-name': 'off',
    },
  },
  prettier
);
