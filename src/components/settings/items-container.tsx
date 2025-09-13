import React from 'react';

import { Text, View } from '@/components/ui';
import type { TxKeyPath } from '@/lib';

type ItemsContainerProps = {
  title?: string;
  tx?: TxKeyPath;
  children: React.ReactNode;
};

export function ItemsContainer({ title, tx, children }: ItemsContainerProps) {
  return (
    <View className="mb-6 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
      {tx ? (
        <Text
          tx={tx}
          className="mb-4 text-xl font-bold text-primary-900 dark:text-neutral-100"
        />
      ) : (
        title && (
          <Text className="mb-4 text-xl font-bold text-primary-900 dark:text-neutral-100">
            {title}
          </Text>
        )
      )}
      {children}
    </View>
  );
}
