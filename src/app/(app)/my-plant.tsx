import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { OverView } from '@/components/my-plant/overview';
import { PlantList } from '@/components/my-plant/plant-list';
import { SiteList } from '@/components/my-plant/site-list';
import {
  colors,
  FabMenu,
  FocusAwareStatusBar,
  ScrollView,
  Tabs,
  Text,
  View,
} from '@/components/ui';
import { Plant as PlantIcon, Window } from '@/components/ui/icons';

export default function MyPlant() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('site');

  const fabMenuMap: Record<string, any[]> = {
    site: [
      {
        icon: <Window size={20} color={colors.primary[50]} />,
        label: 'Thêm khu vực',
        onPress: () => router.push('/add-new-site'),
      },
    ],
    plant: [
      {
        icon: <PlantIcon size={20} color={colors.primary[50]} />,
        label: 'Thêm cây trồng',
        onPress: () => router.push(`/find-species`),
      },
    ],
    images: [],
  };

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1">
        <ScrollView>
          <View className="flex-col gap-4 p-4 pt-10">
            <OverView />
            <Tabs
              value={activeTab}
              onChange={setActiveTab}
              tabs={[
                { label: 'Khu vực', value: 'site', content: <SiteList /> },
                { label: 'Cây trồng', value: 'plant', content: <PlantList /> },
                { label: 'Ảnh', value: 'images', content: <Text>Ảnh</Text> },
              ]}
            />
          </View>
        </ScrollView>

        {fabMenuMap[activeTab]?.length > 0 && (
          <FabMenu items={fabMenuMap[activeTab]} position="bottom-right" />
        )}
      </View>
    </>
  );
}
