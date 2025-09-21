import dayjs from 'dayjs';
import React from 'react';

import { type Plant, useWaters } from '@/api';
import { colors, Pressable, Text, View } from '@/components/ui';
import { WateringCan } from '@/components/ui/icons';

import { useWateringModal, WateringModal } from './watering-modal';

type Props = {
  plant: Plant;
};

export function HistoryWatering({ plant }: Props) {
  const wateringModal = useWateringModal();
  const { data: dataWatering } = useWaters();
  const wateringOfPlant = dataWatering?.filter(
    (item) => item.plantId === plant.id
  );

  return (
    <View className="mb-8 flex-col gap-2 rounded-3xl bg-white p-4">
      <Text className="py-3 text-2xl font-bold text-primary-800">
        Lịch sử tưới nước
      </Text>
      {wateringOfPlant?.length === 0 && (
        <View className="flex-row items-center justify-center gap-2 py-2">
          <Text className="text-primary-500">Chưa có lịch sử.</Text>
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
                  {dayjs(item.createdAt).format('HH:MM DD/MM/YYYY')}
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
