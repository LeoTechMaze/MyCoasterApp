import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  SectionList,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import parksData from '../../../data/parks.json';
import { useTheme, type Theme } from '../../../theme';
import type { ParkStackParamList } from '../types';

type Park = {
  name: string;
  address?: string;
  operating_since?: string;
  telephone?: string;
  roller_coasters?: { name: string; status?: string }[];
};

type ParksJson = {
  parks?: Park[];
};

const formatDate = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  const isoParts = value.split('-');

  if (isoParts.length === 3) {
    const [year, month, day] = isoParts.map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const ParkDetailScreen = () => {
  const { params } = useRoute<RouteProp<ParkStackParamList, 'ParkDetail'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<ParkStackParamList, 'ParkDetail'>>();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const titleAnchor = useRef<number | null>(null);
  const infoAnchor = useRef<number | null>(null);

  const park = ((parksData as ParksJson).parks ?? []).find(
    entry => entry.name === params.parkName,
  );

  if (!park) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Park not found</Text>
        <Text style={styles.subtitle}>Please go back and try again.</Text>
      </View>
    );
  }

  const dataPoints = [
    { label: 'Address', value: park.address },
    {
      label: 'Operating Since',
      value: formatDate(park.operating_since),
    },
    { label: 'Telephone', value: park.telephone },
  ].filter(item => Boolean(item.value));

  const coasters = (park.roller_coasters ?? [])
    .filter(item => Boolean(item.name))
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const operatingCoasters = coasters.filter(
    coaster => coaster.status === 'operating',
  );
  const defunctCoasters = coasters.filter(
    coaster => coaster.status !== 'operating',
  );

  const sections = [
    operatingCoasters.length
      ? { title: 'Operating Roller Coasters', data: operatingCoasters }
      : null,
    defunctCoasters.length
      ? { title: 'Defunct Roller Coasters', data: defunctCoasters }
      : null,
  ].filter(Boolean) as { title: string; data: { name: string }[] }[];

  const renderCoaster = ({ item }: { item: { name: string } }) => (
    <View style={styles.coasterCard}>
      <Text style={styles.coasterName}>{item.name}</Text>
    </View>
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const anchor =
      infoAnchor.current ?? titleAnchor.current ?? null;
    if (anchor === null) {
      return;
    }
    const offsetY = event.nativeEvent.contentOffset.y;
    const threshold = Math.max(anchor - theme.spacing.md, 0);
    const shouldShow = offsetY >= threshold;

    if (shouldShow !== showHeaderTitle) {
      setShowHeaderTitle(shouldShow);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: '' });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      title: showHeaderTitle ? park?.name ?? '' : '',
    });
  }, [navigation, park?.name, showHeaderTitle]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.name}
        renderItem={renderCoaster}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>
            {section.title} ({section.data.length})
          </Text>
        )}
        ListHeaderComponent={
          <View>
            <Text
              style={styles.title}
              onLayout={event => {
                const { y, height } = event.nativeEvent.layout;
                titleAnchor.current = y + height;
              }}>
              {park.name}
            </Text>
            <View
              onLayout={event => {
                const { y } = event.nativeEvent.layout;
                infoAnchor.current = y;
              }}>
              {dataPoints.map(item => (
                <View style={styles.infoRow} key={item.label}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                  <View style={styles.infoDivider} />
                </View>
              ))}
            </View>
            {sections.length > 0 && <View style={styles.sectionSpacer} />}
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.coasterSeparator} />}
        ListEmptyComponent={
          <Text style={styles.subtitle}>No coasters listed for this park.</Text>
        }
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
      padding: theme.spacing.xl,
    },
    title: {
      fontSize: theme.typography.fontSizes.xl,
      lineHeight: theme.typography.lineHeights.xl,
      fontWeight: theme.typography.fontWeights.bold,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.md,
      lineHeight: theme.typography.lineHeights.md,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.sm,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSizes.lg,
      lineHeight: theme.typography.lineHeights.lg,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.textPrimary,
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.md,
    },
    sectionSpacer: {
      height: theme.spacing.md,
    },
    infoRow: {
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.xs,
    },
    infoLabel: {
      fontSize: theme.typography.fontSizes.sm,
      lineHeight: theme.typography.lineHeights.sm,
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: theme.typography.letterSpacing.relaxed,
    },
    infoValue: {
      fontSize: theme.typography.fontSizes.md,
      lineHeight: theme.typography.lineHeights.md,
      color: theme.colors.textPrimary,
      fontWeight: theme.typography.fontWeights.medium,
    },
    infoDivider: {
      height: 1,
      backgroundColor: theme.colors.borderMuted,
    },
    coasterCard: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 3,
    },
    coasterName: {
      fontSize: theme.typography.fontSizes.md,
      lineHeight: theme.typography.lineHeights.md,
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.textPrimary,
    },
    coasterSeparator: {
      height: theme.spacing.md,
    },
  });
