/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView } from 'react-native';

import { useDeleteSite } from '@/api/sites/use-delete-site';
import { useSite } from '@/api/sites/use-site';
import { Button, Input, Text, View } from '@/components/ui';

export default function EditSite() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const deleteSite = useDeleteSite();

  const { data: site, isPending, isError } = useSite({ variables: { id } });

  const handleDelete = () => {
    Alert.alert('Xoá khu vực', 'Bạn có chắc muốn xoá khu vực này không?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => {
          deleteSite.mutate(
            { id },
            {
              onSuccess: () => router.push('/my-plant'),
              onError: (err) => {
                console.error(err);
                Alert.alert('Lỗi', 'Xoá khu vực thất bại');
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

  if (isError || !site) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Không tải được dữ liệu</Text>
      </View>
    );
  }

  return (
    <>
      {/* Update title theo tên site */}
      <Stack.Screen
        options={{
          title: site.name || 'Khu vực',
        }}
      />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="mb-4">
          <Text className="text-lg font-bold">Tên khu vực</Text>
          <Input
            value={site.name || ''}
            placeholder="Tên khu vực"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Ánh sáng</Text>
          <Input
            value={site.sunlight || ''}
            placeholder="Sunlight"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Loại ánh sáng</Text>
          <Input
            value={site.lightType || ''}
            placeholder="Light type"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Độ ẩm đất</Text>
          <Input
            value={site.soilMoisture?.toString() || ''}
            placeholder="Soil moisture"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Nhiệt độ</Text>
          <Input
            value={site.temperature?.toString() || ''}
            placeholder="Temperature"
            editable={false}
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-bold">Độ ẩm</Text>
          <Input
            value={site.humidity?.toString() || ''}
            placeholder="Humidity"
            editable={false}
          />
        </View>

        <Button
          label="Xoá khu vực"
          onPress={handleDelete}
          variant="destructive"
          className="mt-6"
        />
      </ScrollView>
    </>
  );
}
