import React from 'react';

import { useGrowthDiaries } from '@/api';
import { Text, View } from '@/components/ui';

import { ErrorState, LoadingState } from '../common';

export function ImageList() {
  const { data, isPending, isError } = useGrowthDiaries();

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <View className="flex-row items-center gap-3">
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
