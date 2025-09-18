/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type Plant } from '@/api/plants/type';
import { getFileUrl } from '@/lib';

import { colors, Image } from '../ui';
import { CaretDown } from '../ui/icons';

export const PlantItem = ({ item }: { item: Plant }) => {
  const [showDetail, setShowDetail] = useState(false);
  const rotate = useSharedValue(0);
  const detailOpacity = useSharedValue(0);
  const detailScale = useSharedValue(0.95);
  const router = useRouter();

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    paddingHorizontal: 4,
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const detailAnimatedStyle = useAnimatedStyle(() => ({
    opacity: detailOpacity.value,
    transform: [{ scaleY: detailScale.value }],
  }));

  const toggle = () => {
    const next = !showDetail;
    setShowDetail(next);

    rotate.value = withTiming(next ? 90 : 0, { duration: 250 });
    detailOpacity.value = withTiming(next ? 1 : 0, { duration: 250 });
    detailScale.value = withTiming(next ? 1 : 0.95, { duration: 250 });
  };

  return (
    <View className="rounded-xl py-1">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.push(`/plant/${item.id}`)}
          className="flex-1"
        >
          <View className="flex flex-row items-center justify-start gap-2">
            <View className="size-[75px] items-center justify-center overflow-hidden rounded-full bg-primary-200 p-2">
              {item.images && item.images.length > 0 ? (
                <Image
                  source={{ uri: getFileUrl(item.images[0].filePath) }}
                  className="size-[100px]"
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('@/assets/cactus flower-cuate.png')}
                  style={{ width: 50, height: 50 }}
                />
              )}
            </View>

            <View className="space-y-1">
              <Text className="text-lg text-primary-800 dark:text-gray-400">
                {`${item.name ?? 'Unnamed'}`}
              </Text>
              {item.scientificName && (
                <Text className="text-sm italic text-black dark:text-gray-400">
                  {item.scientificName}
                </Text>
              )}
            </View>
          </View>
        </Pressable>

        <Pressable onPress={toggle} hitSlop={10}>
          <Animated.View style={iconAnimatedStyle}>
            <CaretDown width={14} height={14} color={colors.neutral[600]} />
          </Animated.View>
        </Pressable>
      </View>

      {showDetail && (
        <Animated.View style={[detailAnimatedStyle]} className="mt-2 space-y-1">
          {item.size && (
            <Text className="text-sm text-black dark:text-gray-400">
              Kích thước: {item.size}
            </Text>
          )}
          {item.wateringFrequency && (
            <Text className="text-sm text-black dark:text-gray-400">
              Tưới mỗi {item.wateringFrequency} ngày
            </Text>
          )}
          {item.fertilizingFrequency && (
            <Text className="text-sm text-black dark:text-gray-400">
              Bón phân mỗi {item.fertilizingFrequency} ngày
            </Text>
          )}
          {item.sunlightNeed && (
            <Text className="text-sm text-black dark:text-gray-400">
              Ánh sáng: {item.sunlightNeed}
            </Text>
          )}
        </Animated.View>
      )}
    </View>
  );
};
