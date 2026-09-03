import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig, type Plugin } from "vite";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // react-docgen's Flow parser chokes on react-native 0.82's TypeScript source
  // (`} as ReactNativePublicAPI;`) when it follows components' `react-native`
  // imports. Controls come from the manual `argTypes` in each meta.tsx, so
  // auto prop-table docgen isn't needed. See STRUCTURE.md.
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE_PATH || "/",
      // Both tsconfigs set `jsx: "react-native"`, which esbuild reads as the
      // CLASSIC runtime — it emits `React.createElement` without importing
      // React, so every story blew up with "React is not defined" at render.
      // Force the automatic runtime for stories and component sources alike.
      esbuild: {
        jsx: "automatic",
        jsxImportSource: "react",
      },
      resolve: {
        extensions: [
          ".web.mjs",
          ".web.js",
          ".web.jsx",
          ".web.ts",
          ".web.tsx",
          ".mjs",
          ".js",
          ".mts",
          ".ts",
          ".jsx",
          ".tsx",
          ".json",
        ],
        alias: {
          "@wavemaker/rn-components/tabbar": path.resolve(
            __dirname,
            "../../packages/components/src/tabbar"
          ),
          "@wavemaker/rn-components": path.resolve(__dirname, "../../packages/components/src"),
          "@stories": path.resolve(__dirname, "../stories"),
          "expo-linear-gradient": path.resolve(__dirname, "./shims/expo-linear-gradient.js"),
          "expo-font": path.resolve(__dirname, "./shims/expo-font.js"),
          "react-native-animatable": path.resolve(
            __dirname,
            "./shims/react-native-animatable.js"
          ),
          "react-native-reanimated": path.resolve(
            __dirname,
            "./shims/react-native-reanimated.js"
          ),
          "react-native-worklets": path.resolve(__dirname, "./shims/react-native-worklets.js"),
          buffer: path.resolve(__dirname, "../node_modules/buffer"),
          // app-rn-runtime (bundled via the tabbar stories) imports lodash,
          // which lives only in this storybook's node_modules (not an ancestor
          // of ../../packages) — resolve it absolutely.
          "lodash-es": path.resolve(__dirname, "../node_modules/lodash-es"),
          lodash: path.resolve(__dirname, "../node_modules/lodash"),
          "react-native/Libraries/Utilities/codegenNativeComponent": path.resolve(
            __dirname,
            "./shims/codegenNativeComponent.js"
          ),
          "react-native/Libraries/Pressability/PressabilityDebug": path.resolve(
            __dirname,
            "./shims/PressabilityDebug.js"
          ),
          // Web-only aliases must be absolute: this storybook's node_modules is
          // not an ancestor of ../../packages, so bare specifiers wouldn't
          // resolve from the component source.
          "react-native": path.resolve(__dirname, "../node_modules/react-native-web"),
          "react-native/Libraries/Image/AssetRegistry": path.resolve(
            __dirname,
            "../node_modules/react-native-web/dist/modules/AssetRegistry"
          ),
          // react-native-svg's resolveAssetUri imports getAssetByID from this
          // Flow-typed RN 0.82 package; RN-web's AssetRegistry exposes the same
          // API, so alias it to avoid bundling Flow syntax rollup can't parse.
          "@react-native/assets-registry/registry": path.resolve(
            __dirname,
            "../node_modules/react-native-web/dist/modules/AssetRegistry"
          ),
        },
      },
      optimizeDeps: {
        include: [
          "react-native-web",
          "react-native-svg",
          "buffer",
          "lodash",
          "lodash-es",
          "react-native-safe-area-context",
        ],
        esbuildOptions: {
          loader: { ".js": "jsx" },
          resolveExtensions: [
            ".web.js",
            ".web.jsx",
            ".web.ts",
            ".web.tsx",
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ],
        },
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
        __DEV__: JSON.stringify(true),
      },
      server: {
        fs: {
          allow: [".."],
        },
      },
      plugins: [
        {
          name: "wm-rn-jsx-in-node-modules",
          enforce: "pre",
          async transform(code, id) {
            if (!id.includes("node_modules") || !id.endsWith(".js")) return null;
            if (!/<[A-Za-z][\w-]*[\s/>]/.test(code)) return null;
            if (
              !/node_modules\/(@wavemaker\/app-rn-runtime|react-native-animatable|expo-|@expo\/)/.test(
                id
              )
            ) {
              return null;
            }
            const esbuild = await import("esbuild");
            const result = await esbuild.transform(code, {
              loader: "jsx",
              jsx: "automatic",
              format: "esm",
            });
            return { code: result.code, map: null };
          },
        } satisfies Plugin,
      ],
    });
  },
};

export default config;
