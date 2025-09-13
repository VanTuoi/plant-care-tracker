/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

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
        headerShown: false,
        tabBarShowLabel: false,
        lazy: true,
        tabBarStyle: {
          height: 50,
          backgroundColor: theme.dark
            ? colors.neutral[800]
            : colors.primary[200],
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarActiveTintColor: colors.primary[700],
        tabBarInactiveTintColor: colors.primary[400],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Home color={color} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-plant"
        options={{
          tabBarIcon: ({ color }) => (
            <Plant color={color} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="find-species"
        options={{
          tabBarIcon: ({ color }) => (
            <Search2 color={color} width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <SettingsIcon color={color} width={24} height={24} />
          ),
        }}
      />
    </Tabs>
  );
}
