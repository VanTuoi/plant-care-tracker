import React from 'react';

import { useGrowthDiaries } from '@/api/growth-diaries/use-growth-diaries';
import { ActivityIndicator, colors, Text, View } from '@/components/ui';
import { translate } from '@/lib';

export function ImageList() {
  const { data, isPending, isError } = useGrowthDiaries();

  if (isPending) {
    return (
      <View className="items-center justify-center pt-10">
        <ActivityIndicator size="large" color={colors.primary[500]} />
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
    <View className="flex-row items-center gap-3 px-4">
      <View className="w-full flex-col">
        {data?.map((item) => (
          <View
            key={item.id}
            className="mb-2 flex w-full flex-col items-start justify-center rounded-2xl bg-white p-1 px-2"
          >
            {Object.keys(item).map((key) => (
              <Text key={key}>
                {key}: {String(item[key as keyof typeof item])}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
