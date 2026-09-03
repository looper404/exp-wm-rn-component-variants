# @wavemaker/rn-components

Workspace for `@wavemaker/rn-components` — a single publishable npm package holding every WaveMaker React Native widget. A Storybook host renders them on the web, and the WMX workspace generates WaveMaker Studio metadata.

Run all commands from this `code/` directory.

## Packages

| Package | npm name | Description |
|---------|----------|-------------|
| [`packages/components/`](./packages/components/README.md) | `@wavemaker/rn-components` | All widgets — tab bars (8 variants + shared helpers), tabs, carousel |
| [`storybook/`](./storybook/README.md) | `@wavemaker/rn-storybook` | Storybook host for the widget package |
| [`packages/wmx-components/`](./packages/wmx-components/README.md) | `@wavemaker/rn-components/tabbar-wmx` | WaveMaker Studio (WMX) wrappers and metadata |

Widgets are grouped by folder inside the package — `src/tabbar/`, `src/tabs/`, `src/carousel/` — each with its own barrel, all re-exported from `src/index.ts`.

## Building

The root `package.json` orchestrates the build via `scripts/build-npm-package.js`. The package compiles TypeScript into `packages/components/build/`, and packed tarballs collect in `code/dist/`.

```bash
npm run build            # build the widget package
npm run pack             # build + create a publishable .tgz tarball in dist/
```

## Storybook

The Storybook host imports the widget sources directly (via the `@wavemaker/rn-components/*` alias) and renders them through `react-native-web`. Stories live under `storybook/stories/<widget>/`.

```bash
cd storybook
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build
npm run deploy-storybook # publish to GitHub Pages
```

## WMX metadata

WaveMaker Studio wrappers and metadata (`wmx.json`, icons, assets) live under `packages/wmx-components/components/<widget>/` and are generated into `packages/wmx-components/dist/`.

```bash
cd packages/wmx-components
npm install
npm run generate:wmx
```

## Contributors

- Srinivasa Rao Boyina ([@sboyina](https://github.com/sboyina))

## License

[MIT](./LICENSE)
