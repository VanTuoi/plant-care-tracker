/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useUser } from '@/api/user';
import { useUpdateUser } from '@/api/user/use-update-user';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import { UserFormFields } from '@/components/user/user-form-fields';
import { translate } from '@/lib';

const formSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(
      1,
      `${translate('new_user.form.name')} ${translate('new_user.validate.required')}`
    ),
  email: z
    .string()
    .email(translate('new_user.validate.email_invalid'))
    .min(
      1,
      `${translate('new_user.form.email')} ${translate('new_user.validate.required')}`
    ),
  phone: z
    .string()
    .min(6, translate('new_user.validate.phone_min'))
    .min(
      1,
      `${translate('new_user.form.phone')} ${translate('new_user.validate.required')}`
    ),
  gender: z
    .string()
    .min(
      1,
      `${translate('new_user.form.gender')} ${translate('new_user.validate.required')}`
    ),
  status: z.enum(['active', 'block', 'graduated']),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUser() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate, isPending: loadingUpdate } = useUpdateUser();

  const {
    data,
    isPending: isLoadingGet,
    isError,
  } = useUser({ variables: { id } });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      status: 'active',
    },
  });

  useEffect(() => {
    if (data?.data) {
      const user = data.data;
      setValue('id', user.id);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('gender', user.gender);
      setValue('status', user.status);
    }
  }, [data]);

  const onSubmit = (values: FormData) => {
    mutate(values, {
      onSuccess: () => {
        showMessage({
          message: translate('edit_user.message.edit_success'),
          type: 'success',
          backgroundColor: '#22c55e',
          color: '#fff',
          icon: 'success',
        });
        router.back();
      },
      onError: () => {
        showMessage({
          message: translate('edit_user.message.edit_fail'),
          type: 'danger',
          backgroundColor: '#ef4444',
          color: '#fff',
          icon: 'danger',
        });
      },
    });
  };

  if (isLoadingGet) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data?.data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Stack.Screen
          options={{
            title: translate('edit_user.title'),
            headerBackTitle: translate('edit_user.back'),
          }}
        />
        <FocusAwareStatusBar />

        <View className="mt-6 space-y-3">
          <UserFormFields control={control} isEdit={true} />
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 p-4">
        <Button
          testID="edit-user"
          className="bg-green-500 dark:bg-green-700"
          textClassName="text-white font-bold dark:text-white"
          loading={loadingUpdate}
          disabled={isSubmitted && (loadingUpdate || !isValid)}
          label={translate('common.save')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
