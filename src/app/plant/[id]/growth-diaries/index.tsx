/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  type GrowthDiaryFormValues,
  growthDiarySchema,
  Mood,
  useCreateGrowthDiary,
  useFileUpload,
} from '@/api';
import {
  Button,
  colors,
  ControlledSelect,
  ImagePickerField,
  Input,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';

export default function GrowthDiaryForm() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm<GrowthDiaryFormValues>({
    resolver: zodResolver(growthDiarySchema),
    defaultValues: {
      note: '',
      fileId: undefined,
      mood: undefined,
      plantId: id,
    },
  });

  const uploadMutation = useFileUpload();
  const createDiaryMutation = useCreateGrowthDiary();

  const onSubmit = (values: GrowthDiaryFormValues) => {
    createDiaryMutation.mutate(values, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.charcoal[50],
          },
        }}
      />
      <View className="flex-1 bg-charcoal-50 p-4">
        <View className="rounded-xl bg-white p-3 shadow-gray-300">
          <Text className="mb-2 font-signika-bold text-lg text-primary-700">
            {translate('plant.plantDetail.growthDiary.noteAndImage')}
          </Text>

          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <Input
                placeholder={translate('plant.plantDetail.growthDiary.addNote')}
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="fileId"
            render={({ field }) => (
              <ImagePickerField
                value={field.value}
                onChange={async (uri) => {
                  if (!uri) return;
                  try {
                    const res = await uploadMutation.mutateAsync({
                      fileUri: uri,
                    });
                    setValue('fileId', res.file.id, { shouldValidate: true });
                  } catch (err) {
                    console.error('Upload failed', err);
                  }
                }}
              />
            )}
          />

          <ControlledSelect
            control={control}
            name="mood"
            label={translate('plant.plantDetail.growthDiary.mood')}
            placeholder={translate(
              'plant.plantDetail.growthDiary.moodPlaceholder'
            )}
            options={[
              {
                label: `😊 ${translate('plant.plantDetail.mood.happy')}`,
                value: Mood.HAPPY,
              },
              {
                label: `😢 ${translate('plant.plantDetail.mood.sad')}`,
                value: Mood.SAD,
              },
              {
                label: `😐 ${translate('plant.plantDetail.mood.neutral')}`,
                value: Mood.NEUTRAL,
              },
              {
                label: `😡 ${translate('plant.plantDetail.mood.angry')}`,
                value: Mood.ANGRY,
              },
              {
                label: `🤔 ${translate('plant.plantDetail.mood.other')}`,
                value: Mood.OTHER,
              },
            ]}
          />
        </View>
      </View>
      <View className="absolute bottom-4 w-full px-4">
        <Button
          size="lg"
          textClassName="text-primary-800 font-signika-bold"
          className="rounded-full bg-gray-50 "
          loading={createDiaryMutation.isPending}
          label={translate('common.button.save')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
}
