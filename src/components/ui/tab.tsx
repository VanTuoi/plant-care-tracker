import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { cn } from '@/lib';

import { Text } from './text';

type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
};

interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export const Tabs = ({
  tabs,
  value: controlledValue,
  onChange,
  defaultValue,
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? tabs[0]?.value
  );
  const value = controlledValue ?? internalValue;

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <View className="pt-4">
      <View className="flex-row self-center rounded-full bg-primary-100 p-2">
        {tabs.map((tab) => {
          const selected = value === tab.value;
          return (
            <Pressable
              key={tab.value}
              onPress={() => handleChange(tab.value)}
              className={cn(
                'rounded-full px-4 py-3 mx-1 items-center justify-center',
                selected ? 'bg-primary-800' : 'bg-transparent'
              )}
            >
              <Text
                className={cn(
                  'font-semibold',
                  selected ? 'text-primary-200' : 'text-primary-500'
                )}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4">
        {tabs.find((t) => t.value === value)?.content}
      </View>
    </View>
  );
};
