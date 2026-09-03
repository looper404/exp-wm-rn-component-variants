import { View, Text } from "react-native";

export const AnimatableView = View;
export const AnimatableText = Text;

export function createAnimatableComponent(Component) {
  return Component;
}

export function initializeRegistryWithDefinitions() {}

export default {
  View: AnimatableView,
  Text: AnimatableText,
  createAnimatableComponent,
  initializeRegistryWithDefinitions,
};
