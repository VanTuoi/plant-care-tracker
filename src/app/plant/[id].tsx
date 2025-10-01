/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { usePlant } from '@/api';
import { ErrorState, ImageSlider, LoadingState } from '@/components/common';
import {
  CareInfoPlant,
  FertilizerModal,
  TodoPlant,
  useFertilizerModal,
  useWateringModal,
  WateringModal,
} from '@/components/plant';
import {
  Button,
  colors,
  FabMenu,
  FocusAwareStatusBar,
  Tabs,
  Text,
  View,
} from '@/components/ui';
import {
  Camera,
  Fertilizer,
  Home,
  Settings,
  WateringCan,
} from '@/components/ui/icons';
import { getFileUrl, translate } from '@/lib';

export default function PlantDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isPending, isError } = usePlant({ variables: { id } });

  const [activeTab, setActiveTab] = useState('todo');

  const wateringModal = useWateringModal();
  const fertilizerModal = useFertilizerModal();

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.name ? data?.name : '',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Button
              testID="edit-site"
              onPress={() => {
                router.push(`/plant/${id}/edit`);
              }}
              variant="ghost"
              className="mr-3"
            >
              <Settings color={colors.primary[800]} size={24} />
            </Button>
          ),
        }}
      />
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 gap-2">
        <ScrollView nestedScrollEnabled>
          <ImageSlider
            images={
              data.images && data.images.length > 0
                ? data.images.map((item) => getFileUrl(item.filePath))
                : [
                    'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
                  ]
            }
            children={
              <View className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-row items-center rounded-2xl bg-yellow-200 px-4 py-2">
                <Home color={colors.primary[800]} size={14} />
                <Text className="text-md ml-2 font-signika-bold">
                  {data.site?.name}
                </Text>
              </View>
            }
          />

          <View className="flex-col gap-1 px-4 pt-6">
            <Text className="font-signika-bold text-3xl">{data?.name}</Text>
            <Text className="text-xl text-primary-500">
              {data?.scientificName}
            </Text>
          </View>

          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            tabs={[
              {
                label: translate('plant.plantDetail.tabs.todo'),
                value: 'todo',
                content: <TodoPlant plant={data} />,
              },
              {
                label: translate('plant.plantDetail.tabs.care'),
                value: 'info',
                content: <CareInfoPlant plant={data} />,
              },
            ]}
          />
        </ScrollView>
        <FabMenu
          position="bottom-right"
          items={[
            {
              icon: (
                <Text className="mb-3 text-center text-2xl text-white">
                  ...
                </Text>
              ),
              label: translate('common.button.add'),
              backgroundColor: 'bg-primary-400',
              onPress: () => {},
            },
            {
              icon: <Camera size={20} color={colors.primary[50]} />,
              label: translate('plant.plantDetail.fab.takePhoto'),
              backgroundColor: 'bg-primary-400',
              onPress: () => router.push(`/plant/${id}/growth-diaries`),
            },
            {
              icon: <Fertilizer size={20} color={colors.primary[50]} />,
              label: translate('plant.plantDetail.fab.fertilize'),
              onPress: () => fertilizerModal.present(),
            },
            {
              icon: <WateringCan size={20} color={colors.primary[50]} />,
              label: translate('plant.plantDetail.fab.water'),
              onPress: () => wateringModal.present(),
            },
          ]}
        />
      </SafeAreaView>

      <WateringModal
        refModal={wateringModal.ref}
        dismiss={wateringModal.dismiss}
        plant={data}
      />
      <FertilizerModal
        refModal={fertilizerModal.ref}
        dismiss={fertilizerModal.dismiss}
        plant={data}
      />
    </>
  );
}
