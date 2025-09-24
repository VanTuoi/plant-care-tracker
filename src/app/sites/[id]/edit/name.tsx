/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import {
  type SiteNameForm,
  siteNameSchema,
  useSite,
  useUpdateSite,
} from '@/api';
import { ErrorState, ItemsContainer, LoadingState } from '@/components/common';
import { Button, Input, Text } from '@/components/ui';
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
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
        }}
      />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="py-2 font-signika-bold text-3xl">
          {translate('site.editName.title')}
        </Text>
        <ItemsContainer title={translate('site.editName.displayName')}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                label={translate('site.editName.siteNameLabel')}
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
          loading={updateSite.isPending}
          onPress={handleSubmit(onSubmit)}
          disabled={updateSite.isPending}
          variant="secondary"
          textClassName="font-signika-bold"
          className="rounded-full"
        />
      </ScrollView>
    </>
  );
}
