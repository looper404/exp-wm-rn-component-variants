# @wavemaker/rn-storybook

Common Storybook host for the `@wavemaker/rn-*` React Native component packages. Renders each widget on the web via `react-native-web` + Vite.

## Stories

Stories live under `stories/<widget>/`, one folder per package (`carousel/`, `tabs/`).

## Scripts

```bash
npm install
npm run storybook        # dev server at http://localhost:6006
npm run storybook:clean  # clear Storybook/Vite caches, then start dev
npm run build-storybook  # static build
npm run deploy-storybook # publish to GitHub Pages
```
