/* eslint-disable unicorn/filename-case */
/* eslint-disable max-lines-per-function */
import * as React from 'react';

import { FocusAwareStatusBar, ScrollView, Text, View } from '@/components/ui';

export default function Edit() {
  return (
    <>
      <FocusAwareStatusBar />

      <View className="flex-1">
        <ScrollView
          className="flex-1 p-2"
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <Text>Edit</Text>
        </ScrollView>
      </View>
    </>
  );
}
