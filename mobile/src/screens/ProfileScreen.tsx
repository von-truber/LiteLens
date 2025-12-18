import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';
import { addNotification } from '../state/notificationsStore';
import { getViewedUser, subscribeToViewedUser } from '../state/profileStore';
import { posts } from '../data/mockData';
import { Post, User } from '../models/types';

export const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => getViewedUser());
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToViewedUser((next) => {
      setUser(next);
      setIsFollowing(false);
    });
    return unsubscribe;
  }, []);

  const displayedName = user?.displayName ?? 'Your name';
  const displayedHandle = user ? `@${user.username}` : '@username';
  const displayedBio =
    user?.bio ??
    'This is your photography bio. Share your style, gear, or what you love to shoot.';
  const displayedLocation = user?.location;
  const displayedStyles = user?.styles ?? [];

  const userPosts: Post[] = user
    ? posts.filter((p) => p.author.id === user.id)
    : [];

  const handleToggleFollow = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    if (next && user) {
      addNotification({
        type: 'follow',
        actorName: 'You',
        targetUserName: user.displayName,
        message: `You started following ${user.displayName}.`,
      });
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{displayedName}</Text>
          <Text style={styles.handle}>{displayedHandle}</Text>
          {displayedLocation ? (
            <Text style={styles.location}>{displayedLocation}</Text>
          ) : null}
          <Text style={styles.bio}>{displayedBio}</Text>
          {displayedStyles.length > 0 && (
            <View style={styles.stylesRow}>
              {displayedStyles.map((style) => (
                <View key={style} style={styles.styleChip}>
                  <Text style={styles.styleChipText}>{style}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followButtonActive]}
          onPress={handleToggleFollow}
        >
          <Text
            style={[styles.followButtonText, isFollowing && styles.followButtonTextActive]}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
      {selectedPost ? (
        <View style={styles.detailContainer}>
          <TouchableOpacity
            style={styles.detailBack}
            onPress={() => setSelectedPost(null)}
          >
            <Text style={styles.detailBackText}>◀ Back to gallery</Text>
          </TouchableOpacity>
          <View style={styles.detailCard}>
            <Image
              source={{ uri: selectedPost.images[0]?.url }}
              style={styles.detailImage}
              resizeMode="cover"
            />
            <View style={styles.detailBody}>
              <Text style={styles.detailTitle}>{selectedPost.title}</Text>
              {selectedPost.description ? (
                <Text style={styles.detailDescription}>{selectedPost.description}</Text>
              ) : null}
            </View>
          </View>
        </View>
      ) : userPosts.length === 0 ? (
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderTitle}>No posts yet</Text>
          <Text style={styles.placeholderBody}>
            When this photographer publishes finished work, it will appear in their gallery.
          </Text>
        </View>
      ) : (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => setSelectedPost(item)}
            >
              <Image
                source={{ uri: item.images[0]?.url }}
                style={styles.gridImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      )}
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
  location: {
    marginTop: spacing.xs,
    ...typography.caption,
    color: colors.textSecondary,
  },
  bio: {
    marginTop: spacing.sm,
    ...typography.body,
    color: colors.textSecondary,
  },
  stylesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  styleChip: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    backgroundColor: colors.surfaceElevated,
  },
  styleChipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  followButton: {
    borderRadius: 999,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  followButtonActive: {
    backgroundColor: colors.primary,
  },
  followButtonText: {
    ...typography.body,
    color: colors.primary,
  },
  followButtonTextActive: {
    color: colors.background,
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
  gridContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  gridItem: {
    flex: 1,
    marginBottom: spacing.sm,
  },
  gridImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  detailBack: {
    marginBottom: spacing.md,
  },
  detailBackText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  detailCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  detailImage: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  detailBody: {
    padding: spacing.md,
  },
  detailTitle: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  detailDescription: {
    ...typography.body,
    color: colors.textSecondary,
  },
});


