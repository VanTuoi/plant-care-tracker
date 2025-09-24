import * as React from 'react';

import { Text, View } from '@/components/ui';

interface CareItem {
  icon: JSX.Element;
  title?: string;
  description?: string;
}

interface CareSectionProps {
  label: string;
  items: CareItem[];
}

export const CareSection = ({ label, items }: CareSectionProps) => {
  return (
    <View className="flex-col gap-4 rounded-2xl bg-white p-3 px-5 shadow">
      <Text className="font-signika-bold text-lg text-primary-800">
        {label}
      </Text>
      {items.map((item, idx) => (
        <View key={idx} className="flex-row items-center justify-start gap-3">
          <View className="size-[60px] items-center justify-center rounded-full bg-slate-700">
            {item.icon}
          </View>
          <View className="flex-col">
            {item.title && (
              <Text className="text-lg font-medium text-primary-800">
                {item.title}
              </Text>
            )}
            {item.description && (
              <Text className="text-primary-800">{item.description}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
