/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView } from 'react-native';

import { useDeleteSite, useSite } from '@/api';
import { ErrorState, LoadingState } from '@/components/common';
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
    Alert.alert(
      translate('site.edit.deleteConfirm.title'),
      translate('site.edit.deleteConfirm.message'),
      [
        { text: translate('common.button'), style: 'cancel' },
        {
          text: translate('common.button.delete'),
          style: 'destructive',
          onPress: () => {
            deleteSite.mutate(
              { id },
              {
                onSuccess: () => router.push('/my-plant'),
                onError: (err) => {
                  console.error(err);
                  Alert.alert(
                    translate('common.button.error'),
                    translate('site.edit.deleteError')
                  );
                },
              }
            );
          },
        },
      ]
    );
  };

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !site) {
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
        <View className="gap-4">
          <Text className="py-2 font-signika-bold text-3xl text-primary-800">
            {translate('site.edit.title')}
          </Text>
          <ItemsContainer title={translate('site.edit.generalSettings')}>
            <Item
              onPress={() => router.push('./edit/name')}
              label={translate('site.edit.siteName')}
              icon={<Window size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">{site.name}</Text>
            </Item>
            <Item
              label={translate('site.edit.hasRain')}
              icon={<Cloud size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Switch accessibilityLabel="notification" onChange={() => {}} />
            </Item>
          </ItemsContainer>

          <ItemsContainer title={translate('site.edit.siteInfo')}>
            <Item
              label={translate('site.edit.sunlight')}
              icon={<Sun size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">{site.sunlight}</Text>
            </Item>
            <Item
              label={translate('site.edit.temperature')}
              icon={<Thermometer size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">
                {site.temperature}°C
              </Text>
            </Item>
            <Item
              label={translate('site.edit.humidity')}
              icon={<Humidity size={28} />}
              iconColor={colors.neutral[200]}
            >
              <Text className="text-md text-primary-300">{site.humidity}%</Text>
            </Item>
            <Item
              label={translate('site.edit.wind')}
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
            label={translate('site.edit.deleteButton')}
            onPress={handleDelete}
            variant="destructive"
            textClassName="font-signika-bold"
            className="rounded-full bg-danger-700"
          />
        </View>
      </ScrollView>
    </>
  );
}
