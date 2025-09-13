import { FlashList as NFlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import { translate } from '@/lib';

import colors from './colors';
import { NoData } from './icons';
import { Text } from './text';
type Props = {
  isLoading: boolean;
};

export const List = NFlashList;

export const EmptyList = React.memo(({ isLoading }: Props) => {
  return (
    <View className="min-h-[512px] flex-1 items-center justify-center">
      {!isLoading && (
        <View className="flex flex-col items-center justify-center">
          <NoData size={64} color={colors.primary[800]} />
          <Text className="mt-5 text-center text-lg font-bold text-primary-800">
            {translate('common.no_data')}
          </Text>
        </View>
      )}
    </View>
  );
});
