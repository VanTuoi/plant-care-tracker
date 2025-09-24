/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  type Fertilizer,
  FertilizerMethodEnum,
  fertilizerSchema,
  type FertilizerSchemaFormValues,
  FertilizerTypeEnum,
  type Plant,
  useCreateFertilizer,
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
  fertilizer?: Fertilizer;
  onSuccess?: () => void;
};

export const FertilizerModal = ({
  refModal,
  dismiss,
  plant,
  fertilizer,
  onSuccess,
}: Props) => {
  const isEdit = !!fertilizer;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FertilizerSchemaFormValues>({
    resolver: zodResolver(fertilizerSchema),
    defaultValues: {
      plantId: plant?.id ?? '',
      amount: 50,
      method: FertilizerMethodEnum.SOIL_MIXING,
      fertilizerType: FertilizerTypeEnum.ORGANIC,
      note: '',
    },
  });

  const createFertilizerMutation = useCreateFertilizer();

  useEffect(() => {
    if (fertilizer) {
      reset({
        plantId: fertilizer.plantId,
        amount: fertilizer.amount,
        method: fertilizer.method,
        fertilizerType: fertilizer.fertilizerType,
        note: fertilizer.note ?? '',
      });
    }
  }, [fertilizer, reset]);

  if (!plant) return null;

  const onSubmit = (values: FertilizerSchemaFormValues) => {
    if (isEdit) {
      console.log('Update fertilizer:', fertilizer?.id, values);
    } else {
      createFertilizerMutation.mutate(values);
    }
    dismiss();
    onSuccess?.();
  };

  const fertilizerMethodLabel = (
    method: FertilizerMethodEnum,
    t: (key: TxKeyPath) => string
  ) => t(`plant.plantDetail.fertilizerModal.methods.${method}`);

  const fertilizerTypeLabel = (
    type: FertilizerTypeEnum,
    t: (key: TxKeyPath) => string
  ) => t(`plant.plantDetail.fertilizerModal.types.${type}`);

  return (
    <Modal
      ref={refModal}
      snapPoints={['70%']}
      detached
      backgroundStyle={{ backgroundColor: colors.charcoal[600] }}
    >
      <View className="flex flex-col gap-2 px-6">
        <Text className="font-signika-bold text-2xl text-white">
          {isEdit
            ? translate('plant.plantDetail.fertilizerModal.titleEdit')
            : translate('plant.plantDetail.fertilizerModal.titleAdd')}
        </Text>

        <Text className="text-white">
          {isEdit
            ? translate('plant.plantDetail.fertilizerModal.descriptionEdit', {
                plantName: plant.name,
              })
            : translate('plant.plantDetail.fertilizerModal.descriptionAdd', {
                plantName: plant.name,
              })}
        </Text>

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <View>
              <Text className="mb-1 text-white">
                {translate('plant.plantDetail.fertilizerModal.amount')}
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
          name="fertilizerType"
          render={({ field }) => (
            <View>
              <Text className="mb-1 text-white">
                {translate('plant.plantDetail.fertilizerModal.type')}
              </Text>
              <Select
                value={field.value}
                onSelect={field.onChange}
                options={Object.values(FertilizerTypeEnum).map((t) => ({
                  label: fertilizerTypeLabel(t, translate),
                  value: t,
                }))}
                error={errors.fertilizerType?.message}
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
                {translate('plant.plantDetail.fertilizerModal.method')}
              </Text>
              <Select
                value={field.value}
                onSelect={field.onChange}
                options={Object.values(FertilizerMethodEnum).map((m) => ({
                  label: fertilizerMethodLabel(m, translate),
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
                {translate('plant.plantDetail.fertilizerModal.note')}
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

export const useFertilizerModal = useModal;
