import React from 'react';
import { ActivityIndicator } from 'react-native';

import { colors, View } from '@/components/ui';

export function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center pt-10">
      <ActivityIndicator size="large" color={colors.primary[500]} />
    </View>
  );
}
