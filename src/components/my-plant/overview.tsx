import React from 'react';

import { usePlants } from '@/api';
import { useSites } from '@/api/sites';
import { colors, Text, View } from '@/components/ui';
import { translate } from '@/lib';

import { User2 } from '../ui/icons';

export function OverView() {
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
      <View className="animate-pulse flex-row items-center gap-3 p-4">
        <View className="size-[100px] rounded-full bg-primary-200" />
        <View className="flex-1 flex-col gap-1">
          <View className="h-10 rounded-md bg-primary-200" />
          <View className="h-6 rounded-md bg-primary-200" />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center gap-3">
      <View className="size-[100px] items-center justify-center rounded-full bg-primary-100">
        <User2 color={colors.primary[800]} size={40} />
      </View>
      <View className="flex-col">
        <Text className="text-3xl font-bold text-primary-800">
          Cây trồng của tôi
        </Text>
        <View className="flex-row gap-2">
          <Text className="text-lg text-primary-600">
            {sitesData?.data.length ?? 0} khu vực
          </Text>
          <Text className="text-lg text-primary-600">
            {plantsData?.data.length ?? 0} cây
          </Text>
        </View>
      </View>
    </View>
  );
}
