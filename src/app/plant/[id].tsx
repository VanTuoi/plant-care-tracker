/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView } from 'react-native';

import { useDeletePlant, usePlant } from '@/api';
import { Button, Input, Text, View } from '@/components/ui';

export default function EditPlant() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const deletePlant = useDeletePlant();

  const { data: plant, isPending, isError } = usePlant({ variables: { id } });

  const handleDelete = () => {
    Alert.alert('Xoá cây', 'Bạn có chắc muốn xoá cây này không?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => {
          deletePlant.mutate(
            { id },
            {
              onSuccess: () => router.push('/my-plant'),
              onError: (err) => {
                console.error(err);
                Alert.alert('Lỗi', 'Xoá cây thất bại');
              },
            }
          );
        },
      },
    ]);
  };

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-primary-500">Loading...</Text>
      </View>
    );
  }

  if (isError || !plant) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Không tải được dữ liệu</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: plant.name || 'Cây trồng',
        }}
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="mb-4">
          <Text className="text-lg font-bold">Tên cây</Text>
          <Input
            value={plant.name || ''}
            placeholder="Tên cây"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Loài</Text>
          <Input
            value={plant.speciesId || ''}
            placeholder="Loài cây"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Kích thước</Text>
          <Input value={plant.size || ''} placeholder="Size" editable={false} />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Tưới nước</Text>
          <Input
            value={plant.wateringFrequency?.toString() || ''}
            placeholder="Số ngày/lần"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Ánh sáng</Text>
          <Input
            value={plant.sunlightNeed || ''}
            placeholder="Sunlight"
            editable={false}
          />
        </View>

        <Button
          label="Xoá cây"
          onPress={handleDelete}
          variant="destructive"
          className="mt-6"
        />
      </ScrollView>
    </>
  );
}
