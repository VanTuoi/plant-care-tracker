/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import AddItemModule from '@/components/plant/add-plant-step';
import { FocusAwareStatusBar, ScrollView, View } from '@/components/ui';

export default function AddPlant() {
  const { speciesId, siteId } = useLocalSearchParams<{
    speciesId?: string;
    siteId?: string;
  }>();

  return (
    <>
      <FocusAwareStatusBar />

      <View className="flex-1">
        <ScrollView
          className="flex-1 p-2"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <AddItemModule siteId={siteId} speciesId={speciesId} />
        </ScrollView>
      </View>
    </>
  );
}
