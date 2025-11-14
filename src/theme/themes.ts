import type { StatusBarStyle } from 'react-native';

import { darkColors, lightColors, type ThemeColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  pill: 999,
} as const;

const opacity = {
  transparent: 0,
  subtle: 0.08,
  muted: 0.16,
  overlay: 0.65,
  disabled: 0.4,
} as const;

export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  typography: typeof typography;
  radii: typeof radii;
  opacity: typeof opacity;
  isDark: boolean;
  statusBarStyle: StatusBarStyle;
};

const baseTheme = {
  spacing,
  typography,
  radii,
  opacity,
} as const;

export const themes = {
  light: {
    ...baseTheme,
    colors: lightColors,
    isDark: false,
    statusBarStyle: 'dark-content',
  },
  dark: {
    ...baseTheme,
    colors: darkColors,
    isDark: true,
    statusBarStyle: 'light-content',
  },
} satisfies Record<'light' | 'dark', Theme>;

export type ThemeName = keyof typeof themes;
