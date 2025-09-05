import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { User } from '@/api/user';

import { CaretDown } from '../ui/icons';
import { UserStatusItem } from './user-status-item';

export const UserItem = ({ item }: { item: User }) => {
  const [showDetail, setShowDetail] = useState(false);
  const rotate = useSharedValue(0);
  const detailOpacity = useSharedValue(0);
  const detailScale = useSharedValue(0.95);
  const router = useRouter();

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: 4,
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const detailAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: detailOpacity.value,
      transform: [{ scaleY: detailScale.value }],
    };
  });

  const toggle = () => {
    const next = !showDetail;
    setShowDetail(next);

    rotate.value = withTiming(next ? 90 : 0, { duration: 250 });
    detailOpacity.value = withTiming(next ? 1 : 0, { duration: 250 });
    detailScale.value = withTiming(next ? 1 : 0.95, { duration: 250 });
  };

  return (
    <View className="rounded-xl border border-gray-200 p-2 dark:border-neutral-600 dark:bg-neutral-900">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.push(`/user/${item.id}`)}
          className="flex-1"
        >
          <View className="space-y-1">
            <Text className="text-sm font-bold text-black dark:text-gray-400">
              {`${item.name} (${item.id})`}
            </Text>
            <Text className="text-sm text-black dark:text-gray-400">
              {item.email}
            </Text>
          </View>
        </Pressable>

        <View className="flex-row items-center gap-2">
          <UserStatusItem User={item} />
          <Pressable onPress={toggle} hitSlop={10}>
            <Animated.View style={iconAnimatedStyle}>
              <CaretDown width={14} height={14} color="#999" />
            </Animated.View>
          </Pressable>
        </View>
      </View>

      {showDetail && (
        <Animated.View style={[detailAnimatedStyle]} className="mt-2 space-y-1">
          <Text className="text-sm text-black dark:text-gray-400">
            {item.phone}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};
