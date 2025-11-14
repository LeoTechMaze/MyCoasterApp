export const palette = {
  white: '#FFFFFF',
  offWhite: '#F7F9FC',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5F5',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
  cobalt050: '#E3ECFF',
  cobalt200: '#B9CCFF',
  cobalt400: '#3478F6',
  cobalt500: '#1F5BD8',
  cobalt700: '#12378F',
  teal100: '#CCFBF1',
  teal400: '#14B8A6',
  teal600: '#0F766E',
  amber100: '#FEF3C7',
  amber400: '#FBBF24',
  amber600: '#D97706',
  rose100: '#FFE4E6',
  rose400: '#FB7185',
  rose600: '#E11D48',
  emerald100: '#DCFCE7',
  emerald400: '#34D399',
  emerald600: '#059669',
} as const;

type PaletteColor = (typeof palette)[keyof typeof palette];

export type ThemeColors = {
  background: PaletteColor;
  backgroundSubtle: PaletteColor;
  surface: PaletteColor;
  surfaceSubtle: PaletteColor;
  surfaceContrast: PaletteColor;
  textPrimary: PaletteColor;
  textSecondary: PaletteColor;
  textMuted: PaletteColor;
  textInverse: PaletteColor;
  primary: PaletteColor;
  primaryMuted: PaletteColor;
  secondary: PaletteColor;
  secondaryMuted: PaletteColor;
  accent: PaletteColor;
  border: PaletteColor;
  borderMuted: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
  danger: PaletteColor;
  overlay: string;
  shadow: string;
};

export const lightColors: ThemeColors = {
  background: palette.gray50,
  backgroundSubtle: palette.offWhite,
  surface: palette.white,
  surfaceSubtle: palette.gray100,
  surfaceContrast: palette.gray700,
  textPrimary: palette.gray900,
  textSecondary: palette.gray600,
  textMuted: palette.gray500,
  textInverse: palette.white,
  primary: palette.cobalt500,
  primaryMuted: palette.cobalt200,
  secondary: palette.teal400,
  secondaryMuted: palette.teal100,
  accent: palette.amber400,
  border: palette.gray200,
  borderMuted: palette.gray100,
  success: palette.emerald400,
  warning: palette.amber400,
  danger: palette.rose400,
  overlay: 'rgba(15, 23, 42, 0.45)',
  shadow: 'rgba(15, 23, 42, 0.12)',
};

export const darkColors: ThemeColors = {
  background: palette.gray900,
  backgroundSubtle: palette.gray800,
  surface: palette.gray800,
  surfaceSubtle: palette.gray700,
  surfaceContrast: palette.white,
  textPrimary: palette.gray50,
  textSecondary: palette.gray200,
  textMuted: palette.gray500,
  textInverse: palette.gray900,
  primary: palette.cobalt400,
  primaryMuted: palette.cobalt050,
  secondary: palette.teal100,
  secondaryMuted: palette.teal600,
  accent: palette.amber400,
  border: palette.gray700,
  borderMuted: palette.gray800,
  success: palette.emerald400,
  warning: palette.amber400,
  danger: palette.rose400,
  overlay: 'rgba(2, 6, 23, 0.65)',
  shadow: 'rgba(0, 0, 0, 0.5)',
};
