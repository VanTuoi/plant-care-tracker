/* eslint-disable max-lines-per-function */
import React from 'react';

import { type Plant, useFertilizers, useWaters } from '@/api';
import { colors, Text, View } from '@/components/ui';
import { Fertilizer, WateringCan } from '@/components/ui/icons';

type Props = {
  plant: Plant;
};

export function TodoPlant({ plant }: Props) {
  const { data: dataWatering } = useWaters();
  const { data: dataFertilizing } = useFertilizers();

  const wateringOfPlant = dataWatering?.filter(
    (item) => item.plantId === plant.id
  );

  const fertilizingOfPlant = dataFertilizing?.filter(
    (item) => item.plantId === plant.id
  );

  const getDaysAgo = (updatedAt: string | Date): string => {
    const updatedDate = new Date(updatedAt);
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfUpdated = new Date(
      updatedDate.getFullYear(),
      updatedDate.getMonth(),
      updatedDate.getDate()
    );

    const diffTime = startOfToday.getTime() - startOfUpdated.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    return `${diffDays} ngày trước`;
  };

  return (
    <View className="flex-col px-4">
      <View className="flex-row items-center justify-center gap-16">
        <View className="flex-col items-center justify-center">
          <View className="size-[70] flex-col items-center justify-center rounded-full bg-charcoal-700 p-2">
            <View className="rounded-full bg-primary-50 p-3">
              <WateringCan size={32} color={colors.charcoal[700]} />
            </View>
          </View>
          <Text className="pt-2 text-lg text-primary-700">Tưới nước</Text>
          <Text className="text-lg font-bold text-primary-700">
            Trong 3 ngày
          </Text>
          <Text className="py-1 text-lg text-primary-400">
            Lần cuối:{' '}
            {wateringOfPlant?.[0]
              ? getDaysAgo(wateringOfPlant[0].updatedAt)
              : 'Chưa có'}
          </Text>
        </View>
        <View className="flex-col items-center justify-center">
          <View className="size-[70] flex-col items-center justify-center rounded-full bg-charcoal-700 p-2">
            <View className="rounded-full bg-primary-50 p-3">
              <Fertilizer size={32} color={colors.charcoal[700]} />
            </View>
          </View>
          <Text className="pt-2 text-lg text-primary-700">Bón phân</Text>
          <Text className="text-lg font-bold text-primary-700">
            Trong 14 ngày
          </Text>
          <Text className="py-1 text-lg text-primary-400">
            Lần cuối:{' '}
            {fertilizingOfPlant?.[0]
              ? getDaysAgo(fertilizingOfPlant[0].updatedAt)
              : 'Chưa có'}
          </Text>
        </View>
      </View>
    </View>
  );
}
