import React from 'react';
import { View } from 'react-native';

import { colors, Pressable, Text } from '@/components/ui';
import { ArrowRight } from '@/components/ui/icons';
import type { TxKeyPath } from '@/lib';

type ItemProps = {
  label?: string;
  tx?: TxKeyPath;
  icon?: React.ReactElement;
  iconColor?: string;
  value?: string;
  onPress?: () => void;
  children?: React.ReactNode;
};

export function Item({
  label,
  tx,
  icon,
  iconColor = colors.white,
  value,
  onPress,
  children,
}: ItemProps) {
  const isPressable = typeof onPress === 'function';

  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className="mb-3 flex-row items-center justify-between px-2 py-1"
    >
      <View className="flex-row items-center">
        {icon ? (
          <View className="mr-3 rounded-full bg-primary-500 p-2">
            {React.cloneElement(icon, { color: iconColor })}
          </View>
        ) : null}

        {tx ? (
          <Text
            tx={tx}
            className="text-base font-medium text-primary-800 dark:text-neutral-100"
          />
        ) : (
          label && (
            <Text className="text-base font-medium text-primary-800 dark:text-neutral-100">
              {label}
            </Text>
          )
        )}
      </View>

      <View className="flex-row items-center">
        {value && (
          <Text className="mr-1 text-neutral-600 dark:text-white">{value}</Text>
        )}
        {children}
        {isPressable && (
          <View className="pl-2">
            <ArrowRight />
          </View>
        )}
      </View>
    </Pressable>
  );
}
