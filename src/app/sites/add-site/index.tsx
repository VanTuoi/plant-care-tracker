/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import AddSiteScreen from '@/components/sites/add-site-step';
import { FocusAwareStatusBar, ScrollView, View } from '@/components/ui';

export default function AddPlant() {
  const { templateSiteId } = useLocalSearchParams<{
    templateSiteId?: string;
  }>();

  return (
    <>
      <FocusAwareStatusBar />

      <View className="flex-1">
        <ScrollView
          className="flex-1 p-2"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <AddSiteScreen templateSiteId={templateSiteId} />
        </ScrollView>
      </View>
    </>
  );
}
