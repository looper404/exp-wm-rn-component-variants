import { defineConfig } from 'vitest/config';

// Tests render React Native components through react-native-web, matching how
// the Storybook host renders them. Any bare `react-native` import resolves to
// the web implementation.
export default defineConfig({
  // Component sources are compiled with `jsx: react-native`, which esbuild
  // reads as the classic runtime — that emits `React.createElement` calls with
  // no React import. Force the automatic runtime so sources and tests can use
  // JSX without importing React, exactly as they do under Storybook's builder.
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    // `packages/components` carries its own react/react-dom devDeps, so a bare
    // `react` import from a component source would load a second copy and blow
    // up the hooks dispatcher. Pin every import to the root copy.
    dedupe: ['react', 'react-dom'],
    // react-native-web ships its exports under the "react-native" condition.
    conditions: ['react-native', 'browser', 'import', 'default'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['packages/*/test/**/*.{test,spec}.{ts,tsx}'],
  },
});
