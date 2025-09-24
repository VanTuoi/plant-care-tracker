/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image as RNImage, ScrollView } from 'react-native';

import {
  PlantSizeEnum,
  type PlantSizeForm,
  plantSizeSchema,
  usePlant,
  useUpdatePlant,
} from '@/api';
import { ErrorState, LoadingState } from '@/components/common';
import { Button, ControlledSelect, Text, View } from '@/components/ui';
import { translate, type TxKeyPath } from '@/lib';

const SIZE_OPTIONS = [
  { value: PlantSizeEnum.TINY, key: 'tiny' },
  { value: PlantSizeEnum.SMALL, key: 'small' },
  { value: PlantSizeEnum.MEDIUM, key: 'medium' },
  { value: PlantSizeEnum.LARGE, key: 'large' },
  { value: PlantSizeEnum.HUGE, key: 'huge' },
].map((opt) => ({
  value: opt.value,
  label: translate(`plant.plantEdit.edit_size.options.${opt.key}` as TxKeyPath),
}));

export default function EditSizePlant() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: plant, isPending, isError } = usePlant({ variables: { id } });
  const queryClient = useQueryClient();
  const updatePlant = useUpdatePlant();

  const { control, handleSubmit } = useForm<PlantSizeForm>({
    resolver: zodResolver(plantSizeSchema),
    defaultValues: { size: plant?.size ?? PlantSizeEnum.SMALL },
  });

  const onSubmit = (values: PlantSizeForm) => {
    if (!id) return;
    updatePlant.mutate(
      { id, ...values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['plants'] });
          router.back();
        },
      }
    );
  };

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <>
      <Stack.Screen
        options={{ title: translate('plant.plantEdit.edit_size.title') }}
      />
      <View className="flex-1">
        <View className="items-center">
          <RNImage
            source={require('@/assets/sansevieria.jpg')}
            style={{ width: '100%', height: 300, resizeMode: 'cover' }}
          />
        </View>

        <ScrollView
          className="flex-1 px-4 py-2"
          showsVerticalScrollIndicator={false}
        >
          <Text className="py-4 font-signika-bold text-3xl text-primary-800">
            {translate('plant.plantEdit.edit_size.header')}
          </Text>

          <ControlledSelect
            control={control}
            name="size"
            label={translate('plant.plantEdit.edit_size.field_label')}
            options={SIZE_OPTIONS.map((opt) => ({
              label: `${opt.label}`,
              value: opt.value,
            }))}
          />
        </ScrollView>

        <View className="absolute inset-x-0 bottom-0">
          <View className="bg-gradient-to-t from-black/10 to-transparent p-3" />
          <View className="bg-primary-100 px-4 py-5">
            <Button
              size="lg"
              label={translate('common.button.save')}
              loading={updatePlant.isPending}
              onPress={handleSubmit(onSubmit)}
              disabled={updatePlant.isPending}
              variant="secondary"
              textClassName="font-signika-bold"
              className="rounded-full"
            />
          </View>
        </View>
      </View>
    </>
  );
}
