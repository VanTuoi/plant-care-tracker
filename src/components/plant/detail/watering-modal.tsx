/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  type Plant,
  type Water,
  WaterEnum,
  waterSchema,
  type WaterSchemaFormValues,
} from '@/api';
import {
  Button,
  colors,
  Input,
  Modal,
  Select,
  Text,
  useModal,
  View,
} from '@/components/ui';
import { WaterDrop } from '@/components/ui/icons';

type Props = {
  refModal: React.Ref<any>;
  dismiss: () => void;
  plant?: Plant;
  watering?: Water;
  onSuccess?: () => void;
};

export const WateringModal = ({
  refModal,
  dismiss,
  plant,
  watering,
  onSuccess,
}: Props) => {
  const isEdit = !!watering;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaterSchemaFormValues>({
    resolver: zodResolver(waterSchema),
    defaultValues: {
      plantId: plant?.id ?? '',
      amount: 100,
      method: WaterEnum.ROOT,
      note: '',
    },
  });

  useEffect(() => {
    if (watering) {
      reset({
        plantId: watering.plantId,
        amount: watering.amount ?? 100,
        method: watering.method ?? WaterEnum.ROOT,
        note: watering.note ?? '',
      });
    }
  }, [watering, reset]);

  if (!plant) return null;

  const onSubmit = (values: WaterSchemaFormValues) => {
    if (isEdit) {
      console.log('Update water:', watering?.id, values);
    } else {
      console.log('Create water:', values);
    }
    dismiss();
    onSuccess?.();
  };

  return (
    <Modal
      ref={refModal}
      snapPoints={['65%']}
      detached
      backgroundStyle={{ backgroundColor: colors.charcoal[600] }}
    >
      <View className="flex flex-col gap-4 px-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-white">
            {isEdit ? 'Cập nhật tưới nước' : 'Đánh dấu đã tưới nước'}
          </Text>
          <WaterDrop color={colors.white} size={30} />
        </View>
        <Text className="text-white">
          {isEdit
            ? `Chỉnh sửa lịch sử tưới nước của ${plant.name}.`
            : `Hành động này sẽ ghi nhận rằng ${plant.name} đã được tưới nước.`}
        </Text>

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <View>
              <Text className="mb-1 text-white">Lượng nước (ml)</Text>
              <Input
                {...field}
                value={String(field.value)}
                keyboardType="numeric"
                error={errors.amount?.message}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="method"
          render={({ field }) => (
            <View>
              <Text className="mb-1 text-white">Phương pháp tưới</Text>
              <Select
                value={field.value}
                onSelect={field.onChange}
                options={Object.values(WaterEnum).map((m) => ({
                  label: m,
                  value: m,
                }))}
                error={errors.method?.message}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <View>
              <Text className="mb-1 text-white">Ghi chú</Text>
              <Input
                value={field.value}
                onChangeText={field.onChange}
                multiline
                error={errors.note?.message}
              />
            </View>
          )}
        />

        <View className="w-full flex-row items-center justify-between gap-2">
          <Button
            label="Đóng"
            onPress={dismiss}
            className="mx-2 rounded-full bg-charcoal-700"
            textClassName="text-white font-bold"
          />
          <Button
            label={isEdit ? 'Cập nhật' : 'Xác nhận'}
            onPress={handleSubmit(onSubmit)}
            className="flex-1 rounded-full bg-charcoal-800 px-5"
            textClassName="text-white font-bold"
          />
        </View>
      </View>
    </Modal>
  );
};

export const useWateringModal = useModal;
