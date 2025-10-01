/* eslint-disable max-lines-per-function */
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import {
  FertilizerMethodEnum,
  FertilizerStatusEnum,
  FertilizerTypeEnum,
  type Plant,
  useCreateFertilizer,
  useCreateWater,
  useFertilizers,
  usePlants,
  useUpdateFertilizers,
  useWaters,
  WaterEnum,
  WaterStatusEnum,
} from '@/api';
import { useUpdateWater } from '@/api/waters/use-update-water';
import { colors, Image, Text, View } from '@/components/ui';
import { Check } from '@/components/ui/icons/check';
import { cn, getFileUrl } from '@/lib';
import { translate } from '@/lib';

import { ErrorState, LoadingState } from '../common';
import {
  getFertilizingMissions,
  getLastDone,
  getWateringMissions,
} from './missions';

interface Item {
  plant: Plant;
  type: 'watering' | 'fertilizing';
  overdueText?: string;
}

export const TodayMission = () => {
  const {
    data: dataWatering,
    isPending: loadingWatering,
    isError: errorWatering,
  } = useWaters();
  const {
    data: dataFertilizing,
    isPending: loadingFertilizing,
    isError: errorFertilizing,
  } = useFertilizers();
  const {
    data: dataPlant,
    isPending: loadingPlant,
    isError: errorPlant,
  } = usePlants();

  const queryClient = useQueryClient();
  const createWater = useCreateWater({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['waters'] }),
  });
  const createFertilizer = useCreateFertilizer({
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['fertilizers'] }),
  });
  const updateWater = useUpdateWater({
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['waters'] }),
  });
  const updateFertilizers = useUpdateFertilizers({
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['fertilizers'] }),
  });

  if (loadingWatering || loadingFertilizing || loadingPlant)
    return <LoadingState />;

  if (
    errorWatering ||
    errorFertilizing ||
    errorPlant ||
    !dataPlant?.data ||
    !dataWatering ||
    !dataFertilizing
  )
    return <ErrorState />;

  const handleToggle = (item: Item) => {
    if (item.type === 'watering') {
      const latestWater = getLastDone(
        dataWatering.filter((w) => w.plant?.id === item.plant.id),
        WaterStatusEnum.DONE
      );
      if (!latestWater) {
        createWater.mutate({
          plantId: item.plant.id,
          amount: item.plant.wateringAmount ?? 200,
          method: item.plant.wateringMethod ?? WaterEnum.ROOT,
          status: WaterStatusEnum.DONE,
        });
        return;
      }
      const newStatus =
        latestWater.status === WaterStatusEnum.DONE
          ? WaterStatusEnum.SCHEDULED
          : WaterStatusEnum.DONE;

      updateWater.mutate({ ...latestWater, status: newStatus });
    } else {
      const latestFertilizer = getLastDone(
        dataFertilizing.filter((f) => f.plant.id === item.plant.id),
        FertilizerStatusEnum.DONE
      );
      if (!latestFertilizer) {
        createFertilizer.mutate({
          plantId: item.plant.id,
          amount: item.plant.fertilizingAmount ?? 200,
          method:
            item.plant.fertilizingMethod ?? FertilizerMethodEnum.SURFACE_SPREAD,
          fertilizerType:
            item.plant.fertilizerType ?? FertilizerTypeEnum.ORGANIC,
          status: FertilizerStatusEnum.DONE,
        });
        return;
      }

      const newStatus =
        latestFertilizer.status === FertilizerStatusEnum.DONE
          ? FertilizerStatusEnum.SCHEDULED
          : FertilizerStatusEnum.DONE;

      updateFertilizers.mutate({ ...latestFertilizer, status: newStatus });
    }
  };

  const wateringMissions = getWateringMissions(dataPlant?.data, dataWatering);
  const fertilizingMissions = getFertilizingMissions(
    dataPlant?.data,
    dataFertilizing
  );

  const missions = [...wateringMissions, ...fertilizingMissions];

  return (
    <View className="">
      {missions.length === 0 ? (
        <View className="items-center justify-center gap-4 py-5">
          <View className="rounded-full border-2 border-primary-800 bg-transparent p-3">
            <Check size={52} color={colors.primary[800]} />
          </View>
          <Text className="text-2xl">{translate('home.tasks.none')}</Text>
        </View>
      ) : (
        missions.map((mission, mi) => (
          <View
            key={mi}
            className="mb-6 flex-col gap-4 rounded-3xl bg-white p-3 px-6 shadow"
          >
            <Text className="py-3 font-signika-bold text-xl">
              {mission.label}
            </Text>
            {mission.items.map((item, ii) => (
              <View
                key={ii}
                className="flex-row items-center justify-start gap-3"
              >
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex-row items-center justify-center gap-3">
                    <View className="size-[60px] items-center justify-center rounded-full bg-primary-300">
                      <Image
                        source={
                          item.plant.images && item.plant.images.length > 0
                            ? { uri: getFileUrl(item.plant.images[0].filePath) }
                            : require('@/assets/cactus flower-cuate.png')
                        }
                        style={{ width: 60, height: 60, borderRadius: 999 }}
                      />
                      {item.overdueText && (
                        <View className="absolute bottom-0 rounded-full bg-danger-200 p-1 px-2">
                          <Text className="text-xs text-danger-800">
                            {item.overdueText}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View className="flex-col">
                      {item.plant.name && (
                        <Text className="text-lg font-medium">
                          {item.plant.name}
                        </Text>
                      )}
                      {item.plant.site?.name && (
                        <Text className="text-primary-300">
                          {item.plant.site?.name}
                        </Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToggle(item)}
                    disabled={
                      updateWater.isPending || updateFertilizers.isPending
                    }
                    className={cn(
                      'size-9 items-center justify-center rounded-full border border-primary-800',
                      item.type === 'watering'
                        ? getLastDone(
                            dataWatering.filter(
                              (w) => w.plant.id === item.plant.id
                            ),
                            WaterStatusEnum.DONE
                          )?.status === WaterStatusEnum.DONE && 'bg-primary-800'
                        : getLastDone(
                            dataFertilizing.filter(
                              (f) => f.plant.id === item.plant.id
                            ),
                            FertilizerStatusEnum.DONE
                          )?.status === FertilizerStatusEnum.DONE &&
                            'bg-primary-800'
                    )}
                  >
                    {updateWater.isPending || updateFertilizers.isPending ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.primary[800]}
                      />
                    ) : item.type === 'watering' ? (
                      getLastDone(
                        dataWatering.filter(
                          (w) => w.plant.id === item.plant.id
                        ),
                        WaterStatusEnum.DONE
                      )?.status === WaterStatusEnum.DONE && (
                        <Check size={18} color={colors.white} />
                      )
                    ) : (
                      getLastDone(
                        dataFertilizing.filter(
                          (f) => f.plant.id === item.plant.id
                        ),
                        FertilizerStatusEnum.DONE
                      )?.status === FertilizerStatusEnum.DONE && (
                        <Check size={18} color={colors.white} />
                      )
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <Text className="text-md px-5 py-3 text-center text-primary-300">
              {translate('home.todayMission.completionHint')}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};
