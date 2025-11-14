import type { PropsWithChildren } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import { themes, type Theme, type ThemeName } from './themes';

type ThemeContextValue = {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = PropsWithChildren<{
  initialTheme?: ThemeName;
  respectSystemPreference?: boolean;
}>;

export const ThemeProvider = ({
  children,
  initialTheme,
  respectSystemPreference = true,
}: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const resolveInitialTheme = (): ThemeName =>
    initialTheme ??
    ((respectSystemPreference && colorScheme ? colorScheme : 'light') as ThemeName);

  const [themeName, setThemeName] = useState<ThemeName>(resolveInitialTheme);

  useEffect(() => {
    if (!respectSystemPreference) {
      return;
    }
    if (!colorScheme) {
      return;
    }
    if (initialTheme) {
      return;
    }
    if (colorScheme === themeName) {
      return;
    }
    setThemeName(colorScheme as ThemeName);
  }, [colorScheme, initialTheme, respectSystemPreference, themeName]);

  const setTheme = useCallback((nextTheme: ThemeName) => {
    setThemeName(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeName(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(
    () => ({
      theme: themes[themeName],
      themeName,
      setTheme,
      toggleTheme,
    }),
    [setTheme, themeName, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }

  return context;
};
