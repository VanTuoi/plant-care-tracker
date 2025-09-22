/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, ScrollView } from 'react-native';

import {
  type PlantNameForm,
  plantNameSchema,
  usePlant,
  useUpdatePlant,
} from '@/api';
import { ItemsContainer } from '@/components/common/items-container';
import { Button, colors, Input, Text, View } from '@/components/ui';
import { translate } from '@/lib';

export default function EditNamePlant() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: plant, isPending, isError } = usePlant({ variables: { id } });

  const queryClient = useQueryClient();
  const updatePlant = useUpdatePlant();

  const { control, handleSubmit } = useForm<PlantNameForm>({
    resolver: zodResolver(plantNameSchema),
    defaultValues: { name: plant?.name ?? '' },
  });

  const onSubmit = (values: PlantNameForm) => {
    if (!id) return;
    updatePlant.mutate(
      { id, ...values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['plants'],
          });
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
      <Stack.Screen
        options={{
          title: '',
        }}
      />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="py-2 text-3xl font-bold text-primary-800">
          Chỉnh sửa tên cây
        </Text>
        <ItemsContainer title="Tên hiển thị">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                label="Tên cây"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </ItemsContainer>

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
      </ScrollView>
    </>
  );
}
