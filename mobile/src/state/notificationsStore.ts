import { Notification, NotificationType } from '../models/types';

type Listener = (notifications: Notification[]) => void;

let notifications: Notification[] = [
  {
    id: 'n-1',
    type: 'follow',
    actorName: 'Maya Ortiz',
    targetUserName: 'You',
    message: 'Maya Ortiz started following you.',
    createdAt: new Date().toISOString(),
    isRead: false,
  },
];

const listeners: Listener[] = [];

export const getNotifications = () => notifications;

export const subscribeToNotifications = (listener: Listener) => {
  listeners.push(listener);
  listener(notifications);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  };
};

const broadcast = () => {
  listeners.forEach((l) => l(notifications));
};

type AddNotificationInput = {
  type: NotificationType;
  actorName: string;
  targetUserName?: string;
  targetPostTitle?: string;
  message: string;
};

export const addNotification = (input: AddNotificationInput) => {
  const notification: Notification = {
    id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    isRead: false,
    ...input,
  };
  // Prepend newest notifications
  notifications = [notification, ...notifications];
  broadcast();
};


