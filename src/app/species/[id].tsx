/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import { DifficultyLevelEnum, SunlightNeedEnum, useSpeciesDetail } from '@/api';
import {
  type FertilizerMethodEnum,
  type FertilizerTypeEnum,
} from '@/api/fertilizers';
import { type WaterEnum } from '@/api/waters';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  Image,
  Text,
  View,
} from '@/components/ui';
import {
  Calendar,
  Fertilizer,
  Heart,
  Home,
  Plant,
  Sun,
  Tag,
  WaterDrop,
} from '@/components/ui/icons';
import { translate } from '@/lib';

export const SunlightConfig: Record<
  SunlightNeedEnum,
  { label: string; icon: JSX.Element }
> = {
  [SunlightNeedEnum.FULL_SUN]: {
    label: translate('species.sunlight.full_sun', 'Nắng nhiều'),
    icon: <Sun height={20} width={20} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.PARTIAL_SUN]: {
    label: translate('species.sunlight.partial_sun', 'Nắng nhẹ'),
    icon: <Sun height={20} width={20} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.SHADE]: {
    label: translate('species.sunlight.shade', 'Bóng râm'),
    icon: <Sun height={20} width={20} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.UNKNOWN]: {
    label: translate('species.sunlight.unknown', 'Không rõ'),
    icon: <Sun height={20} width={20} color={colors.primary[800]} />,
  },
};

export const DifficultyConfig: Record<
  DifficultyLevelEnum,
  { label: string; icon: JSX.Element }
> = {
  [DifficultyLevelEnum.EASY]: {
    label: translate('species.difficulty.easy', 'Dễ'),
    icon: <Plant height={20} width={20} color={colors.primary[800]} />,
  },
  [DifficultyLevelEnum.MODERATE]: {
    label: translate('species.difficulty.moderate', 'Trung bình'),
    icon: <Plant height={20} width={20} color={colors.primary[800]} />,
  },
  [DifficultyLevelEnum.HARD]: {
    label: translate('species.difficulty.hard', 'Khó'),
    icon: <Plant height={20} width={20} color={colors.primary[800]} />,
  },
};

export default function SpeciesDetail() {
  const router = useRouter();
  const { id, siteId } = useLocalSearchParams<{ id: string; siteId: string }>();
  const { data, isPending } = useSpeciesDetail({ variables: { id } });

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.name,
          headerTitleAlign: 'center',
        }}
      />

      <FocusAwareStatusBar />
      <ScrollView className="flex-1 bg-primary-50">
        <View className="relative h-[330px]">
          <Image
            source={require('@/assets/sansevieria.jpg')}
            className="size-full"
          />
          <View className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-row items-center rounded-2xl bg-yellow-300 px-4 py-2">
            <Home color={colors.primary[800]} size={14} />
            <Text className="text-md ml-2 font-bold text-primary-800">
              {translate('species.location_chip', { count: 1 })}
            </Text>
          </View>
        </View>
        <View className="mt-8 flex-col gap-8 px-5 pb-[100px]">
          <View className="flex-col gap-1 pt-4">
            <Text className="text-3xl font-bold text-primary-800">
              {data?.name}
            </Text>
            <Text className="text-xl text-primary-500">
              {data?.scientificName}
            </Text>
          </View>

          <View className="flex-row gap-3">
            {data?.sunlightNeed && (
              <View className="size-[80] flex-col items-center justify-center rounded-2xl bg-primary-200">
                {SunlightConfig[data.sunlightNeed as SunlightNeedEnum]?.icon}
                <Text className="text-primary-800">
                  {SunlightConfig[data.sunlightNeed as SunlightNeedEnum]?.label}
                </Text>
              </View>
            )}

            {data?.difficultyLevel && (
              <View className="size-[80] flex-col items-center justify-center rounded-2xl bg-primary-200">
                {
                  DifficultyConfig[data.difficultyLevel as DifficultyLevelEnum]
                    ?.icon
                }
                <Text className="text-primary-800">
                  {
                    DifficultyConfig[
                      data.difficultyLevel as DifficultyLevelEnum
                    ]?.label
                  }
                </Text>
              </View>
            )}
          </View>

          <View className="mb-4 flex-col gap-8">
            <Text className="text-3xl font-bold text-primary-800">
              {translate('species.care.title', 'Chăm sóc')}
            </Text>

            <View className="flex-col gap-4 rounded-2xl bg-white p-3 px-5 shadow">
              <Text className="text-lg font-bold text-primary-800">
                {translate('species.care.watering.title')}
              </Text>
              <View className="flex-row items-center justify-start gap-3">
                <View className="size-[60px] items-center justify-center rounded-full bg-slate-700">
                  <Calendar color={colors.white} size={32} />
                </View>
                <View className="flex-col">
                  <Text className="text-lg font-medium text-primary-800">
                    {translate('species.care.watering.frequency', {
                      freq: data?.wateringFrequency,
                    })}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-start gap-3">
                <View className="size-[60px] items-center justify-center rounded-full bg-slate-700">
                  <WaterDrop color={colors.white} size={32} />
                </View>
                <View className="flex-col">
                  <Text className="text-lg font-medium text-primary-800">
                    {translate('species.care.watering.amount', {
                      amount: data?.wateringAmount,
                    })}
                  </Text>
                  <Text className="text-primary-800">
                    {translate('species.care.watering.method', {
                      method: translate(
                        `species.care.watering.watering_method.${data?.wateringMethod as WaterEnum}`
                      ),
                    })}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-col gap-4 rounded-2xl bg-white p-3 px-5 shadow">
              <Text className="text-lg font-bold text-primary-800">
                {translate('species.care.fertilizing.title', 'Bón phân')}
              </Text>
              <View className="flex-row items-center justify-start gap-3">
                <View className="size-[60px] items-center justify-center rounded-full bg-slate-700">
                  <Calendar color={colors.white} size={32} />
                </View>
                <View className="flex-col">
                  <Text className="text-lg font-medium text-primary-800">
                    {translate('species.care.fertilizing.frequency', {
                      freq: data?.fertilizingFrequency,
                    })}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-start gap-3">
                <View className="size-[60px] items-center justify-center rounded-full bg-slate-700">
                  <Fertilizer color={colors.white} size={32} />
                </View>
                <View className="flex-col">
                  <Text className="text-lg font-medium text-primary-800">
                    {translate('species.care.fertilizing.amount', {
                      amount: data?.fertilizingAmount,
                    })}
                  </Text>
                  <Text className="text-primary-800">
                    {translate('species.care.fertilizing.method', {
                      method: translate(
                        `species.care.fertilizing.fertilizing_method.${data?.fertilizingMethod as FertilizerMethodEnum}`
                      ),
                    })}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-start gap-3">
                <View className="size-[60px] items-center justify-center rounded-full bg-slate-700">
                  <Tag color={colors.white} size={32} />
                </View>
                <View className="flex-col">
                  <Text className="text-lg font-medium text-primary-800">
                    {translate('species.care.fertilizing.type', {
                      type: translate(
                        `species.care.fertilizing.fertilizer_type.${data?.fertilizerType as FertilizerTypeEnum}`
                      ),
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 w-full flex-row items-center gap-5 bg-primary-100 p-5">
        <Button
          onPress={() =>
            router.push(`/plant/add-plant/${data?.id}?siteId=${siteId}`)
          }
          variant="secondary"
          label={translate('species.add_plant')}
          size="lg"
          className="h-[45] flex-1 rounded-full bg-primary-800"
        />
        <Heart size={32} color={colors.primary[800]} />
      </View>
    </>
  );
}
