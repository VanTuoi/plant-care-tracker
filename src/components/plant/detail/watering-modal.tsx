/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  type Plant,
  useCreateWater,
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
import { translate, type TxKeyPath } from '@/lib';

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

  const createWaterMutation = useCreateWater();

  useEffect(() => {
    if (watering) {
      reset({
        plantId: watering.plant.id,
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
      createWaterMutation.mutate(values);
    }
    dismiss();
    onSuccess?.();
  };

  const waterMethodLabel = (
    method: WaterEnum,
    translate: (key: TxKeyPath) => string
  ) => {
    return translate(`plant.plantDetail.wateringModal.methods.${method}`);
  };

  return (
    <Modal
      ref={refModal}
      snapPoints={['55%']}
      detached
      backgroundStyle={{ backgroundColor: colors.charcoal[600] }}
    >
      <View className="flex flex-col gap-2 px-6">
        <Text className="font-signika-bold text-2xl text-white">
          {isEdit
            ? translate('plant.plantDetail.wateringModal.titleEdit')
            : translate('plant.plantDetail.wateringModal.titleAdd')}
        </Text>

        <Text className="text-white">
          {isEdit
            ? translate('plant.plantDetail.wateringModal.descriptionEdit', {
                plantName: plant.name,
              })
            : translate('plant.plantDetail.wateringModal.descriptionAdd', {
                plantName: plant.name,
              })}
        </Text>

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <View>
              <Text className="mb-1 text-white">
                {translate('plant.plantDetail.wateringModal.amount')}
              </Text>
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
              <Text className="mb-1 text-white">
                {translate('plant.plantDetail.wateringModal.method')}
              </Text>
              <Select
                value={field.value}
                onSelect={field.onChange}
                options={Object.values(WaterEnum).map((m) => ({
                  label: waterMethodLabel(m, translate),
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
              <Text className="mb-1 text-white">
                {translate('plant.plantDetail.wateringModal.note')}
              </Text>
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
            label={translate('common.button.close')}
            onPress={dismiss}
            className="mx-2 rounded-full bg-charcoal-700"
            textClassName="text-white font-signika-bold"
          />
          <Button
            label={
              isEdit
                ? translate('common.button.update')
                : translate('common.button.confirm')
            }
            onPress={handleSubmit(onSubmit)}
            className="flex-1 rounded-full bg-charcoal-800 px-5"
            textClassName="text-white font-signika-bold"
          />
        </View>
      </View>
    </Modal>
  );
};

export const useWateringModal = useModal;
