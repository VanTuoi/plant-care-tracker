/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import { type QueryPlant, usePlants, useSite } from '@/api';
import { PlantItem } from '@/components/sites/plant-item';
import {
  Button,
  Chip,
  colors,
  FabMenu,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Check, Plant, Settings } from '@/components/ui/icons';
import { translate, useQueryParams } from '@/lib';

export default function Sites() {
  const router = useRouter();
  const theme = useColorScheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const defaultFilter: QueryPlant = {
    page: 1,
    limit: 10,
    filters: { siteId: id },
    sort: null,
  };

  const { queryParams } = useQueryParams<QueryPlant>(defaultFilter);

  const { data: dataPlant } = usePlants({
    variables: queryParams,
  });

  const { data, isPending, isError } = useSite({
    variables: { id },
  });

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center pt-5">
        <Text className="text-primary-500">Loading...</Text>
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
          title: data?.name || 'Khu vực',
          headerRight: () => (
            <Button
              testID="edit-site"
              onPress={() => {
                router.push(`/sites/${id}/edit`);
              }}
              variant="ghost"
              className="mr-3"
            >
              <Settings
                color={
                  theme === 'dark' ? colors.primary[200] : colors.primary[800]
                }
                size={24}
              />
            </Button>
          ),
        }}
      />
      <FocusAwareStatusBar />

      <View className="flex-1">
        <ScrollView className="flex-col gap-2 p-4">
          <View className="flex-row gap-1 py-2">
            <Chip label={data.lightType} variant="primary" />
            <Chip label={data.sunlight} variant="primary" />
          </View>
          {dataPlant?.data.map((item) => {
            return <PlantItem item={item} key={item.id} />;
          })}
        </ScrollView>
      </View>

      <FabMenu
        position="bottom-right"
        items={[
          {
            icon: <Check size={20} color={colors.primary[50]} />,
            label: 'Thêm nhiệm vụ cho cây',
            onPress: () => {},
          },
          {
            icon: <Plant size={20} color={colors.primary[50]} />,
            label: 'Thêm cây trồng',
            onPress: () => router.push(`/find-species?siteId=${data.id}`),
          },
        ]}
      />
    </>
  );
}
