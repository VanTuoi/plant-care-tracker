/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import {
  type PlantNameForm,
  plantNameSchema,
  usePlant,
  useUpdatePlant,
} from '@/api';
import { ErrorState, ItemsContainer, LoadingState } from '@/components/common';
import { Button, Input, Text } from '@/components/ui';
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
      <Stack.Screen options={{ title: '' }} />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="py-2 font-signika-bold text-3xl">
          {translate('plant.plantEdit.edit_name.title')}
        </Text>

        <ItemsContainer
          title={translate('plant.plantEdit.edit_name.section_title')}
        >
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                label={translate('plant.plantEdit.edit_name.field_label')}
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </ItemsContainer>

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
      </ScrollView>
    </>
  );
}
