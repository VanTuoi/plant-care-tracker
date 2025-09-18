/* eslint-disable max-lines-per-function */
import React from 'react';

import { Image, Text, View } from '@/components/ui';

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
      label: '3 Ngày tới',
      items: [
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Cây trầu bà',
          siteName: 'Ban công nhà A',
          task: 'water',
        },
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Vạn niên thanh',
          siteName: 'Phòng khách',
          task: 'fertilizers',
        },
      ],
    },
    {
      label: '1 Tuần tới',
      items: [
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Lưỡi hổ',
          siteName: 'Văn phòng',
          task: ['fertilizers', 'water'], // 👈 cũng ok
        },
        {
          imageUrl:
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          plantName: 'Kim ngân',
          siteName: 'Phòng khách',
          task: 'fertilizers',
        },
      ],
    },
  ];

  return (
    <View className="px-4 py-2">
      {missions.map((mission, mi) => (
        <View
          key={mi}
          className="mb-6 flex-col gap-4 rounded-3xl bg-white p-3 px-6 shadow"
        >
          <View className="w-full flex-row justify-between py-3">
            <Text className="text-xl font-bold text-primary-800">
              {mission.label}
            </Text>
            <Text className="rounded-full bg-primary-100 px-3 py-1 text-primary-800">
              {mission.items.length} tasks
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
            Hoàn thành nhiệm vụ bằng cách nhấn vào chỉ dẫn
          </Text>
        </View>
      ))}
    </View>
  );
};
