/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, ScrollView } from 'react-native';

import { type SiteNameForm, siteNameSchema, useUpdateSite } from '@/api';
import { useSite } from '@/api/sites/use-site';
import { ItemsContainer } from '@/components/settings/items-container';
import { Button, colors, Input, Text, View } from '@/components/ui';
import { translate } from '@/lib';

export default function EditNameSite() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: site, isPending, isError } = useSite({ variables: { id } });

  const queryClient = useQueryClient();
  const updateSite = useUpdateSite();

  const { control, handleSubmit } = useForm<SiteNameForm>({
    resolver: zodResolver(siteNameSchema),
    defaultValues: { name: site?.name ?? '' },
  });

  const onSubmit = (values: SiteNameForm) => {
    if (!id) return;
    updateSite.mutate(
      { id, name: values.name },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['sites'],
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
        <Text className="py-2 text-3xl font-bold text-primary-800">
          Chỉnh sửa tên khu vực
        </Text>
        <ItemsContainer title="Tên hiển thị">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                label="Tên khu vực"
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
          loading={updateSite.isPending}
          onPress={handleSubmit(onSubmit)}
          disabled={updateSite.isPending}
          variant="secondary"
          textClassName="font-bold"
          className="rounded-full"
        />
      </ScrollView>
    </>
  );
}
