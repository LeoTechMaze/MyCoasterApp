import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '../theme';

type TabParamList = {
  Park: undefined;
  RollerCoaster: undefined;
  User: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcons: Record<keyof TabParamList, string> = {
  Park: '🎡',
  RollerCoaster: '🎢',
  User: '👤',
};

const ScreenContainer = ({ title }: { title: string }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.subtitle,
          {
            color: theme.colors.textSecondary,
          },
        ]}>
        More content will arrive here soon.
      </Text>
    </View>
  );
};

const ParkScreen = () => <ScreenContainer title="Park Overview" />;
const RollerCoasterScreen = () => <ScreenContainer title="Roller Coasters" />;
const UserScreen = () => <ScreenContainer title="User Profile" />;

export const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size }) => (
          <Text style={[styles.icon, { color, fontSize: size }]}>
            {tabIcons[route.name as keyof TabParamList]}
          </Text>
        ),
      })}>
      <Tab.Screen
        name="Park"
        component={ParkScreen}
        options={{ tabBarLabel: 'Park', title: 'Park' }}
      />
      <Tab.Screen
        name="RollerCoaster"
        component={RollerCoasterScreen}
        options={{ tabBarLabel: 'Roller Coaster', title: 'Roller Coaster' }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{ tabBarLabel: 'User', title: 'User' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    marginBottom: -4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
