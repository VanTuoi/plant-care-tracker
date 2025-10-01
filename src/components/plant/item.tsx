/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { type Plant, type SunlightNeedEnum } from '@/api';
import { getFileUrl } from '@/lib';

import { colors, Image } from '../ui';
import { Cloud, PartialSun, Sun } from '../ui/icons';

function renderSunlightChip(level: SunlightNeedEnum) {
  let Icon: React.ComponentType<{ size?: number; color?: string }> | null =
    null;

  switch (level) {
    case 'full_sun':
      Icon = Sun;
      break;
    case 'partial_sun':
      Icon = PartialSun;
      break;
    case 'shade':
      Icon = Cloud;
      break;
    case 'unknown':
      Icon = null;
      break;
  }

  return (
    <View className={` rounded-full bg-primary-100 px-3 py-[5px]`}>
      {Icon && <Icon size={18} color={colors.primary[800]} />}
    </View>
  );
}

type PlantsItemProps = {
  item: Plant;
};

export const PlantItem = ({ item }: PlantsItemProps) => {
  const router = useRouter();

  return (
    <View className="rounded-xl px-3 py-1">
      <View className="flex-row items-center justify-between">
        <Pressable
          className="flex-1"
          onPress={() => router.push(`/plant/${item.id}`)}
        >
          <View className={'flex flex-row items-center justify-start gap-4'}>
            <View className="size-[75px] items-center justify-center overflow-hidden rounded-full bg-primary-200 p-2">
              <Image
                source={
                  item.images && item.images.length > 0
                    ? { uri: getFileUrl(item.images[0].filePath) }
                    : require('@/assets/cactus flower-cuate.png')
                }
                style={{ width: 75, height: 75, borderRadius: 999 }}
              />
            </View>
            <View className="space-y-1">
              <Text className="font-base text-lg text-primary-800 dark:text-gray-400">
                {`${item.name ?? 'Unnamed'}`}
              </Text>
              {item.scientificName && (
                <Text className="pb-1 text-lg text-primary-300 dark:text-gray-400">
                  {'(' + item.scientificName + ')'}
                </Text>
              )}
              <View className="flex-row gap-2">
                {item.sunlightNeed && renderSunlightChip(item.sunlightNeed)}
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
