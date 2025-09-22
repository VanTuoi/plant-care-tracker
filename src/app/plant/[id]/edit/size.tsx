/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Image as RNImage, ScrollView } from 'react-native';

import {
  PlantSizeEnum,
  type PlantSizeForm,
  plantSizeSchema,
  usePlant,
  useUpdatePlant,
} from '@/api';
import { Button, colors, ControlledSelect, Text, View } from '@/components/ui';
import { translate } from '@/lib';

const SIZE_OPTIONS = [
  { value: PlantSizeEnum.TINY, label: 'Rất nhỏ', description: 'Dưới 10 cm' },
  { value: PlantSizeEnum.SMALL, label: 'Nhỏ', description: '10 - 30 cm' },
  { value: PlantSizeEnum.MEDIUM, label: 'Vừa', description: '30 - 60 cm' },
  { value: PlantSizeEnum.LARGE, label: 'Lớn', description: '60 - 120 cm' },
  { value: PlantSizeEnum.HUGE, label: 'Khổng lồ', description: 'Trên 120 cm' },
];

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
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  if (isError || !plant) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Chỉnh sửa kích thước' }} />
      <View className="flex-1">
        <View className="items-center">
          <RNImage
            source={require('@/assets/sansevieria.jpg')}
            style={{
              width: '100%',
              height: 300,
              resizeMode: 'cover',
            }}
          />
        </View>
        <ScrollView
          className="flex-1 px-4 py-2"
          showsVerticalScrollIndicator={false}
        >
          <Text className="py-4 text-3xl font-bold text-primary-800">
            Kích thước cây của bạn?
          </Text>
          <ControlledSelect
            control={control}
            name="size"
            label="Kích thước cây"
            options={SIZE_OPTIONS.map((opt) => ({
              label: `${opt.label} (${opt.description})`,
              value: opt.value,
            }))}
          />
        </ScrollView>

        <View className="absolute inset-x-0 bottom-0">
          <View className="bg-gradient-to-t from-black/10 to-transparent p-3" />
          <View className="bg-primary-100 px-4 py-5">
            <Button
              size="lg"
              label="Lưu"
              loading={updatePlant.isPending}
              onPress={handleSubmit(onSubmit)}
              disabled={updatePlant.isPending}
              variant="secondary"
              textClassName="font-bold"
              className="rounded-full"
            />
          </View>
        </View>
      </View>
    </>
  );
}
