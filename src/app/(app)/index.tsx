import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { TodayMission } from '@/components/home/today-mission';
import { UpcomingMission } from '@/components/home/upcomig-mission';
import {
  colors,
  FabMenu,
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Tabs,
  Text,
  View,
} from '@/components/ui';
import { Bell, Plant, Window } from '@/components/ui/icons';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('today');

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 gap-2">
        <ScrollView>
          <View className="w-full items-end p-2">
            <Bell size={28} color={colors.primary[800]} />
          </View>
          <View className="flex-col items-start px-2">
            <Text className="py-1 text-center text-4xl font-bold text-primary-800">
              Chào buổi sáng
            </Text>
            <Text className="text-primary-800">
              Buổi sáng là thời gian tốt để chăm sóc cây của bạn.
            </Text>
            <Text className="text-primary-800">
              Bạn có 0 nhiệm vụ cần hoàn thành
            </Text>
          </View>
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            tabs={[
              {
                label: 'Hôm nay',
                value: 'today',
                content: <TodayMission />,
              },
              {
                label: 'Sắp tới',
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
              label: 'Thêm khu vực',
              onPress: () => router.push(`/sites/add-site`),
            },
            {
              icon: <Plant size={20} color={colors.primary[50]} />,
              label: 'Thêm cây trồng',
              onPress: () => router.push(`/find-species`),
            },
          ]}
        />
      </SafeAreaView>
    </>
  );
}
