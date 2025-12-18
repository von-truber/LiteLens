import React, { useCallback, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';
import { challenges, posts, alternatePosts } from '../data/mockData';
import { Post } from '../models/types';
import { setViewedUserById } from '../state/profileStore';
import { RootTabParamList } from '../navigation/RootNavigator';

export const ExploreScreen: React.FC = () => {
  const [currentPosts, setCurrentPosts] = useState<Post[]>(posts);

  // Derive trending tags based on frequency across posts.
  const tagCounts: Record<string, number> = {};
  currentPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    });
  });
  const trendingTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag]) => tag);

  // Mock user interests – in a real app this would come from the user profile / behavior.
  const userInterestTags = ['street', 'portrait', 'night'];
  const interestPosts = currentPosts.filter((post) =>
    post.tags.some((tag) => userInterestTags.includes(tag)),
  );

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // In a real app this would refetch explore data from the backend.
    // Here we swap between two mock sets to simulate new content.
    setTimeout(() => {
      setCurrentPosts((current) => (current === posts ? alternatePosts : posts));
      setRefreshing(false);
    }, 800);
  }, []);

  return (
    <ScreenContainer>
      <FlatList
        data={currentPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Explore</Text>
              <Text style={styles.subtitle}>
                Discover new photographers, styles, and challenges
              </Text>
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

            <Text style={styles.sectionTitle}>Trending hashtags</Text>
            <View style={styles.tagsRow}>
              {trendingTags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>

            {interestPosts.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Because you like these themes</Text>
                <FlatList
                  data={interestPosts}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.interestsList}
                  renderItem={({ item }) => <ExplorePostCard post={item} />}
                />
              </>
            )}

            <Text style={styles.sectionTitle}>For you</Text>
          </>
        }
        renderItem={({ item }) => <ExplorePostCard post={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </ScreenContainer>
  );
};

type ExplorePostCardProps = {
  post: Post;
};

const ExplorePostCard: React.FC<ExplorePostCardProps> = ({ post }) => {
  const navigation = useNavigation<any>();
  const hero = post.images[0];

  const handleOpenAuthorProfile = () => {
    setViewedUserById(post.author.id);
    navigation.navigate('Profile' as keyof RootTabParamList);
  };

  return (
    <TouchableOpacity style={styles.postCard} onPress={handleOpenAuthorProfile}>
      <Image source={{ uri: hero.url }} style={styles.postImage} resizeMode="cover" />
      <View style={styles.postOverlay} />
      <View style={styles.postTextWrapper}>
        <Text style={styles.postTitle} numberOfLines={1}>
          {post.title}
        </Text>
        <Text style={styles.postMeta} numberOfLines={1}>
          {post.author.displayName} · {post.location ?? 'Unknown'}
        </Text>
        <Text style={styles.postTags} numberOfLines={1}>
          {post.tags.slice(0, 3).map((t) => `#${t}`).join('  ')}
        </Text>
      </View>
    </TouchableOpacity>
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
  listContent: {
    paddingBottom: spacing.xl,
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
  interestsList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  postCard: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderRadius: 16,
    overflow: 'hidden',
    height: 160,
    backgroundColor: '#000',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  postTextWrapper: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
  },
  postTitle: {
    ...typography.title,
    color: colors.textPrimary,
  },
  postMeta: {
    marginTop: 2,
    ...typography.caption,
    color: colors.textSecondary,
  },
  postTags: {
    marginTop: 2,
    ...typography.caption,
    color: colors.textSecondary,
  },
});


