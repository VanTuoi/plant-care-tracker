/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';

import type { FilterSpecies, SortSpecies } from '@/api/species/type';
import { translate } from '@/lib';

import { Button, colors } from '../ui';
import { Checkbox, Radio } from '../ui/checkbox';
import { Modal } from '../ui/modal';
import BottomSheetKeyboardAwareScrollView from '../ui/modal-keyboard-aware-scroll-view';

type Option = { label: string; value: string };

type SpeciesFilterModalProps = {
  modalRef: React.RefObject<any>;
  defaultField: keyof FilterSpecies;
  defaultOrder: SortSpecies['order'];
  defaultSearchFields?: (keyof FilterSpecies)[];
  onApply: (
    field: keyof FilterSpecies,
    order: SortSpecies['order'],
    searchFields: (keyof FilterSpecies)[]
  ) => void;
  onReset: () => void;
};

const SEARCH_FIELDS: Option[] = [
  { label: translate('species.filter.name'), value: 'name' },
  {
    label: translate('species.filter.scientificName'),
    value: 'scientificName',
  },
];

const FILTER_FIELDS: Option[] = [
  { label: translate('species.search'), value: 'name' },
  {
    label: translate('species.search.sort_by.scientificName'),
    value: 'scientificName',
  },
];

const SORT_ORDERS: Option[] = [
  { label: translate('species.search.sort_order.asc'), value: 'asc' },
  { label: translate('species.search.sort_order.desc'), value: 'desc' },
];

export const SpeciesFilterModal = ({
  modalRef,
  defaultField,
  defaultOrder,
  defaultSearchFields = [],
  onApply,
  onReset,
}: SpeciesFilterModalProps) => {
  const [selectedField, setSelectedField] = useState(defaultField);
  const [selectedOrder, setSelectedOrder] = useState(defaultOrder);
  const [searchFields, setSearchFields] =
    useState<(keyof FilterSpecies)[]>(defaultSearchFields);

  useEffect(() => {
    if (!modalRef?.current) return;
    setSelectedField(defaultField);
    setSelectedOrder(defaultOrder);
    setSearchFields(defaultSearchFields);
  }, [modalRef?.current?.isOpen]);

  const toggleSearchField = (field: keyof FilterSpecies) => {
    setSearchFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark' ? colors.neutral[200] : colors.primary[50];

  return (
    <Modal
      ref={modalRef}
      snapPoints={['55%']}
      backgroundStyle={{ backgroundColor }}
    >
      <BottomSheetKeyboardAwareScrollView className="px-4 dark:bg-neutral-800">
        <Text className="mb-2 text-base font-semibold dark:text-white">
          {translate('species.search.sort_by.title')}
        </Text>
        <View className="mb-4 gap-2">
          {FILTER_FIELDS.map((item) => (
            <Radio
              key={item.value}
              label={item.label}
              checked={selectedField === item.value}
              onChange={() =>
                setSelectedField(item.value as keyof FilterSpecies)
              }
              accessibilityLabel={item.label}
            />
          ))}
        </View>

        <Text className="mb-2 text-base font-semibold dark:text-white">
          {translate('species.search.sort_order.title')}
        </Text>
        <View className="mb-4 gap-2">
          {SORT_ORDERS.map((item) => (
            <Radio
              key={item.value}
              label={item.label}
              checked={selectedOrder === item.value}
              onChange={() =>
                setSelectedOrder(item.value as SortSpecies['order'])
              }
              accessibilityLabel={item.label}
            />
          ))}
        </View>

        <Text className="mb-2 text-base font-semibold dark:text-white">
          {translate('species.search_by.title')}
        </Text>
        <View className="mb-4 gap-2">
          {SEARCH_FIELDS.map((item) => (
            <Checkbox
              key={item.value}
              label={item.label}
              checked={searchFields.includes(item.value as keyof FilterSpecies)}
              onChange={() =>
                toggleSearchField(item.value as keyof FilterSpecies)
              }
              accessibilityLabel={item.label}
            />
          ))}
        </View>

        <View className="mt-4">
          <Button
            textClassName="dark:text-white"
            label={translate('species.search.button_apply_filter')}
            className="rounded-full bg-primary-500 dark:bg-primary-600"
            onPress={() => onApply(selectedField, selectedOrder, searchFields)}
          />
          <Button
            className="rounded-full"
            label={translate('species.search.button_reset_filter')}
            variant="outline"
            onPress={onReset}
          />
        </View>
      </BottomSheetKeyboardAwareScrollView>
    </Modal>
  );
};
