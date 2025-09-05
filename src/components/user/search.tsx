/* eslint-disable max-lines-per-function */

import React from 'react';

import { type FilterOption } from '@/api';
import { translate, useQueryParams } from '@/lib';

import { Button, Text, useModal, View } from '../ui';
import { Filter } from '../ui/icons';
import { SearchInput } from '../ui/search-input';
import { FilterModal } from './filter-modal';

const defaultFilter: FilterOption = {
  search: '',
  sortBy: 'id',
  sortDirection: 'asc',
  categoryId: '',
};

export const SearchComponent = () => {
  const { queryParams, setQuery } = useQueryParams<FilterOption>(defaultFilter);

  const { ref, present, dismiss } = useModal();

  const handleSearchChange = (text: string) => {
    setQuery({
      ...queryParams,
      search: text,
    });
  };

  const handleFilterPress = () => {
    present();
  };

  const applyFilter = (field: any, direction: any, searchFields: string[]) => {
    setQuery({
      sortBy: field,
      sortDirection: direction,
      searchFields,
    });
    dismiss();
  };

  const resetFilter = () => {
    setQuery(defaultFilter, true);
    dismiss();
  };

  const filterCount = Object.entries(queryParams).reduce(
    (count, [key, value]) => {
      if (value !== (defaultFilter as any)[key]) {
        return count + 1;
      }
      return count;
    },
    0
  );

  return (
    <>
      <View className="mb-3 mt-2 flex-row items-center gap-5">
        <View className="flex-1">
          <SearchInput
            placeholder={translate('users.placeholder_search')}
            value={queryParams.search ?? ''}
            onChangeText={handleSearchChange}
          />
        </View>
        <Button
          size="default"
          className="h-12 rounded-3xl border-gray-300 dark:border-gray-500"
          variant="outline"
          onPress={handleFilterPress}
        >
          <View className="flex-row items-center gap-1">
            <Filter width={32} height={32} />
            <Text className="text-gray-700 dark:text-gray-400">
              {translate('users.filter')}
            </Text>
          </View>
          {filterCount > 0 && (
            <View className="absolute -right-1 -top-1 min-w-[20px] rounded-full border border-gray-300 bg-white px-1 py-0.5 dark:border-gray-500 dark:bg-neutral-900">
              <Text className="text-center text-xs font-bold text-black">
                {filterCount}
              </Text>
            </View>
          )}
        </Button>
      </View>

      <FilterModal
        modalRef={ref}
        defaultSearchFields={queryParams.searchFields}
        defaultField={queryParams.sortBy ?? 'id'}
        defaultOrder={queryParams.sortDirection ?? 'asc'}
        onApply={applyFilter}
        onReset={resetFilter}
      />
    </>
  );
};
