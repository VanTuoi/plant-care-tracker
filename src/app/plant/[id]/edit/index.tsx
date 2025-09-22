/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert } from 'react-native';

import { useDeletePlant, usePlant } from '@/api';
import { Item } from '@/components/common/item';
import { ItemsContainer } from '@/components/common/items-container';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Home, Plant, Size, Tag } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function Edit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = usePlant({ variables: { id } });
  const { mutateAsync } = useDeletePlant();

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  if (isError || !data) {
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
          headerTitle: 'Thay đổi cài đặt cây',
        }}
      />

      <FocusAwareStatusBar />

      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80, gap: 20 }}
          className=" px-4 py-1"
        >
          <ItemsContainer title="Tên cây">
            <Item
              label="Tuỳ chỉnh tên"
              icon={<Tag size={24} />}
              bgColor="bg-primary-800"
              iconColor={colors.neutral[200]}
              onPress={() => router.push('./edit/name')}
            />
          </ItemsContainer>
          <ItemsContainer title="Phân bón">
            <Item
              label="Phân bón"
              icon={<Plant size={24} />}
              bgColor="bg-yellow-600"
              iconColor={colors.neutral[200]}
            />
          </ItemsContainer>
          <ItemsContainer title="Cây">
            <Item
              label="Kích thước"
              icon={<Size size={24} />}
              bgColor="bg-primary-400"
              iconColor={colors.neutral[200]}
              onPress={() => router.push('./edit/size')}
            />
            <Item
              label="Loại cây"
              icon={<Plant size={24} />}
              bgColor="bg-primary-400"
              iconColor={colors.neutral[200]}
            />
          </ItemsContainer>
          <ItemsContainer title="Khu vực">
            <Item
              label="Khu vực"
              bgColor="bg-gray-400"
              icon={<Home size={24} />}
              iconColor={colors.neutral[200]}
              onPress={() => router.push('./edit/name')}
            />
          </ItemsContainer>
          <View className="flex flex-col items-start justify-start rounded-2xl bg-primary-100 p-5">
            <Text className="text-primary-800">Ghi chú!</Text>
            <Text className="text-primary-800">
              Để thay đổi về khu vực, hãy đến chức năng cài đặt của khu vực
            </Text>
          </View>
          <View className="w-full flex-col">
            <Button
              size="lg"
              label="Nó đã chết, chuyển đến kho lưu trữ"
              variant="secondary"
              textClassName="font-bold"
              className="rounded-full bg-primary-800"
            />
            <Button
              size="lg"
              label="Xoá cây"
              onPress={() => {
                Alert.alert('Xoá cây', 'Bạn có chắc muốn xoá cây này không?', [
                  { text: 'Thôi', style: 'cancel' },
                  {
                    text: 'Xoá ngay',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await mutateAsync({ id: data.id });
                        router.replace('/my-plant');
                      } catch (err) {
                        Alert.alert(
                          'Lỗi',
                          'Không thể xoá cây, vui lòng thử lại.'
                        );
                      }
                    },
                  },
                ]);
              }}
              variant="destructive"
              textClassName="font-bold"
              className="rounded-full bg-danger-700"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
