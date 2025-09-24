/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { translate } from '@/lib';

import { Button } from '../ui';
import { Checkbox, Radio } from '../ui/checkbox';
import { Modal } from '../ui/modal';
import BottomSheetKeyboardAwareScrollView from '../ui/modal-keyboard-aware-scroll-view';

type Option = { label: string; value: string };

type FilterModalProps = {
  modalRef: React.RefObject<any>;
  defaultField: string;
  defaultOrder: string;
  defaultSearchFields?: string[];
  onApply: (field: string, order: string, searchFields: string[]) => void;
  onReset: () => void;
};

const SEARCH_FIELDS: Option[] = [
  { label: 'Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Phone number', value: 'phone' },
];

const FILTER_FIELDS: Option[] = [
  { label: 'ID', value: 'id' },
  { label: 'Name', value: 'name' },
  { label: 'Phone number', value: 'phone' },
];

const SORT_ORDERS: Option[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

export const FilterModal = ({
  modalRef,
  defaultField,
  defaultOrder,
  defaultSearchFields = [],
  onApply,
  onReset,
}: FilterModalProps) => {
  const [selectedField, setSelectedField] = useState(defaultField);
  const [selectedOrder, setSelectedOrder] = useState(defaultOrder);
  const [searchFields, setSearchFields] =
    useState<string[]>(defaultSearchFields);

  useEffect(() => {
    if (!modalRef?.current) return;
    setSelectedField(defaultField);
    setSelectedOrder(defaultOrder);
    setSearchFields(defaultSearchFields);
  }, [modalRef?.current?.isOpen]);

  const toggleSearchField = (field: string) => {
    setSearchFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#262626' : '#ffffff';

  return (
    <Modal
      ref={modalRef}
      snapPoints={['60%']}
      backgroundStyle={{ backgroundColor }}
    >
      <BottomSheetKeyboardAwareScrollView className="px-4 dark:bg-neutral-800">
        <Text className="mb-2 text-base font-semibold dark:text-white">
          {translate('plant.search.sort_by')}
        </Text>
        <View className="mb-4 gap-2">
          {FILTER_FIELDS.map((item) => (
            <Radio
              key={item.value}
              label={item.label}
              checked={selectedField === item.value}
              onChange={() => setSelectedField(item.value)}
              accessibilityLabel={item.label}
            />
          ))}
        </View>
        <Text className="mb-2 text-base font-semibold dark:text-white">
          {translate('plant.search.order')}
        </Text>
        <View className="mb-4 gap-2">
          {SORT_ORDERS.map((item) => (
            <Radio
              key={item.value}
              label={item.label}
              checked={selectedOrder === item.value}
              onChange={() => setSelectedOrder(item.value)}
              accessibilityLabel={item.label}
            />
          ))}
        </View>
        <Text className="mb-2 text-base font-semibold dark:text-white">
          {translate('plant.search.search_by')}
        </Text>
        <View className="mb-4 gap-2">
          {SEARCH_FIELDS.map((item) => (
            <Checkbox
              key={item.value}
              label={item.label}
              checked={searchFields.includes(item.value)}
              onChange={() => toggleSearchField(item.value)}
              accessibilityLabel={item.label}
            />
          ))}
        </View>
        <View className="mt-4">
          <Button
            textClassName="dark:text-white"
            label={translate('plant.search.button_apply_filter')}
            className="bg-primary-500 dark:bg-primary-600"
            onPress={() => onApply(selectedField, selectedOrder, searchFields)}
          />
          <Button
            label={translate('plant.search.button_reset_filter')}
            variant="outline"
            onPress={onReset}
          />
        </View>
      </BottomSheetKeyboardAwareScrollView>
    </Modal>
  );
};
