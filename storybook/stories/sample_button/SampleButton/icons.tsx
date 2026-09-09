import React from 'react';
import { Text } from 'react-native';

/** Minimal glyph icon reused across the SampleButton `icon`/`iconPosition` stories. */
export const StarIcon = ({ size, color }: { size: number; color: string }) => (
  <Text style={{ fontSize: size, lineHeight: size, color }}>★</Text>
);
