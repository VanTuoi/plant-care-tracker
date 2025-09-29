/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';

import { type Plant, useFertilizers, useWaters } from '@/api';
import { colors, Text, TouchableOpacity, View } from '@/components/ui';
import { Check, Fertilizer, WateringCan } from '@/components/ui/icons';
import { cn, translate } from '@/lib';

import { HistoryWatering } from './history-watering';

type Props = {
  plant: Plant;
};

interface PlantItem {
  icon: React.ReactNode;
  action?: string;
  overdueText?: string;
}

interface Mission {
  label: string;
  items: PlantItem[];
}

export function TodoPlant({ plant }: Props) {
  const { data: dataWatering } = useWaters();
  const { data: dataFertilizing } = useFertilizers();

  const wateringOfPlant = dataWatering?.filter(
    (item) => item.plantId === plant.id
  );

  const fertilizingOfPlant = dataFertilizing?.filter(
    (item) => item.plantId === plant.id
  );

  const missions: Mission[] = [
    {
      label: translate('plant.plantDetail.todo.today'),
      items: [
        {
          icon: <WateringCan size={24} color={colors.white} />,
          action: translate('plant.plantDetail.todo.watering.action'),
          overdueText: translate('plant.plantDetail.todo.overdue', { days: 2 }),
        },
      ],
    },
  ];

  const [completed, setCompleted] = useState<boolean[][]>(
    missions.map((m) => Array(m.items.length).fill(false))
  );

  const toggleComplete = (missionIndex: number, itemIndex: number) => {
    setCompleted((prev) =>
      prev.map((mission, mi) =>
        mi === missionIndex
          ? mission.map((c, ii) => (ii === itemIndex ? !c : c))
          : mission
      )
    );
  };

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

    if (diffDays === 0) return translate('plant.plantDetail.todo.today');
    if (diffDays === 1) return translate('plant.plantDetail.todo.yesterday');
    return diffDays + translate('plant.plantDetail.todo.day_ago');
  };

  return (
    <View className="flex-col justify-center gap-8 px-4">
      <View className="flex-row items-center justify-center gap-16">
        <View className="flex-col items-center justify-center">
          <View className="size-[70] flex-col items-center justify-center rounded-full bg-charcoal-700 p-2">
            <View className="rounded-full bg-primary-50 p-3">
              <WateringCan size={32} color={colors.charcoal[700]} />
            </View>
          </View>
          <Text className="pt-2 text-lg text-primary-700">
            {translate('plant.plantDetail.todo.watering.title')}
          </Text>
          <Text className="font-signika-bold text-lg text-primary-700">
            {translate('plant.plantDetail.todo.watering.schedule', {
              day: plant.wateringFrequency,
            })}
          </Text>
          <Text className="py-1 text-lg text-primary-400">
            {translate('plant.plantDetail.todo.lastTime')}{' '}
            {wateringOfPlant?.[wateringOfPlant.length - 1]
              ? getDaysAgo(
                  wateringOfPlant[wateringOfPlant.length - 1].updatedAt
                )
              : translate('plant.plantDetail.todo.noData')}
          </Text>
        </View>
        <View className="flex-col items-center justify-center">
          <View className="size-[70] flex-col items-center justify-center rounded-full bg-charcoal-700 p-2">
            <View className="rounded-full bg-primary-50 p-3">
              <Fertilizer size={32} color={colors.charcoal[700]} />
            </View>
          </View>
          <Text className="pt-2 text-lg text-primary-700">
            {translate('plant.plantDetail.todo.fertilizing.title')}
          </Text>
          <Text className="font-signika-bold text-lg text-primary-700">
            {translate('plant.plantDetail.todo.fertilizing.schedule', {
              day: plant.fertilizingFrequency,
            })}
          </Text>
          <Text className="py-1 text-lg text-primary-400">
            {translate('plant.plantDetail.todo.lastTime')}{' '}
            {fertilizingOfPlant?.[fertilizingOfPlant.length - 1]
              ? getDaysAgo(
                  fertilizingOfPlant[fertilizingOfPlant.length - 1].updatedAt
                )
              : translate('plant.plantDetail.todo.noData')}
          </Text>
        </View>
      </View>
      <View className="flex-col items-center justify-center">
        {missions.map((mission, mi) => (
          <View
            key={mi}
            className="mb-6 flex-col gap-4 rounded-3xl bg-white p-3 px-6 shadow"
          >
            <Text className="py-3 font-signika-bold text-2xl">
              {mission.label}
            </Text>
            {mission.items.map((item, ii) => (
              <View
                key={ii}
                className="flex-row items-center justify-start gap-3"
              >
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex-row items-center justify-center gap-3">
                    <View className="size-[60px] items-center justify-center rounded-full bg-neutral-600">
                      {item.icon}
                      {item.overdueText && (
                        <View className="absolute bottom-0 w-auto rounded-full bg-danger-200 p-1 px-2">
                          <Text className="text-xs text-danger-800">
                            {item.overdueText}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View className="flex-col">
                      {item.action && (
                        <Text className="text-lg font-medium ">
                          {item.action}
                        </Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleComplete(mi, ii)}
                    className={cn(
                      'size-9 items-center justify-center rounded-full border border-primary-800',
                      completed[mi][ii] ? 'bg-primary-800' : ''
                    )}
                  >
                    {completed[mi][ii] && (
                      <Check size={18} color={colors.white} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <Text className="text-md px-5 py-3 text-center text-primary-300">
              {translate('plant.plantDetail.todo.completeHint')}
            </Text>
          </View>
        ))}
      </View>
      <HistoryWatering plant={plant} />
    </View>
  );
}
