import React from 'react';

import { DifficultyLevelEnum, SunlightNeedEnum } from '@/api';
import { colors } from '@/components/ui';
import { Text, View } from '@/components/ui';
import { Plant, Sun } from '@/components/ui/icons';
import { translate } from '@/lib';

export const SunlightConfig: Record<
  SunlightNeedEnum,
  { label: string; icon: JSX.Element }
> = {
  [SunlightNeedEnum.FULL_SUN]: {
    label: translate('species.sunlight.full_sun', 'Nắng nhiều'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.PARTIAL_SUN]: {
    label: translate('species.sunlight.partial_sun', 'Nắng nhẹ'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.SHADE]: {
    label: translate('species.sunlight.shade', 'Bóng râm'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
  [SunlightNeedEnum.UNKNOWN]: {
    label: translate('species.sunlight.unknown', 'Không rõ'),
    icon: <Sun height={24} width={24} color={colors.primary[800]} />,
  },
};

export const DifficultyConfig: Record<
  DifficultyLevelEnum,
  { label: string; icon: JSX.Element }
> = {
  [DifficultyLevelEnum.EASY]: {
    label: translate('species.difficulty.easy', 'Dễ'),
    icon: <Plant height={24} width={24} color={colors.primary[800]} />,
  },
  [DifficultyLevelEnum.MODERATE]: {
    label: translate('species.difficulty.moderate', 'Trung bình'),
    icon: <Plant height={24} width={24} color={colors.primary[800]} />,
  },
  [DifficultyLevelEnum.HARD]: {
    label: translate('species.difficulty.hard', 'Khó'),
    icon: <Plant height={24} width={24} color={colors.primary[800]} />,
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
      <Text className="text-center text-primary-800">{label}</Text>
    </View>
  );
}
