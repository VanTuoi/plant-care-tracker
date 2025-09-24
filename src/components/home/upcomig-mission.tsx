/* eslint-disable max-lines-per-function */
import React from 'react';

import { Image, Text, View } from '@/components/ui';
import { translate } from '@/lib';

interface PlantItem {
  imageUrl: string;
  plantName?: string;
  siteName?: string;
  task: string | string[];
}

interface Mission {
  label: string;
  items: PlantItem[];
}

export const UpcomingMission = () => {
  const missions: Mission[] = [
    {
      label: translate('home.upcomingMission.next3Days'),
      items: [
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Cây trầu bà',
          siteName: 'Ban công nhà A',
          task: translate('home.tasks.water'),
        },
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Vạn niên thanh',
          siteName: 'Phòng khách',
          task: translate('home.tasks.fertilize'),
        },
      ],
    },
    {
      label: translate('home.upcomingMission.nextWeek'),
      items: [
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Lưỡi hổ',
          siteName: 'Văn phòng',
          task: [
            translate('home.tasks.fertilize'),
            translate('home.tasks.water'),
          ],
        },
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Kim ngân',
          siteName: 'Phòng khách',
          task: translate('home.tasks.fertilize'),
        },
      ],
    },
  ];

  return (
    <View className="">
      {missions.map((mission, mi) => (
        <View
          key={mi}
          className="mb-6 flex-col gap-4 rounded-3xl bg-white p-3 px-6 shadow"
        >
          <View className="w-full flex-row justify-between py-3">
            <Text className="font-signika-bold text-xl text-primary-800">
              {mission.label}
            </Text>
            <Text className="rounded-full bg-primary-100 px-3 py-1 text-primary-800">
              {translate('home.tasks.count', { count: mission.items.length })}
            </Text>
          </View>

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
                  </View>
                  <View className="w-auto flex-col">
                    {item.plantName && (
                      <Text className="text-lg font-medium text-primary-800">
                        {item.plantName}
                      </Text>
                    )}
                    {item.siteName && (
                      <Text className="text-primary-300">{item.siteName}</Text>
                    )}

                    {Array.isArray(item.task) ? (
                      <View className="mt-1 flex-row gap-2 self-start">
                        {item.task.map((t, idx) => (
                          <Text
                            key={idx}
                            className="rounded-full bg-primary-200 px-2 py-1 text-sm text-primary-800"
                          >
                            {t}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <Text className="mt-1 self-start rounded-full bg-primary-200 px-2 py-1 text-sm text-primary-800">
                        {item.task}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}
          <Text className="text-md px-5 py-3 text-center text-primary-300">
            {translate('home.upcomingMission.completionHint')}
          </Text>
        </View>
      ))}
    </View>
  );
};
