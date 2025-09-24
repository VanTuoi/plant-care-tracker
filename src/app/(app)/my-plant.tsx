import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import {
  ImageList,
  OverView,
  PlantList,
  SiteList,
} from '@/components/my-plant';
import {
  colors,
  FabMenu,
  FocusAwareStatusBar,
  ScrollView,
  Tabs,
  View,
} from '@/components/ui';
import { Plant as PlantIcon, Settings, Window } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function MyPlant() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('site');
  const fabMenuMap: Record<string, any[]> = {
    site: [
      {
        icon: <Window size={20} color={colors.primary[50]} />,
        label: translate('home.fab.addSite'),
        onPress: () => router.push('/sites/add-site'),
      },
    ],
    plant: [
      {
        icon: <PlantIcon size={20} color={colors.primary[50]} />,
        label: translate('home.fab.addPlant'),
        onPress: () => router.push(`/find-species`),
      },
    ],
    images: [],
  };

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="flex-1">
        <View className="flex-1 flex-col gap-2 p-4">
          <View className="w-full items-end">
            <Settings size={28} color={colors.primary[800]} />
          </View>
          <OverView />
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            tabs={[
              {
                label: translate('my_plant.tabs.site'),
                value: 'site',
                content: <SiteList />,
              },
              {
                label: translate('my_plant.tabs.plant'),
                value: 'plant',
                content: <PlantList />,
              },
              {
                label: translate('my_plant.tabs.images'),
                value: 'images',
                content: <ImageList />,
              },
            ]}
          />
        </View>
      </ScrollView>

      {fabMenuMap[activeTab]?.length > 0 && (
        <FabMenu items={fabMenuMap[activeTab]} position="bottom-right" />
      )}
    </>
  );
}
