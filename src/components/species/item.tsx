/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type DifficultyLevelEnum, type Species } from '@/api/species/type';
import { cn } from '@/lib';

import { colors, Image } from '../ui';
import { CaretDown } from '../ui/icons';

const difficultyColors: Record<
  DifficultyLevelEnum,
  { bg: string; text: string }
> = {
  easy: {
    bg: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-800 dark:text-green-200',
  },
  moderate: {
    bg: 'bg-yellow-100 dark:bg-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
  },
  hard: {
    bg: 'bg-red-100 dark:bg-red-900',
    text: 'text-red-800 dark:text-red-200',
  },
};

const Chip = ({
  label,
  bg,
  textColor,
}: {
  label: string;
  bg?: string;
  textColor?: string;
}) => (
  <View
    className={`rounded-full px-3 py-1 ${bg ?? 'bg-gray-200'} `}
    style={{ alignSelf: 'flex-start' }}
  >
    <Text className={`text-sm ${textColor ?? 'text-black'}`}>{label}</Text>
  </View>
);

function renderDifficultyChip(level: DifficultyLevelEnum) {
  const color = difficultyColors[level];
  if (!color) return null;
  const label =
    level === 'easy'
      ? 'Dễ chăm sóc'
      : level === 'moderate'
        ? 'Trung bình'
        : 'Khó chăm sóc';
  return <Chip label={label} bg={color.bg} textColor={color.text} />;
}

type SpeciesItemProps = {
  item: Species;
  siteId?: string;
};

export const SpeciesItem = ({ item, siteId }: SpeciesItemProps) => {
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
          className="flex-1"
          onPress={() => router.push(`/species/${item.id}?siteId=${siteId}`)}
        >
          <View
            className={cn(
              'flex flex-row justify-start gap-2',
              showDetail ? 'items-start' : 'items-center'
            )}
          >
            <View className="size-[75px] items-center justify-center overflow-hidden rounded-full bg-primary-200 p-2">
              <Image
                source={require('@/assets/cactus flower-cuate.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View>
              <View className="space-y-1">
                <Text className="text-lg text-primary-800 dark:text-gray-400">
                  {`${item.name ?? 'Unnamed'}`}
                </Text>
                {item.scientificName && (
                  <Text className="text-md italic text-black dark:text-gray-400">
                    {'(' + item.scientificName + ')'}
                  </Text>
                )}
                {item.difficultyLevel &&
                  renderDifficultyChip(item.difficultyLevel)}
              </View>
              {showDetail && (
                <Animated.View
                  style={[detailAnimatedStyle]}
                  className="mt-1 flex-col flex-wrap gap-1"
                >
                  {item.wateringFrequency && (
                    <Text className="text-sm text-black dark:text-gray-400">
                      Tưới {item.wateringFrequency} ngày/lần
                    </Text>
                  )}
                  {item.fertilizingFrequency && (
                    <Text className="text-sm text-black dark:text-gray-400">
                      Bón phân {item.fertilizingFrequency} ngày/lần
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
          </View>
        </Pressable>

        <Pressable onPress={toggle} hitSlop={10}>
          <Animated.View style={iconAnimatedStyle}>
            <CaretDown width={14} height={14} color={colors.neutral[600]} />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};
