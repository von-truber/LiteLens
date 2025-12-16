import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';
import { challenges, posts } from '../data/mockData';

export const ExploreScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover new photographers, styles, and challenges</Text>
      </View>
      <Text style={styles.sectionTitle}>Featured challenges</Text>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <View style={styles.challengeCard}>
            <Image
              source={{ uri: item.coverImage.url }}
              style={styles.challengeImage}
              resizeMode="cover"
            />
            <View style={styles.challengeOverlay} />
            <View style={styles.challengeTextWrapper}>
              <Text style={styles.challengeTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.challengeStatus}>{item.status.toUpperCase()}</Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Popular tags</Text>
      <View style={styles.tagsRow}>
        {Array.from(
          new Set(
            posts
              .flatMap((p) => p.tags)
              .slice(0, 8),
          ),
        ).map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
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
  sectionTitle: {
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
    ...typography.title,
    color: colors.textPrimary,
  },
  horizontalList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  challengeCard: {
    width: 220,
    height: 140,
    marginRight: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  challengeImage: {
    width: '100%',
    height: '100%',
  },
  challengeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  challengeTextWrapper: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
  },
  challengeTitle: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  challengeStatus: {
    ...typography.caption,
    color: colors.primary,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  tagChip: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primarySoft,
  },
  tagText: {
    ...typography.caption,
    color: colors.primary,
  },
});


