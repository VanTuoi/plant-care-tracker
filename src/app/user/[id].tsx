/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { Alert, useColorScheme } from 'react-native';

import { useDeleteUser, useUser } from '@/api/user';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { EditIcon } from '@/components/ui/icons/edit';
import { translate } from '@/lib';

export default function User() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useColorScheme();

  const userQuery = useUser({
    // @ts-ignore
    variables: { id },
  });

  const deleteMutation = useDeleteUser();

  const data = userQuery.data?.data;

  const renderHeader = (title: string) => (
    <Stack.Screen
      options={{
        title,
        headerBackTitle: 'Users',
        headerRight: () => (
          <Button
            testID="edit-user"
            onPress={() => {
              router.push(`/user/${id}/edit`);
            }}
            variant="ghost"
            className="mr-3"
          >
            <EditIcon color={theme === 'dark' ? '#fff' : '#000'} size={16} />
          </Button>
        ),
      }}
    />
  );

  if (userQuery.isPending) {
    return (
      <View className="flex-1 items-center justify-center p-3">
        {renderHeader('User')}
        <FocusAwareStatusBar />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (userQuery.isError || !data) {
    return (
      <View className="flex-1 items-center justify-center p-3">
        {renderHeader('User')}
        <FocusAwareStatusBar />
        <Text className="text-center text-red-500">
          {translate('common.error_load')}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 p-2"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {renderHeader(translate('detail_user.title'))}
        <FocusAwareStatusBar />

        <View className="flex flex-col items-start gap-2">
          <Text className="text-xl font-bold">{data.name}</Text>

          <Text>
            <Text className="font-semibold">
              {translate('detail_user.id')}:
            </Text>{' '}
            {data.id}
          </Text>

          <Text>
            <Text className="font-semibold">
              {translate('detail_user.email')}:
            </Text>{' '}
            {data.email}
          </Text>
          <Text>
            <Text className="font-semibold">
              {translate('detail_user.phone')}:
            </Text>{' '}
            {data.phone}
          </Text>
          <Text>
            <Text className="font-semibold">
              {translate('detail_user.gender')}:
            </Text>{' '}
            {data.gender}
          </Text>
          <Text>
            <Text className="font-semibold">
              {translate('detail_user.status')}:
            </Text>{' '}
            <Text
              className={`font-semibold ${
                data.status === 'block'
                  ? 'text-red-500'
                  : data.status === 'graduated'
                    ? 'text-green-600'
                    : 'text-blue-600'
              }`}
            >
              {data.status}
            </Text>
          </Text>
        </View>
      </ScrollView>
      <View className="absolute inset-x-0 bottom-0 p-4 dark:border-gray-800">
        <Button
          testID="delete-user"
          className="dark:bg-gray-200"
          textClassName="text-red-500 font-bold dark:text-red-700"
          variant="outline"
          loading={deleteMutation.isPending}
          label={translate('detail_user.delete_user.button_label')}
          size="default"
          onPress={() => {
            Alert.alert(
              translate('detail_user.delete_user.alert.title'),
              translate('detail_user.delete_user.alert.body'),
              [
                {
                  text: translate('detail_user.delete_user.alert.cancel'),
                  style: 'cancel',
                },
                {
                  text: translate('detail_user.delete_user.alert.delete'),
                  style: 'destructive',
                  onPress: () => {
                    deleteMutation.mutate(
                      { id: data.id },
                      {
                        onSuccess: () => router.replace('/'),
                      }
                    );
                  },
                },
              ]
            );
          }}
        />
      </View>
    </View>
  );
}
