/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { useMe, type UserNameForm, userNameSchema, useUpdateMe } from '@/api';
import { ErrorState, ItemsContainer, LoadingState } from '@/components/common';
import { Button, Input, Text } from '@/components/ui';
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
    updateMe.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
        router.back();
      },
    });
  };

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <>
      <Stack.Screen options={{ title: '' }} />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="py-2 font-signika-bold text-3xl text-primary-800">
          {translate('settings.profile.edit_name_title')}
        </Text>
        <ItemsContainer title={translate('settings.profile.display_name')}>
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Input
                label={translate('settings.profile.first_name')}
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
                label={translate('settings.profile.last_name')}
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </ItemsContainer>

        <Button
          size="lg"
          label={translate('common.button.save')}
          loading={updateMe.isPending}
          onPress={handleSubmit(onSubmit)}
          disabled={updateMe.isPending}
          variant="secondary"
          textClassName="font-signika-bold"
          className="rounded-full"
        />
      </ScrollView>
    </>
  );
}
