import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FeedScreen } from '../screens/FeedScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/colors';

export type RootTabParamList = {
  Feed: undefined;
  Explore: undefined;
  Create: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.primary,
    text: colors.textPrimary,
    border: colors.borderSubtle,
  },
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.borderSubtle,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

            if (route.name === 'Feed') {
              iconName = 'aperture-outline';
            } else if (route.name === 'Explore') {
              iconName = 'compass-outline';
            } else if (route.name === 'Create') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Notifications') {
              iconName = 'chatbubble-ellipses-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


