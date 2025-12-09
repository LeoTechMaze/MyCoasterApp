import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '../../../theme';
import { ParkDetailScreen } from '../screens/ParkDetailScreen';
import { ParkListScreen } from '../screens/ParkListScreen';
import type { ParkStackParamList } from '../types';

const Stack = createNativeStackNavigator<ParkStackParamList>();

export const ParkNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
      }}>
      <Stack.Screen
        name="ParkList"
        component={ParkListScreen}
        options={{ title: 'Parks' }}
      />
      <Stack.Screen
        name="ParkDetail"
        component={ParkDetailScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};
