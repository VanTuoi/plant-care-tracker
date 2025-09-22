/* eslint-disable max-lines-per-function */
import { Stack, useRouter } from 'expo-router';
import * as React from 'react';

import { useMe } from '@/api';
import { Item } from '@/components/common/item';
import { ItemsContainer } from '@/components/common/items-container';
import {
  ActivityIndicator,
  Button,
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Switch,
  Text,
  View,
} from '@/components/ui';
import { EditIcon, Location, Tag, User2 } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function Profile() {
  const router = useRouter();

  const { data, isPending, isError } = useMe();

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  if (isError) {
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
          title: 'Thông tin cá nhân',
        }}
      />
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="w-full flex-1 flex-col items-center gap-10 px-4">
          <View className="size-[85px] items-center justify-center rounded-full bg-primary-100">
            <User2 color={colors.primary[800]} size={40} />
            <View className="absolute bottom-0 right-0 size-10 items-center justify-center rounded-full border border-gray-50 bg-primary-100">
              <EditIcon size={16} color={colors.primary[800]} />
            </View>
          </View>
          <ItemsContainer title="Tên">
            <Item
              label="Tên hiển thị"
              icon={<Tag size={24} />}
              iconColor={colors.neutral[200]}
              value={`${data?.firstName ?? ''} ${data?.lastName ?? ''}`.trim()}
              onPress={() => router.push('./profile/edit-name')}
            />
          </ItemsContainer>
          <ItemsContainer title="Vị trí">
            <Item
              label="Vị trí"
              icon={<Location size={24} />}
              iconColor={colors.neutral[200]}
              value={'Càng Long'}
            />
            <View className="w-full px-4">
              <Button
                label="Cập nhật vị trí"
                textClassName="text-primary-800"
                className="rounded-full bg-primary-50"
              />
            </View>
          </ItemsContainer>
          <ItemsContainer title="Beta">
            <Text className="text-md pb-2 text-primary-300">
              Bằng cách trở thành thành viên Beta, bạn sẽ nhận được những tính
              năng sớm nhất từ chúng tôi
            </Text>
            <Item
              label="Trở thành thành viên beta"
              icon={
                <View className="size-7 items-center justify-center">
                  <Text className="text-center text-xl font-bold text-white">
                    B
                  </Text>
                </View>
              }
              iconColor={colors.neutral[200]}
            >
              <Switch accessibilityLabel="notification" onChange={() => {}} />
            </Item>
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  );
}
