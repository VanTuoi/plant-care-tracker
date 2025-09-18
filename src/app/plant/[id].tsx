/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';

import { usePlant } from '@/api';
import { ImageSlider } from '@/components/common/image-slider';
import { CareInfoPlant } from '@/components/plant/detail/care-info';
import { TodoPlant } from '@/components/plant/detail/todo';
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
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data, isPending, isError } = usePlant({ variables: { id } });

  const [activeTab, setActiveTab] = useState('todo');

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.name,
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
        <ScrollView>
          <ImageSlider
            images={
              data.images && data.images.length > 0
                ? data.images.map((item) => getFileUrl(item.filePath))
                : [
                    'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
                  ]
            }
            children={
              <View className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-row items-center rounded-2xl bg-primary-100 px-4 py-2">
                <Home color={colors.primary[800]} size={14} />
                <Text className="text-md ml-2 font-bold text-primary-800">
                  Ban công nhà A
                </Text>
              </View>
            }
          />

          <View className="flex-col gap-1 px-4 pt-6">
            <Text className="text-3xl font-bold text-primary-800">
              {data?.name}
            </Text>
            <Text className="text-xl text-primary-500">
              {data?.scientificName}
            </Text>
          </View>

          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            tabs={[
              {
                label: 'Cần làm',
                value: 'todo',
                content: <TodoPlant plant={data} />,
              },
              {
                label: 'Chăm sóc',
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
              label: 'Thêm',
              onPress: () => {},
            },
            {
              icon: <WateringCan size={20} color={colors.primary[50]} />,
              label: 'Tưới nước',
              onPress: () => {},
            },
            {
              icon: <Fertilizer size={20} color={colors.primary[50]} />,
              label: 'Bón phân',
              onPress: () => {},
            },
            {
              icon: <Camera size={20} color={colors.primary[50]} />,
              label: 'Chụp ảnh',
              onPress: () => router.push(`/plant/${id}/growth-diaries`),
            },
          ]}
        />
      </SafeAreaView>
    </>
  );
}
