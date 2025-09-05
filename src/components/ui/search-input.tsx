import React from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import { Search } from '../ui/icons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
} & TextInputProps;

export const SearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search',
  ...props
}: Props) => {
  return (
    <View className="relative w-full justify-center">
      <View className="absolute left-2 z-10">
        <Search width={24} height={24} color="#999" />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        className="h-12 w-full rounded-3xl border border-gray-300 pl-9 pr-2 text-black dark:border-gray-500 dark:text-white"
        {...props}
      />
    </View>
  );
};
