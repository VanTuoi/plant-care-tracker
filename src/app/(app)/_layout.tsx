/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Easing } from 'react-native';

import { TabIcon } from '@/components/home/tab-icon';
import { colors } from '@/components/ui';
import { Home, Settings as SettingsIcon } from '@/components/ui/icons';
import { Plant } from '@/components/ui/icons/plant';
import { Search2 } from '@/components/ui/icons/search-2';
import { useAuth } from '@/lib';
import { useThemeConfig } from '@/lib/use-theme-config';

export default function TabLayout() {
  const status = useAuth.use.status();
  const theme = useThemeConfig();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        animation: 'fade',
        transitionSpec: {
          animation: 'timing',
          config: { easing: Easing.linear, duration: 250 },
        },
        headerShown: false,
        tabBarShowLabel: false,
        lazy: true,
        tabBarStyle: {
          height: 56,
          backgroundColor: theme.dark
            ? colors.neutral[800]
            : colors.primary[200],
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarActiveTintColor: colors.primary[900],
        tabBarInactiveTintColor: colors.primary[400],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              icon={<Home color={color} width={24} height={24} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="my-plant"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              icon={<Plant color={color} width={24} height={24} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="find-species"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              icon={<Search2 color={color} width={24} height={24} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              icon={<SettingsIcon color={color} width={24} height={24} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
