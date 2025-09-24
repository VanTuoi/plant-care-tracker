/* eslint-disable unicorn/filename-case */
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { AddPlantScreen } from '@/components/plant';
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
        <ScrollView className="flex-1 p-2">
          <AddPlantScreen siteId={siteId} speciesId={speciesId} />
        </ScrollView>
      </View>
    </>
  );
}
