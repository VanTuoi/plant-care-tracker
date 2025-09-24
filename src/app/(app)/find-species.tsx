import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { type QuerySpecies, useSpecies } from '@/api';
import { ErrorState, LoadingState } from '@/components/common';
import { SearchSpeciesComponent, SpeciesItem } from '@/components/species';
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
    isPending,
    refetch,
  } = useSpecies({
    variables: { ...queryParams },
  });

  if (isPending) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }
  const items = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar />
      <View className="flex-1 px-4">
        <Text className="pb-2 pt-4 font-signika-bold text-2xl">
          {translate('species.search.search_title')}
        </Text>
        <SearchSpeciesComponent />
        <FlashList
          data={items}
          renderItem={({ item }) => <SpeciesItem siteId={siteId} item={item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyList isLoading={isPending} />}
          estimatedItemSize={60}
          refreshing={isPending}
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
