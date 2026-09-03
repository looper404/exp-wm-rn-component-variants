import React from "react";
import { View } from "react-native";

/** Storybook shim — WmIcon / backgrounds do not need real gradients in tabbar stories. */
export function LinearGradient(props) {
  return React.createElement(View, props);
}

export default LinearGradient;
