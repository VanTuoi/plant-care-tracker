import dayjs from 'dayjs';
import { router } from 'expo-router';
import React, { useState } from 'react';

import { TodayMission, UpcomingMission } from '@/components/home';
import {
  colors,
  FabMenu,
  SafeAreaView,
  ScrollView,
  Tabs,
  Text,
  View,
} from '@/components/ui';
import { Bell, Plant, Window } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function Home() {
  const [activeTab, setActiveTab] = useState('today');

  const task = 0;

  const hour = dayjs().hour();
  let timeKey: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';

  if (hour >= 12 && hour < 17) timeKey = 'afternoon';
  else if (hour >= 17 && hour < 21) timeKey = 'evening';
  else if (hour >= 21 || hour < 5) timeKey = 'night';

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 gap-2 p-4">
        <View className="w-full items-end">
          <Bell size={28} color={colors.primary[800]} />
        </View>
        <View className="flex-col items-start">
          <Text className="py-1 text-center font-signika-bold text-4xl">
            {translate(`home.greeting.${timeKey}`)}
          </Text>
          <Text className="text-primary-800">
            {translate(`home.subtitle.${timeKey}`)}
          </Text>
          <Text className="text-primary-800">
            {translate('home.tasks.count', { count: task })}
          </Text>
        </View>

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          tabs={[
            {
              label: translate('home.tabs.today'),
              value: 'today',
              content: <TodayMission />,
            },
            {
              label: translate('home.tabs.upcoming'),
              value: 'upcoming',
              content: <UpcomingMission />,
            },
          ]}
        />
      </ScrollView>

      <FabMenu
        position="bottom-right"
        items={[
          {
            icon: <Window size={20} color={colors.primary[50]} />,
            label: translate('home.fab.addSite'),
            onPress: () => router.push(`/sites/add-site`),
          },
          {
            icon: <Plant size={20} color={colors.primary[50]} />,
            label: translate('home.fab.addPlant'),
            onPress: () => router.push(`/find-species`),
          },
        ]}
      />
    </SafeAreaView>
  );
}
