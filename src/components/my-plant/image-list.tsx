/* eslint-disable max-lines-per-function */
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

import { useDeleteGrowthDiary, useGrowthDiaries } from '@/api';
import { Button, Image, Text, View } from '@/components/ui';
import { getFileUrl } from '@/lib';
import i18n from '@/lib/i18n';

import { ErrorState, LoadingState } from '../common';

export function ImageList() {
  const { data, isPending, isError } = useGrowthDiaries();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { mutateAsync } = useDeleteGrowthDiary();
  const queryClient = useQueryClient();
  const router = useRouter();

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState />;

  const handleLongPress = (id: string) => {
    setSelectedId(id);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await mutateAsync({ id: selectedId });
      queryClient.invalidateQueries({ queryKey: ['growth-diaries'] });
    }
    setSelectedId(null);
  };

  return (
    <View className="flex-col gap-3">
      {data?.map((item) => {
        const isSelected = item.id === selectedId;
        return (
          <View
            key={item.id}
            className="relative flex-col gap-2 rounded-3xl bg-white p-4 shadow"
          >
            <Pressable
              onLongPress={() => handleLongPress(item.id)}
              onPress={() => router.push(`/plant/${item.plantId}`)}
            >
              {item.file?.path && (
                <Image
                  source={{
                    uri: getFileUrl(item.file.path),
                  }}
                  className="h-48 w-full rounded-2xl"
                  resizeMode="cover"
                />
              )}

              <View className="flex-col gap-1">
                {item.note && (
                  <Text className="text-base font-medium text-gray-800">
                    {item.note}
                  </Text>
                )}
                <Text className="py-1 text-sm text-gray-500">
                  Tâm trạng: <Text className="font-medium">{item.mood}</Text>
                </Text>
                <Text className="text-xs text-gray-400">
                  Ngày tạo:
                  {dayjs(item.createdAt)
                    .locale(i18n.language)
                    .format(' DD/MM/YYYY HH:mm')}
                </Text>
              </View>
            </Pressable>

            {isSelected && (
              <View className="absolute inset-0 items-center justify-center rounded-3xl bg-black/60">
                <View className="w-48 rounded-2xl bg-white p-2 shadow-lg">
                  <Text className="mb-2 text-center text-base font-semibold">
                    Xoá ghi chép này?
                  </Text>
                  <View className="flex-row justify-center gap-5">
                    <Button
                      label="Huỷ"
                      size="sm"
                      onPress={() => setSelectedId(null)}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onPress={handleDelete}
                    >
                      <Text className="text-white">Xoá</Text>
                    </Button>
                  </View>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
