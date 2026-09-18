// Stub for react-native/Libraries/Utilities/codegenNativeComponent, imported
// by react-native-svg's Fabric native components. That path doesn't exist
// under react-native-web, and its real (Flow-typed) source can't be parsed by
// esbuild/rollup. Mirrors the same shim in storybook/.storybook/main.ts.
import { View } from 'react-native';

export default function codegenNativeComponent() {
  return View;
}
