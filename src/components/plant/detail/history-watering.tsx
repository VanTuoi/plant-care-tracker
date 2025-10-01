import dayjs from 'dayjs';
import React from 'react';

import { type Plant, useWaters } from '@/api';
import { colors, Pressable, Text, View } from '@/components/ui';
import { WateringCan } from '@/components/ui/icons';
import { translate } from '@/lib';
import i18n from '@/lib/i18n';

import { useWateringModal, WateringModal } from './watering-modal';

type Props = {
  plant: Plant;
};

export function HistoryWatering({ plant }: Props) {
  const wateringModal = useWateringModal();
  const { data: dataWatering } = useWaters();
  const wateringOfPlant = dataWatering?.filter(
    (item) => item.plant.id === plant.id
  );

  return (
    <View className="mb-8 flex-col gap-2 rounded-3xl bg-white p-4">
      <Text className="py-3 font-signika-bold text-2xl">
        {translate('plant.plantDetail.historyWatering.title')}
      </Text>

      {wateringOfPlant?.length === 0 && (
        <View className="flex-row items-center justify-center gap-2 py-2">
          <Text className="text-primary-500">
            {translate('plant.plantDetail.historyWatering.empty')}
          </Text>
        </View>
      )}

      {wateringOfPlant?.map((item) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => wateringModal.present({ watering: item })}
          >
            <View className="flex-row items-center justify-start gap-4">
              <View className="rounded-full bg-primary-800 p-5">
                <WateringCan size={24} color={colors.white} />
              </View>
              <View className="flex-col items-start justify-center">
                <Text className="text-lg text-primary-500">
                  {dayjs(item.createdAt)
                    .locale(i18n.language)
                    .format('HH:mm DD/MM/YYYY')}
                </Text>
                {item.note && (
                  <Text className="text-primary-300">{item.note}</Text>
                )}
              </View>
            </View>
          </Pressable>
        );
      })}
      <WateringModal
        refModal={wateringModal.ref}
        dismiss={wateringModal.dismiss}
        watering={(wateringModal as any).params?.watering}
        plant={plant}
      />
    </View>
  );
}
