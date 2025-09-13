import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { useSpecies } from '@/api';
import { type QuerySpecies } from '@/api/species/type';
import { SpeciesItem } from '@/components/species/item';
import { SearchSpeciesComponent } from '@/components/species/search';
import {
  EmptyList,
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { translate, useQueryParams } from '@/lib';

const defaultFilter: QuerySpecies = {
  page: 1,
  limit: 10,
  filters: null,
  sort: null,
};

export default function FindSpecies() {
  const { siteId } = useLocalSearchParams<{
    siteId?: string;
  }>();

  const { queryParams } = useQueryParams<QuerySpecies>(defaultFilter);

  const { data, isPending, isError, refetch } = useSpecies({
    variables: queryParams,
  });

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4">
          <Text className="pb-2 pt-4 text-2xl font-bold text-primary-900">
            Tìm kiếm cây trồng
          </Text>
          <SearchSpeciesComponent />
          <FlashList
            data={data?.data}
            renderItem={({ item }) => (
              <SpeciesItem siteId={siteId} item={item} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<EmptyList isLoading={isPending} />}
            estimatedItemSize={60}
            refreshing={isPending}
            onRefresh={() => refetch()}
            ItemSeparatorComponent={() => <View className="h-1" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
