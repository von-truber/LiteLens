import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';

export const ProfileScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.headerText}>
          <Text style={styles.name}>Your name</Text>
          <Text style={styles.handle}>@username</Text>
          <Text style={styles.bio}>
            This is your photography bio. Share your style, gear, or what you love to shoot.
          </Text>
        </View>
      </View>
      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderTitle}>Your gallery</Text>
        <Text style={styles.placeholderBody}>
          As you publish posts, your best work will live here – a clean grid focused on your
          images, not vanity metrics.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.title,
    color: colors.textPrimary,
  },
  handle: {
    marginTop: spacing.xs,
    ...typography.caption,
    color: colors.textSecondary,
  },
  bio: {
    marginTop: spacing.sm,
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


