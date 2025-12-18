import { User } from '../models/types';
import { users } from '../data/mockData';

type Listener = (user: User | null) => void;

let viewedUser: User | null = null;
const listeners: Listener[] = [];

export const getViewedUser = () => viewedUser;

export const subscribeToViewedUser = (listener: Listener) => {
  listeners.push(listener);
  listener(viewedUser);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  };
};

const broadcast = () => {
  listeners.forEach((l) => l(viewedUser));
};

export const setViewedUserById = (userId: string) => {
  const user = users.find((u) => u.id === userId) ?? null;
  viewedUser = user;
  broadcast();
};


