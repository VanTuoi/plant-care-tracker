/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, ScrollView } from 'react-native';

import { useMe, type UserNameForm, userNameSchema, useUpdateMe } from '@/api';
import { ItemsContainer } from '@/components/common/items-container';
import { Button, colors, Input, Text, View } from '@/components/ui';
import { translate } from '@/lib';

export default function EditNameSite() {
  const router = useRouter();

  const { data, isPending, isError } = useMe();

  const queryClient = useQueryClient();
  const updateMe = useUpdateMe();

  const { control, handleSubmit } = useForm<UserNameForm>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
    },
  });

  const onSubmit = (values: UserNameForm) => {
    updateMe.mutate(
      { ...values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['me'],
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
          title: '',
        }}
      />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="py-2 text-3xl font-bold text-primary-800">
          Chỉnh sửa tên
        </Text>
        <ItemsContainer title="Tên hiển thị">
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Input
                label="Họ"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Input
                label="Tên"
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
          loading={updateMe.isPending}
          onPress={handleSubmit(onSubmit)}
          disabled={updateMe.isPending}
          variant="secondary"
          textClassName="font-bold"
          className="rounded-full"
        />
      </ScrollView>
    </>
  );
}
