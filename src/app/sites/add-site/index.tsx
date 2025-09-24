import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { AddSiteScreen } from '@/components/sites';
import { FocusAwareStatusBar, ScrollView, View } from '@/components/ui';

export default function AddSite() {
  const { templateSiteId } = useLocalSearchParams<{
    templateSiteId?: string;
  }>();

  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex-1">
        <ScrollView className="flex-1 p-2">
          <AddSiteScreen templateSiteId={templateSiteId} />
        </ScrollView>
      </View>
    </>
  );
}
