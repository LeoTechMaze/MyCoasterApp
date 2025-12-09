import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import parksData from '../../../data/parks.json';
import { useTheme, type Theme } from '../../../theme';
import type { ParkStackParamList } from '../types';

type Park = {
  name: string;
};

type ParksJson = {
  parks?: Park[];
};

export const ParkListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ParkStackParamList, 'ParkList'>>();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const parks = ((parksData as ParksJson).parks ?? [])
    .filter(park => Boolean(park.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  const renderItem = ({ item }: { item: Park }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: theme.opacity.disabled },
      ]}
      onPress={() => navigation.navigate('ParkDetail', { parkName: item.name })}>
      <Text style={styles.parkName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={parks}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContent: {
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
    },
    card: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 4,
    },
    parkName: {
      fontSize: theme.typography.fontSizes.lg,
      lineHeight: theme.typography.lineHeights.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.textPrimary,
    },
    separator: {
      height: theme.spacing.md,
    },
  });
