import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors, spacing, typography } from '../theme/colors';
import {
  getNotifications,
  subscribeToNotifications,
} from '../state/notificationsStore';
import { Notification } from '../models/types';

export const NotificationsScreen: React.FC = () => {
  const [items, setItems] = useState<Notification[]>(() => getNotifications());

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((next) => {
      setItems(next);
    });
    return unsubscribe;
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
        <Text style={styles.subtitle}>Comments, appreciations, and challenge updates</Text>
      </View>
      {items.length === 0 ? (
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderTitle}>No activity yet</Text>
          <Text style={styles.placeholderBody}>
            As people follow you, appreciate your photos, comment, or repost, their activity
            will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <NotificationRow notification={item} />}
        />
      )}
    </ScreenContainer>
  );
};

type RowProps = {
  notification: Notification;
};

const NotificationRow: React.FC<RowProps> = ({ notification }) => {
  let iconName: keyof typeof Ionicons.glyphMap = 'notifications-outline';
  let accent = colors.primary;

  if (notification.type === 'follow') {
    iconName = 'person-add-outline';
  } else if (notification.type === 'like') {
    iconName = 'heart-outline';
  } else if (notification.type === 'comment') {
    iconName = 'chatbubble-ellipses-outline';
  } else if (notification.type === 'repost') {
    iconName = 'repeat-outline';
  }

  return (
    <View style={styles.row}>
      <View style={styles.iconWrapper}>
        <Ionicons name={iconName} size={18} color={accent} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.messageText}>{notification.message}</Text>
        {notification.targetPostTitle ? (
          <Text style={styles.metaText} numberOfLines={1}>
            {notification.targetPostTitle}
          </Text>
        ) : null}
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
    marginRight: spacing.md,
  },
  rowText: {
    flex: 1,
  },
  messageText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  metaText: {
    marginTop: 2,
    ...typography.caption,
    color: colors.textSecondary,
  },
});


