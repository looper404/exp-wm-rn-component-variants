/** Storybook shim — tabbar stories do not load custom fonts. */
export function isLoaded() {
  return true;
}

export async function loadAsync() {}

export default { isLoaded, loadAsync };
