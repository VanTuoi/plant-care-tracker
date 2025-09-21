import React from 'react';

import { type Plant } from '@/api';
import { Button, colors, Modal, Text, useModal, View } from '@/components/ui';
import { Fertilizer } from '@/components/ui/icons';

type Props = {
  refModal: React.Ref<any>;
  dismiss: () => void;
  plant?: Plant;
};

export const FertilizerModal = ({ refModal, dismiss, plant }: Props) => {
  if (!plant) return;
  return (
    <Modal
      ref={refModal}
      snapPoints={['35%']}
      detached
      backgroundStyle={{ backgroundColor: colors.charcoal[600] }}
    >
      <View className="flex flex-col gap-2 px-6">
        <View className="flex-row items-center justify-between">
          <Text className="gap-2 text-2xl font-bold text-white">
            Đánh dấu đã bón phân
          </Text>
          <Fertilizer color={colors.white} size={30} />
        </View>
        <Text className="text-white">Thông tin</Text>
        <Text className="text-white">
          Hành động này sẽ đánh dấu rằng {plant.name} đã được bón phân. Điều này
          có phải là chính xác không?
        </Text>
        <View className="w-full flex-row items-center justify-between gap-2">
          <Button
            label="Đóng"
            onPress={dismiss}
            className="mx-2 rounded-full bg-charcoal-700"
            textClassName="text-white font-bold"
          />
          <Button
            label="Đánh dấu đã bón phân"
            onPress={() => {}}
            className="flex-1 rounded-full bg-charcoal-800 px-5"
            textClassName="text-white font-bold"
          />
        </View>
      </View>
    </Modal>
  );
};

export const useFertilizerModal = useModal;
