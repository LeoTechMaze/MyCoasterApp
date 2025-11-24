import React, { useMemo } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

import { useTheme } from '../theme';
import { TabNavigator } from './TabNavigator';

enableScreens();

export const RootNavigator = () => {
  const { theme, themeName } = useTheme();

  const navigationTheme = useMemo(() => {
    const base = themeName === 'dark' ? DarkTheme : DefaultTheme;

    return {
      ...base,
      colors: {
        ...base.colors,
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.textPrimary,
        border: theme.colors.border,
        notification: base.colors.notification,
      },
    };
  }, [theme, themeName]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};
