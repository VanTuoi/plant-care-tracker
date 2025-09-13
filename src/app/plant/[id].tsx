/* eslint-disable max-lines-per-function */
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { FocusAwareStatusBar, ScrollView, Text, View } from '@/components/ui';

export default function Plant() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <FocusAwareStatusBar />

      <View className="flex-1">
        <ScrollView
          className="flex-1 p-2"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <Text>{id}</Text>
        </ScrollView>
      </View>
    </>
  );
}
