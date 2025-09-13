import { useRouter } from 'expo-router';
import React from 'react';

import {
  colors,
  FabMenu,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { Plant, Window } from '@/components/ui/icons';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-2">
          <Text className="text-center text-3xl text-primary-500">
            Trang chủ
          </Text>
          <FabMenu
            position="bottom-right"
            items={[
              {
                icon: <Window size={20} color={colors.primary[50]} />,
                label: 'Thêm khu vực',
                onPress: () => {},
              },
              {
                icon: <Plant size={20} color={colors.primary[50]} />,
                label: 'Thêm cây trồng',
                onPress: () => router.push(`/find-species`),
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
