import React, { useCallback, useRef, useState } from 'react';
import { Image, FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';
import { posts, alternatePosts, commentsByPostId } from '../data/mockData';
import { Comment, Post, User } from '../models/types';
import { addNotification } from '../state/notificationsStore';
import { setViewedUserById } from '../state/profileStore';
import { RootTabParamList } from '../navigation/RootNavigator';

export const FeedScreen: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<Post[]>(posts);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // In a real app this would refetch from the backend.
    // Here we swap between two mock sets to simulate new content.
    setTimeout(() => {
      setFeedPosts((current) => (current === posts ? alternatePosts : posts));
      setRefreshing(false);
    }, 800);
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.appTitle}>LiteLens</Text>
        <Text style={styles.subtitle}>Curated feed from photographers you follow</Text>
      </View>
      <FlatList
        data={feedPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <PostCard post={item} />}
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

type PostCardProps = {
  post: Post;
};

// Mock current user for comments
const currentUser: User = {
  id: 'current-user',
  username: 'you',
  displayName: 'You',
  bio: '',
  location: '',
  styles: [],
  avatarUrl: undefined,
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigation = useNavigation<any>();
  const hero = post.images[0];
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(commentsByPostId[post.id] ?? []);
  const lastTapRef = useRef<number | null>(null);

  const allComments = localComments;
  const commentCount = allComments.length;

  const handleImageTap = () => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300) {
      // Double tap -> like the post
      setLiked(true);
    }
    lastTapRef.current = now;
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: `c-${Date.now()}`,
        author: currentUser,
        body: commentText.trim(),
        isCritique: false,
        createdAt: new Date().toISOString(),
      };
      setLocalComments((prev) => [...prev, newComment]);
      setCommentText('');
      addNotification({
        type: 'comment',
        actorName: currentUser.displayName,
        targetPostTitle: post.title,
        targetUserName: post.author.displayName,
        message: `You commented on "${post.title}".`,
      });
    }
  };

  const handleToggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      if (next) {
        addNotification({
          type: 'like',
          actorName: currentUser.displayName,
          targetPostTitle: post.title,
          targetUserName: post.author.displayName,
          message: `You appreciated "${post.title}".`,
        });
      }
      return next;
    });
  };

  const handleToggleRepost = () => {
    setReposted((prev) => {
      const next = !prev;
      if (next) {
        addNotification({
          type: 'repost',
          actorName: currentUser.displayName,
          targetPostTitle: post.title,
          targetUserName: post.author.displayName,
          message: `You reposted "${post.title}".`,
        });
      }
      return next;
    });
  };

  const handleOpenAuthorProfile = () => {
    setViewedUserById(post.author.id);
    navigation.navigate('Profile' as keyof RootTabParamList);
  };

  return (
    <View style={styles.postCard}>
      <TouchableOpacity style={styles.postHeader} onPress={handleOpenAuthorProfile}>
        <View style={styles.avatar} />
        <View style={styles.postHeaderText}>
          <Text style={styles.authorName}>{post.author.displayName}</Text>
          <Text style={styles.metaText}>
            @{post.author.username} • {post.location ?? 'Unknown location'}
          </Text>
        </View>
      </TouchableOpacity>
      <Pressable onPress={handleImageTap}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: hero.url }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </Pressable>
      <View style={styles.postBody}>
        <Text style={styles.postTitle}>{post.title}</Text>
        {post.description ? (
          <Text style={styles.postDescription} numberOfLines={2}>
            {post.description}
          </Text>
        ) : null}
        {showDetails && post.exif && (
          <View style={styles.detailsBlock}>
            {post.exif.camera && (
              <Text style={styles.detailsText}>Camera: {post.exif.camera}</Text>
            )}
            {post.exif.lens && (
              <Text style={styles.detailsText}>Lens: {post.exif.lens}</Text>
            )}
            {post.exif.aperture && (
              <Text style={styles.detailsText}>Aperture: {post.exif.aperture}</Text>
            )}
            {post.exif.shutterSpeed && (
              <Text style={styles.detailsText}>Shutter Speed: {post.exif.shutterSpeed}</Text>
            )}
            {typeof post.exif.iso === 'number' && (
              <Text style={styles.detailsText}>ISO: {post.exif.iso}</Text>
            )}
            {post.exif.focalLength && (
              <Text style={styles.detailsText}>Focal Length: {post.exif.focalLength}</Text>
            )}
            {post.location && (
              <Text style={styles.detailsText}>Location: {post.location}</Text>
            )}
          </View>
        )}
        <Text style={styles.metaText}>
          {post.tags.slice(0, 3).map((t) => `#${t}`).join('  ')}
        </Text>
        <TouchableOpacity onPress={() => setShowComments((prev) => !prev)}>
          <Text style={styles.metaText}>
            {post.appreciationsCount} appreciations • {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
          </Text>
        </TouchableOpacity>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleToggleLike}
          >
            <Text style={[styles.actionText, liked && styles.actionTextActive]}>
              {liked ? '♥ Liked' : '♡ Like'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowComments((prev) => !prev)}
          >
            <Text style={styles.actionText}>💬 Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleToggleRepost}
          >
            <Text style={[styles.actionText, reposted && styles.actionTextActive]}>
              ⤴ Repost
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setSaved((prev) => !prev)}
          >
            <Text style={[styles.actionText, saved && styles.actionTextActive]}>
              {saved ? '★ Saved' : '☆ Save'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowDetails((prev) => !prev)}
          >
            <Ionicons
              name={showDetails ? 'information-circle' : 'information-circle-outline'}
              size={16}
              color={showDetails ? colors.primary : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        {showComments && (
          <View style={styles.commentsSection}>
            {allComments.length > 0 && (
              <View style={styles.commentsList}>
                {allComments.map((comment) => (
                  <View key={comment.id} style={styles.commentRow}>
                    <Text style={styles.commentAuthor}>{comment.author.displayName}</Text>
                    <Text style={styles.commentBody}>{comment.body}</Text>
                  </View>
                ))}
              </View>
            )}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={colors.textSecondary}
                value={commentText}
                onChangeText={setCommentText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
                onPress={handleAddComment}
                disabled={!commentText.trim()}
              >
                <Ionicons
                  name="send"
                  size={18}
                  color={commentText.trim() ? colors.primary : colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  appTitle: {
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
  postCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
  } as any,
  postHeaderText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  authorName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  metaText: {
    marginTop: 2,
    ...typography.caption,
    color: colors.textSecondary,
  },
  imageWrapper: {
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  postBody: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 4,
  },
  postTitle: {
    ...typography.title,
    color: colors.textPrimary,
  },
  postDescription: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailsBlock: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
    gap: 2,
  },
  detailsText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  actionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.surfaceElevated,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionTextActive: {
    color: colors.primary,
  },
  commentsSection: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.sm,
  },
  commentsList: {
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  commentRow: {
    marginBottom: spacing.sm,
  },
  commentAuthor: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
    fontWeight: '600',
  },
  commentBody: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    gap: spacing.sm,
  },
  commentInput: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    maxHeight: 100,
    paddingVertical: spacing.xs,
  },
  sendButton: {
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});


