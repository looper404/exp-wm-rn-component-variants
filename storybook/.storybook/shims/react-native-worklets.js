/** Storybook shim — satisfies reanimated initializer imports. */
export function runOnUI() {
  return (fn) => fn;
}

export function runOnJS(fn) {
  return fn;
}

export function createSerializable() {
  return {};
}

export function isWorkletFunction() {
  return false;
}

export default { runOnUI, runOnJS, createSerializable, isWorkletFunction };
