/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';

import { useDeleteSite, useSite } from '@/api';
import { Item } from '@/components/common/item';
import { ItemsContainer } from '@/components/common/items-container';
import { Button, colors, Switch, Text, View } from '@/components/ui';
import {
  Cloud,
  Humidity,
  Sun,
  Thermometer,
  Wind,
  Window,
} from '@/components/ui/icons';
import { translate } from '@/lib';

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
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  if (isError || !site) {
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
        <View className="gap-4">
          <Text className="py-2 text-3xl font-bold text-primary-800">
            Chỉnh sửa khu vực
          </Text>
          <ItemsContainer title="Cài đặt tổng quan">
            <Item
              onPress={() => router.push('./edit/name')}
              label="Tên khu vực"
              icon={<Window size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">{site.name}</Text>
            </Item>
            <Item
              label="Có mưa"
              icon={<Cloud size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Switch accessibilityLabel="notification" onChange={() => {}} />
            </Item>
          </ItemsContainer>

          <ItemsContainer title="Thông tin khu vực">
            <Item
              label="Ánh sáng"
              icon={<Sun size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">{site.sunlight}</Text>
            </Item>
            <Item
              label="Nhiệt độ"
              icon={<Thermometer size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">
                {site.temperature}°C
              </Text>
            </Item>
            <Item
              label="Độ ẩm"
              icon={<Humidity size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">{site.humidity}%</Text>
            </Item>
            <Item
              label="Gió"
              icon={<Wind size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">
                {site.windExposure}
              </Text>
            </Item>
          </ItemsContainer>

          <Button
            size="lg"
            label="Xoá khu vực"
            onPress={handleDelete}
            variant="destructive"
            textClassName="font-bold"
            className="rounded-full bg-danger-700"
          />
        </View>
      </ScrollView>
    </>
  );
}
