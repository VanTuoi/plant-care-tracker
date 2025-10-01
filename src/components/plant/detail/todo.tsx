/* eslint-disable max-lines-per-function */
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';

import {
  type Plant,
  useFertilizers,
  useWaters,
  type Water,
  WaterStatusEnum,
} from '@/api';
import { useUpdateWater } from '@/api/waters/use-update-water';
import { ErrorState } from '@/components/common';
import {
  ActivityIndicator,
  colors,
  Text,
  TouchableOpacity,
  View,
} from '@/components/ui';
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
  isToday?: boolean;
}

interface Mission {
  label: string;
  items: PlantItem[];
}

export function TodoPlant({ plant }: Props) {
  const { data: dataWatering, isError: errorWatering } = useWaters();
  const { data: dataFertilizing, isError: errorFertilizing } = useFertilizers();
  const queryClient = useQueryClient();
  const updateWater = useUpdateWater({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['waters'] }),
  });

  if (errorWatering || errorFertilizing) return <ErrorState />;

  const wateringOfPlant = dataWatering?.filter(
    (item) => item.plant.id === plant.id
  );
  const fertilizingOfPlant = dataFertilizing?.filter(
    (item) => item.plant.id === plant.id
  );

  const lastCompletedWater = getLastCompletedWater(wateringOfPlant);
  const latestWater = wateringOfPlant?.[wateringOfPlant.length - 1];

  const handleToggleWater = () => {
    if (!latestWater) return;
    const newStatus =
      latestWater.status === WaterStatusEnum.DONE
        ? WaterStatusEnum.SCHEDULED
        : WaterStatusEnum.DONE;
    updateWater.mutate({ ...latestWater, status: newStatus });
  };

  const getWateringMissions = (
    plant: Plant,
    lastCompletedWater?: Water
  ): Mission[] => {
    if (!plant.wateringFrequency) return [];

    const missions: Mission[] = [];
    const now = new Date();

    const lastDate = lastCompletedWater
      ? new Date(lastCompletedWater.updatedAt)
      : null;

    const nextDueDate = lastDate
      ? new Date(
          lastDate.getTime() + plant.wateringFrequency * 24 * 60 * 60 * 1000
        )
      : now;

    const diffDays = Math.floor(
      (nextDueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 0) {
      missions.push({
        label: translate('plant.plantDetail.todo.today'),
        items: [
          {
            icon: <WateringCan size={24} color={colors.white} />,
            action: translate('plant.plantDetail.todo.watering.action'),
            isToday: true,
          },
        ],
      });
    } else {
      missions.push({
        label: translate('plant.plantDetail.todo.within_days', {
          days: diffDays,
        }),
        items: [
          {
            icon: <WateringCan size={24} color={colors.white} />,
            action: translate('plant.plantDetail.todo.watering.action'),
            overdueText: dayjs(nextDueDate).format('DD/MM'),
            isToday: false,
          },
        ],
      });
    }

    return missions;
  };

  const missions = getWateringMissions(plant, lastCompletedWater);

  return (
    <View className="flex-col justify-center gap-8 px-4">
      <View className="flex-row items-center justify-center gap-16">
        <TodoSection
          icon={<WateringCan size={32} color={colors.charcoal[700]} />}
          title={translate('plant.plantDetail.todo.watering.title')}
          scheduleText={translate('plant.plantDetail.todo.watering.schedule', {
            day: plant.wateringFrequency,
          })}
          lastTimeText={
            lastCompletedWater
              ? getDaysAgo(lastCompletedWater.updatedAt)
              : translate('plant.plantDetail.todo.noData')
          }
        />
        <TodoSection
          icon={<Fertilizer size={32} color={colors.charcoal[700]} />}
          title={translate('plant.plantDetail.todo.fertilizing.title')}
          scheduleText={translate(
            'plant.plantDetail.todo.fertilizing.schedule',
            {
              day: plant.fertilizingFrequency,
            }
          )}
          lastTimeText={
            fertilizingOfPlant?.[fertilizingOfPlant.length - 1]
              ? getDaysAgo(
                  fertilizingOfPlant[fertilizingOfPlant.length - 1].updatedAt
                )
              : translate('plant.plantDetail.todo.noData')
          }
        />
      </View>

      <View className="flex-col items-center justify-center">
        {missions.map((mission, mi) => (
          <View
            key={mi}
            className="mb-6 w-full flex-col gap-4 rounded-3xl bg-white p-6 pt-3 shadow "
          >
            <Text className="py-3 font-signika-bold text-2xl">
              {mission.label}
            </Text>
            {mission.items.map((item, ii) => (
              <View key={ii} className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="size-[60px] items-center justify-center rounded-full bg-neutral-600">
                    {item.icon}
                    {item.overdueText && (
                      <View className="absolute bottom-0 rounded-full bg-primary-100 px-2 py-1">
                        <Text className="text-xs text-primary-800">
                          {item.overdueText}
                        </Text>
                      </View>
                    )}
                  </View>
                  {item.action && (
                    <Text className="text-lg">{item.action}</Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleToggleWater}
                  disabled={updateWater.isPending}
                  className={cn(
                    'size-9 items-center justify-center rounded-full border border-primary-800',
                    latestWater?.status === WaterStatusEnum.DONE
                      ? 'bg-primary-800'
                      : ''
                  )}
                >
                  {updateWater.isPending ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primary[800]}
                    />
                  ) : latestWater?.status === WaterStatusEnum.DONE ? (
                    <Check size={18} color={colors.white} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>

      <HistoryWatering plant={plant} />
    </View>
  );
}

function getLastCompletedWater(waters?: Water[]) {
  if (!waters || waters.length === 0) return undefined;
  const sorted = [...waters].sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  );
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].status === WaterStatusEnum.DONE) return sorted[i];
  }
  return undefined;
}

function getDaysAgo(updatedAt: string | Date): string {
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
  return diffDays + ' ' + translate('plant.plantDetail.todo.day_ago');
}

function TodoSection({
  icon,
  title,
  scheduleText,
  lastTimeText,
}: {
  icon: React.ReactNode;
  title: string;
  scheduleText: string;
  lastTimeText: string;
}) {
  return (
    <View className="flex-col items-center justify-center">
      <View className="size-[70] flex-col items-center justify-center rounded-full bg-charcoal-700 p-2">
        <View className="rounded-full bg-primary-50 p-3">{icon}</View>
      </View>
      <Text className="pt-2 text-lg text-primary-700">{title}</Text>
      <Text className="font-signika-bold text-lg text-primary-700">
        {scheduleText}
      </Text>
      <Text className="py-1 text-lg text-primary-400">{lastTimeText}</Text>
    </View>
  );
}
