import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';

export const NotificationsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
        <Text style={styles.subtitle}>Comments, appreciations, and challenge updates</Text>
      </View>
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderTitle}>Stay connected</Text>
        <Text style={styles.placeholderBody}>
          This is where you&apos;ll see genuine interactions – thoughtful feedback, new
          followers, and results from photography challenges.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    ...typography.body,
    color: colors.textSecondary,
  },
  placeholderCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  placeholderTitle: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  placeholderBody: {
    ...typography.body,
    color: colors.textSecondary,
  },
});


