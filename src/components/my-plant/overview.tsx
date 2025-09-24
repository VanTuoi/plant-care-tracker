import { useRouter } from 'expo-router';
import React from 'react';

import { usePlants, useSites } from '@/api';
import { colors, Pressable, Text, View } from '@/components/ui';
import { translate } from '@/lib';

import { ErrorState } from '../common';
import { User2 } from '../ui/icons';

export function OverView() {
  const router = useRouter();

  const {
    data: sitesData,
    isPending: isSitesPending,
    isError: isSitesError,
  } = useSites({
    variables: {},
  });

  const {
    data: plantsData,
    isPending: isPlantsPending,
    isError: isPlantsError,
  } = usePlants({
    variables: {},
  });

  const isLoading = isSitesPending || isPlantsPending;
  const isError = isSitesError || isPlantsError;

  if (isLoading) {
    return (
      <View className="animate-pulse flex-row items-center gap-3">
        <View className="size-[100px] rounded-full bg-primary-200" />
        <View className="flex-1 flex-col gap-1">
          <Text className="font-signika-bold text-3xl">
            {translate('my_plant.title')}
          </Text>
          <Text className="text-lg text-primary-300">
            {translate('my_plant.overview.loading')}
          </Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <View className="flex-row items-center gap-3">
      <Pressable onPress={() => router.push('/profile')}>
        <View className="size-[100px] items-center justify-center rounded-full bg-primary-100">
          <User2 color={colors.primary[800]} size={40} />
        </View>
      </Pressable>
      <View className="flex-col">
        <Text className="font-signika-bold text-3xl">
          {translate('my_plant.title')}
        </Text>
        <View className="flex-row gap-2">
          <Text className="text-lg text-primary-300">
            {translate('my_plant.overview.sitesCount', {
              count: sitesData?.data.length ?? 0,
            })}
          </Text>
          <Text className="text-lg text-primary-300">
            {translate('my_plant.overview.plantsCount', {
              count: plantsData?.data.length ?? 0,
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}
