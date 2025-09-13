/* eslint-disable max-lines-per-function */
import React from 'react';

import {
  type FilterSpecies,
  type QuerySpecies,
  type SortSpecies,
} from '@/api/species/type';
import { cleanFilters, translate, useQueryParams } from '@/lib';

import { Button, colors, Text, useModal, View } from '../ui';
import { Filter } from '../ui/icons';
import { SearchInput } from '../ui/search-input';
import { SpeciesFilterModal } from './filter-modal';

const defaultFilter: QuerySpecies = {
  page: 1,
  limit: 10,
  filters: null,
  sort: null,
};

export const SearchSpeciesComponent = () => {
  const { queryParams, setQuery } = useQueryParams<QuerySpecies>(defaultFilter);

  const { ref, present, dismiss } = useModal();

  const handleSearchChange = (text: string) => {
    setQuery({
      ...queryParams,
      filters: cleanFilters(queryParams.filters, { name: text }),
    });
  };

  const handleFilterPress = () => {
    present();
  };

  const applyFilter = (
    field: keyof FilterSpecies | SortSpecies['orderBy'],
    order: SortSpecies['order'],
    searchFields: (keyof FilterSpecies)[]
  ) => {
    const newSort: SortSpecies[] = field
      ? [{ orderBy: field as keyof FilterSpecies, order }]
      : [];

    const newFilters: FilterSpecies = {};
    searchFields.forEach((f) => {
      if (queryParams.filters && queryParams.filters[f]) {
        newFilters[f] = queryParams.filters[f];
      }
    });

    setQuery({
      ...queryParams,
      filters: Object.keys(newFilters).length > 0 ? newFilters : null,
      sort: newSort.length > 0 ? newSort : null,
    });

    dismiss();
  };

  const resetFilter = () => {
    setQuery(defaultFilter, true);
    dismiss();
  };

  const filterCount = [
    queryParams.filters ? Object.keys(queryParams.filters).length : 0,
    queryParams.sort ? queryParams.sort.length : 0,
  ].reduce((acc, cur) => acc + cur, 0);

  return (
    <>
      <View className="mb-3 mt-2 flex-row items-center gap-5">
        <View className="flex-1">
          <SearchInput
            placeholder={translate('species.filter.name')}
            value={queryParams.filters?.name ?? ''}
            onChangeText={handleSearchChange}
          />
        </View>
        <Button
          size="default"
          className="h-12 rounded-3xl"
          variant="ghost"
          onPress={handleFilterPress}
        >
          <View className="flex-row items-center gap-1">
            <Filter width={24} height={24} color={colors.primary[500]} />
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

      <SpeciesFilterModal
        modalRef={ref}
        defaultSearchFields={
          Object.keys(queryParams.filters ?? {}) as (keyof FilterSpecies)[]
        }
        defaultField={
          ['name', 'scientificName'].includes(
            queryParams.sort?.[0]?.orderBy ?? ''
          )
            ? (queryParams.sort?.[0]?.orderBy as keyof FilterSpecies)
            : 'name'
        }
        defaultOrder={queryParams.sort?.[0]?.order ?? 'asc'}
        onApply={applyFilter}
        onReset={resetFilter}
      />
    </>
  );
};
