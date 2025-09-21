import React from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';

import colors from './colors';
import { Search2 } from './icons/search-2';

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
      <View className="absolute left-5 z-10" pointerEvents="none">
        <Search2 width={18} height={18} color={colors.primary[500]} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.primary[500]}
        className="h-12 w-full rounded-full border border-primary-100 bg-primary-100 pl-11 pr-2  dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        {...props}
      />
    </View>
  );
};
