/* eslint-disable max-lines-per-function */

import React from 'react';

import { type QueryPlant } from '@/api';
import { cleanFilters, translate, useQueryParams } from '@/lib';

import { View } from '../ui';
import { SearchInput } from '../ui/search-input';

const defaultFilter: QueryPlant = {
  page: 1,
  limit: 10,
  filters: null,
  sort: null,
};

export const SearchPlantComponent = () => {
  const { queryParams, setQuery } = useQueryParams<QueryPlant>(defaultFilter);

  const handleSearchChange = (text: string) => {
    setQuery({
      ...queryParams,
      filters: cleanFilters(queryParams.filters, { name: text }),
    });
  };

  return (
    <>
      <View className="mb-3 mt-2 flex-row items-center gap-5">
        <View className="flex-1">
          <SearchInput
            placeholder={translate('users.placeholder_search')}
            value={queryParams.filters?.name ?? ''}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>
    </>
  );
};
