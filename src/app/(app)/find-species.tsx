import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { type QuerySpecies, useSpecies } from '@/api';
import { SpeciesItem } from '@/components/species/item';
import { SearchSpeciesComponent } from '@/components/species/search';
import {
  EmptyList,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { translate, useQueryParams } from '@/lib';

const defaultFilter: QuerySpecies = {
  page: 1,
  limit: 5,
  filters: null,
  sort: null,
};

export default function FindSpecies() {
  const { siteId } = useLocalSearchParams<{ siteId?: string }>();
  const { queryParams } = useQueryParams<QuerySpecies>(defaultFilter);

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    refetch,
  } = useSpecies({
    variables: { ...queryParams },
  });

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar />
      <View className="flex-1 px-4">
        <Text className="pb-2 pt-4 text-2xl font-bold text-primary-900">
          Tìm kiếm cây trồng
        </Text>
        <SearchSpeciesComponent />
        <FlashList
          data={items}
          renderItem={({ item }) => <SpeciesItem siteId={siteId} item={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyList isLoading={isLoading} />}
          estimatedItemSize={60}
          refreshing={isLoading}
          onRefresh={refetch}
          ItemSeparatorComponent={() => <View className="h-5" />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.3}
        />
      </View>
    </SafeAreaView>
  );
}
