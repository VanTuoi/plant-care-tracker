import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { usePlants } from '@/api/plants';
import { PlantItem } from '@/components/plant/item';
import { SearchPlantComponent } from '@/components/plant/search';
import { EmptyList, Text, View } from '@/components/ui';
import { translate } from '@/lib/i18n';

export function PlantList() {
  const { data, isPending, isError, refetch } = usePlants({
    variables: {},
  });

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center pt-10">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <View className="px-4">
      <SearchPlantComponent />
      <FlashList
        data={data?.data}
        renderItem={({ item }) => <PlantItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        estimatedItemSize={60}
        refreshing={isPending}
        onRefresh={() => refetch()}
        ItemSeparatorComponent={() => <View className="h-1" />}
      />
    </View>
  );
}
