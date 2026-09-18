import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      // react-native-svg's resolveAssetUri imports getAssetByID from this
      // Flow-typed RN package; rollup/esbuild can't parse its Flow syntax, and
      // react-native-web's AssetRegistry exposes the same API. Mirrors the
      // same alias in storybook/.storybook/main.ts.
      '@react-native/assets-registry/registry': 'react-native-web/dist/modules/AssetRegistry',
      // Same reasoning: this Fabric-only codegen helper doesn't exist under
      // react-native-web and its real source can't be parsed by esbuild.
      'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(
        __dirname,
        'test/shims/codegenNativeComponent.ts'
      ),
    },
    // `packages/components` carries its own react/react-dom devDeps, so a bare
    // `react` import from a component source would load a second copy and blow
    // up the hooks dispatcher. Pin every import to the root copy.
    dedupe: ['react', 'react-dom'],
    // react-native-web ships its exports under the "react-native" condition.
    conditions: ['react-native', 'browser', 'import', 'default'],
    // react-native-svg ships separate `*.web.js` implementations for its
    // internal relative imports (e.g. `ReactNativeSVG.web.js`); without these
    // extensions first, plain `.js` resolution picks the native entrypoint.
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['packages/*/test/**/*.{test,spec}.{ts,tsx}'],
  },
});
