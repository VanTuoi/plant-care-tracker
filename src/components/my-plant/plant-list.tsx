import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { usePlants } from '@/api/plants';
import { EmptyList, View } from '@/components/ui';

import { ErrorState, LoadingState } from '../common';
import { PlantItem, SearchPlantComponent } from '../plant';

export function PlantList() {
  const { data, isPending, isError, refetch } = usePlants({
    variables: {},
  });

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <View className="gap-2 px-4">
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
