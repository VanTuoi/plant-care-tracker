/* eslint-disable max-lines-per-function */
import React from 'react';

import { DifficultyLevelEnum, type Plant, SunlightNeedEnum } from '@/api';
import {
  colors,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/components/ui';
import { Plant as PlantIcon, Sun } from '@/components/ui/icons';
import { translate } from '@/lib';

type Props = {
  plant: Plant;
};

export function CareInfoPlant({ plant }: Props) {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [activeSection, setActiveSection] = React.useState<string>('care');
  const [sectionPositions, setSectionPositions] = React.useState<{
    [key: string]: number;
  }>({});

  const handleLayout = (key: string, e: any) => {
    const { y } = e.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, [key]: y }));
  };

  const scrollToSection = (key: string) => {
    if (scrollViewRef.current && sectionPositions[key] !== undefined) {
      scrollViewRef.current.scrollTo({
        y: sectionPositions[key] - 60,
        animated: true,
      });
    }
  };

  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    let current = 'care';
    for (const key of Object.keys(sectionPositions)) {
      if (y >= sectionPositions[key] - 100) {
        current = key;
      }
    }
    setActiveSection(current);
  };

  const sections = [
    {
      key: 'care',
      label: translate('plant.plantDetail.careInfo.sections.care'),
    },
    {
      key: 'area',
      label: translate('plant.plantDetail.careInfo.sections.area'),
    },
  ];

  return (
    <View className="px-4">
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerClassName="flex-col gap-4"
      >
        <View className="w-full rounded-3xl bg-primary-100 p-6">
          <Text className="text-primary-800">
            {translate('plant.plantDetail.careInfo.description')}
          </Text>
        </View>

        <View className="flex-row gap-4">
          {plant?.sunlightNeed && (
            <SpeciesAttribute
              icon={
                SunlightConfig[plant.sunlightNeed as SunlightNeedEnum]?.icon
              }
              label={
                SunlightConfig[plant.sunlightNeed as SunlightNeedEnum]?.label
              }
            />
          )}

          {plant?.difficultyLevel && (
            <SpeciesAttribute
              icon={
                DifficultyConfig[plant.difficultyLevel as DifficultyLevelEnum]
                  ?.icon
              }
              label={
                DifficultyConfig[plant.difficultyLevel as DifficultyLevelEnum]
                  ?.label
              }
            />
          )}
        </View>

        <View className="flex-row flex-wrap gap-2 py-4">
          {sections.map((sec) => {
            const isActive = activeSection === sec.key;
            return (
              <TouchableOpacity
                key={sec.key}
                onPress={() => scrollToSection(sec.key)}
                className={`rounded-full px-4 py-2 ${
                  isActive
                    ? 'bg-primary-800'
                    : 'border border-primary-500 bg-transparent'
                }`}
              >
                <Text
                  className={`font-medium ${
                    isActive ? 'text-white' : 'text-primary-800'
                  }`}
                >
                  {sec.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          onLayout={(e) => handleLayout('care', e)}
          className="flex-col gap-4"
        >
          <View className="mb-8 flex-col gap-1 rounded-3xl bg-white p-4">
            <Text className="py-3 font-signika-bold text-2xl">
              {translate('plant.plantDetail.careInfo.wateringHistory.title')}
            </Text>
            <View
              className="flex-row items-center justify-start gap-4"
              key={plant.id}
            >
              <View className="rounded-full bg-primary-800 p-5">
                <Text className="text-bold size-[24px] text-center text-2xl text-white">
                  3
                </Text>
              </View>
              <View className="flex-col items-start justify-center">
                <Text className="text-lg">
                  {translate(
                    'plant.plantDetail.careInfo.wateringHistory.schedule'
                  )}
                </Text>
                <Text className="text-lg text-primary-300">
                  {translate(
                    'plant.plantDetail.careInfo.wateringHistory.nextTime'
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          onLayout={(e) => handleLayout('area', e)}
          className="flex-col gap-4"
        >
          <View className="mb-8 flex-col gap-1 rounded-3xl bg-white p-4">
            <Text className="py-3 font-signika-bold text-2xl">
              {translate('plant.plantDetail.careInfo.area.title')}
            </Text>
            <View
              className="flex-row items-center justify-center gap-4 py-2"
              key={plant.id}
            >
              <Text></Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export const SunlightConfig: Record<
  SunlightNeedEnum,
  { label: string; icon: JSX.Element }
> = {
  [SunlightNeedEnum.FULL_SUN]: {
    label: translate('plant.species.sunlight.full_sun'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.PARTIAL_SUN]: {
    label: translate('plant.species.sunlight.partial_sun'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.SHADE]: {
    label: translate('plant.species.sunlight.shade'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.UNKNOWN]: {
    label: translate('plant.species.sunlight.unknown'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
};

export const DifficultyConfig: Record<
  DifficultyLevelEnum,
  { label: string; icon: JSX.Element }
> = {
  [DifficultyLevelEnum.EASY]: {
    label: translate('plant.species.difficulty.easy'),
    icon: <PlantIcon height={24} width={24} color={colors.primary[800]} />,
  },
  [DifficultyLevelEnum.MODERATE]: {
    label: translate('plant.species.difficulty.moderate'),
    icon: <PlantIcon height={24} width={24} color={colors.primary[800]} />,
  },
  [DifficultyLevelEnum.HARD]: {
    label: translate('plant.species.difficulty.hard'),
    icon: <PlantIcon height={24} width={24} color={colors.primary[800]} />,
  },
};

type SpeciesAttributeProps = {
  icon: JSX.Element;
  label: string;
};

export function SpeciesAttribute({ icon, label }: SpeciesAttributeProps) {
  return (
    <View className="size-[80] flex-col items-center justify-center rounded-2xl bg-primary-100">
      {icon}
      <Text className="text-center">{label}</Text>
    </View>
  );
}
