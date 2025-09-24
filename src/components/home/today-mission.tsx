/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { colors, Image, Text, View } from '@/components/ui';
import { Check } from '@/components/ui/icons/check';
import { cn } from '@/lib';
import { translate } from '@/lib';

interface PlantItem {
  imageUrl: string;
  plantName?: string;
  siteName?: string;
  overdueText?: string;
}

interface Mission {
  label: string;
  items: PlantItem[];
}

export const TodayMission = () => {
  const missions: Mission[] = [
    {
      label: translate('home.todayMission.watering'),
      items: [
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Cây trầu bà',
          siteName: 'Ban công nhà A',
          overdueText: '',
        },
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Vạn niên thanh',
          siteName: 'Phòng khách',
          overdueText: translate('home.todayMission.lateDays', { days: 5 }),
        },
      ],
    },
    {
      label: translate('home.todayMission.fertilizing'),
      items: [
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Lưỡi hổ',
          siteName: 'Văn phòng',
          overdueText: translate('home.todayMission.lateDays', { days: 2 }),
        },
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Kim ngân',
          siteName: 'Phòng khách',
          overdueText: '',
        },
      ],
    },
  ];

  const [completed, setCompleted] = useState<boolean[][]>(
    missions.map((m) => Array(m.items.length).fill(false))
  );

  const toggleComplete = (missionIndex: number, itemIndex: number) => {
    setCompleted((prev) =>
      prev.map((mission, mi) =>
        mi === missionIndex
          ? mission.map((c, ii) => (ii === itemIndex ? !c : c))
          : mission
      )
    );
  };

  return (
    <View className="">
      {missions.map((mission, mi) => (
        <View
          key={mi}
          className="mb-6 flex-col gap-4 rounded-3xl bg-white p-3 px-6 shadow"
        >
          <Text className="py-3 font-signika-bold text-xl text-primary-800">
            {mission.label}
          </Text>
          {mission.items.map((item, ii) => (
            <View
              key={ii}
              className="flex-row items-center justify-start gap-3"
            >
              <View className="flex w-full flex-row items-center justify-between">
                <View className="flex-row items-center justify-center gap-3">
                  <View className="size-[60px] items-center justify-center rounded-full bg-primary-300">
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: 60, height: 60, borderRadius: 999 }}
                      resizeMode="cover"
                    />
                    {item.overdueText && (
                      <View className="absolute bottom-0 rounded-full bg-danger-200 p-1 px-2">
                        <Text className="text-xs text-danger-800">
                          {item.overdueText}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-col">
                    {item.plantName && (
                      <Text className="text-lg font-medium text-primary-800">
                        {item.plantName}
                      </Text>
                    )}
                    {item.siteName && (
                      <Text className="text-primary-300">{item.siteName}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => toggleComplete(mi, ii)}
                  className={cn(
                    'size-9 items-center justify-center rounded-full border border-primary-800',
                    completed[mi][ii] ? 'bg-primary-800' : ''
                  )}
                >
                  {completed[mi][ii] && (
                    <Check size={18} color={colors.white} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Text className="text-md px-5 py-3 text-center text-primary-300">
            {translate('home.todayMission.completionHint')}
          </Text>
        </View>
      ))}
    </View>
  );
};
