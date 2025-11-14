const spacingValues = {
  none: 0,
  hairline: 1,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 64,
} as const;

export type SpacingToken = keyof typeof spacingValues;

export const spacing = spacingValues;

export const spacingValue = (token: SpacingToken | number): number =>
  typeof token === 'number' ? token : spacingValues[token];
