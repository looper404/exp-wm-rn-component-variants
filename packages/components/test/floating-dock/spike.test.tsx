import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import Svg, { Path } from 'react-native-svg';

describe('spike', () => {
  it('renders svg', () => {
    const { container } = render(<Svg width={10} height={10}><Path d="M0 0" fill="red" /></Svg>);
    expect(container.innerHTML).toContain('svg');
  });
});
