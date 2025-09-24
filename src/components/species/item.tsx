/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';

import { type DifficultyLevelEnum, type Species } from '@/api/species/type';
import { type SunlightNeedEnum } from '@/api/species/type';
import { colors, Pressable, Text, View } from '@/components/ui';
import { translate } from '@/lib';

import { Image } from '../ui';
import { Cloud, PartialSun, Sun } from '../ui/icons';

const difficultyColors: Record<
  DifficultyLevelEnum,
  { bg: string; text: string }
> = {
  easy: {
    bg: 'bg-primary-100 dark:bg-primary-900',
    text: 'text-primary-800 dark:text-primary-200',
  },
  moderate: {
    bg: 'bg-warning-200 dark:bg-warning-800',
    text: 'text-warning-800 dark:text-warning-200',
  },
  hard: {
    bg: 'bg-red-200 dark:bg-red-900',
    text: 'text-red-900 dark:text-red-200',
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
    className={`rounded-full px-3 py-[5px] ${bg ?? 'bg-gray-200'} `}
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
      ? translate('species.difficulty.easy')
      : level === 'moderate'
        ? translate('species.difficulty.moderate')
        : translate('species.difficulty.hard');
  return <Chip label={label} bg={color.bg} textColor={color.text} />;
}

function renderSunlightChip(level: SunlightNeedEnum) {
  let Icon: React.ComponentType<{ size?: number; color?: string }> | null =
    null;

  switch (level) {
    case 'full_sun':
      Icon = Sun;
      break;
    case 'partial_sun':
      Icon = PartialSun;
      break;
    case 'shade':
      Icon = Cloud;
      break;
    case 'unknown':
      Icon = null;
      break;
  }

  return (
    <View className={` rounded-full bg-primary-100 px-3 py-[5px]`}>
      {Icon && <Icon size={18} color={colors.primary[800]} />}
    </View>
  );
}

type SpeciesItemProps = {
  item: Species;
  siteId?: string;
};

export const SpeciesItem = ({ item, siteId }: SpeciesItemProps) => {
  const router = useRouter();

  return (
    <View className="rounded-xl px-3 py-1">
      <View className="flex-row items-center justify-between">
        <Pressable
          className="flex-1"
          onPress={() => router.push(`/species/${item.id}?siteId=${siteId}`)}
        >
          <View className={'flex flex-row items-center justify-start gap-4'}>
            <View className="size-[75px] items-center justify-center overflow-hidden rounded-full bg-primary-200 p-2">
              <Image
                source={require('@/assets/cactus flower-cuate.png')}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <View className="space-y-1">
              <Text className="font-base text-lg text-primary-800 dark:text-gray-400">
                {`${item.name ?? 'Unnamed'}`}
              </Text>
              {item.scientificName && (
                <Text className="pb-1 text-lg text-primary-300 dark:text-gray-400">
                  {'(' + item.scientificName + ')'}
                </Text>
              )}
              <View className="flex-row gap-2">
                {item.difficultyLevel &&
                  renderDifficultyChip(item.difficultyLevel)}
                {item.sunlightNeed && renderSunlightChip(item.sunlightNeed)}
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
