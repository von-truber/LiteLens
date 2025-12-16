import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';

export const CreateScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>New post</Text>
        <Text style={styles.subtitle}>Share a finished photo or small series with the community</Text>
      </View>
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderTitle}>Coming soon</Text>
        <Text style={styles.placeholderBody}>
          Here you&apos;ll be able to select your final images, add EXIF and gear, tell the story
          behind the shot, and publish to LiteLens.
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


