/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  ControlledSelect,
  ImagePickerField,
  Input,
  Text,
  View,
} from '@/components/ui';

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
      onSuccess: (_) => {
        router.back();
      },
    });
  };

  return (
    <>
      <View className="flex-1 bg-charcoal-50 p-4">
        <View className="rounded-xl bg-white p-3 shadow-gray-300">
          <Text className="mb-2 text-lg font-bold text-primary-700">
            Ghi chú và ảnh
          </Text>

          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <Input
                placeholder="Thêm ghi chú..."
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
            label="Tâm trạng"
            placeholder="Chọn tâm trạng..."
            options={[
              { label: '😊 Vui vẻ', value: Mood.HAPPY },
              { label: '😢 Buồn', value: Mood.SAD },
              { label: '😐 Bình thường', value: Mood.NEUTRAL },
              { label: '😡 Tức giận', value: Mood.ANGRY },
              { label: '🤔 Khác', value: Mood.OTHER },
            ]}
          />
        </View>
      </View>
      <View className="absolute bottom-4 w-full px-4">
        <Button
          size="lg"
          textClassName="text-primary-800 font-bold"
          className="rounded-full bg-gray-50 shadow-gray-50"
          loading={createDiaryMutation.isPending}
          label="Lưu"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
}
