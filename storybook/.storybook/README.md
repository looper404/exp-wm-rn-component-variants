Storybook config for bottom tab bar specs. Run `npm run storybook` from the repo root after dependencies are installed (see root `package.json`).

If stories fail with **Failed to fetch dynamically imported module** and the browser network tab shows `404` on `@id/react-native-web:0`, clear the Vite cache and restart:

```bash
npm run storybook:clean
```

Do not add a custom Vite `resolveId` that returns bare `react-native-web` — the `react-native` → `react-native-web` alias in `main.ts` is sufficient.
