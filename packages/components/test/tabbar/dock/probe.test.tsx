import { describe, it, expect } from 'vitest';
describe('probe', () => {
  it('renders', async () => {
    const mod = await import('react-native-safe-area-context');
    expect(mod).toBeTruthy();
  });
});
