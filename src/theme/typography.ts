const fontFamilies = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  monospace: 'Menlo',
} as const;

const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

const lineHeights = {
  xs: 16,
  sm: 18,
  md: 22,
  lg: 26,
  xl: 32,
  xxl: 40,
} as const;

const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

const letterSpacing = {
  tight: -0.2,
  normal: 0,
  relaxed: 0.25,
} as const;

export const typography = {
  fontFamilies,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacing,
} as const;

export type Typography = typeof typography;
