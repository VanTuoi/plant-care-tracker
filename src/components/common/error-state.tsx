import React from 'react';

import { Text, View } from '@/components/ui';
import { translate } from '@/lib';

type ErrorStateProps = {
  message?: string;
};

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">
        {message || translate('common.error_load')}
      </Text>
    </View>
  );
}
