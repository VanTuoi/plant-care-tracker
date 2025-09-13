/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { type Plant } from '@/api/plants/type';

import { Image } from '../ui';

export const PlantItem = ({ item }: { item: Plant }) => {
  const router = useRouter();

  return (
    <View className="rounded-xl py-1">
      <Pressable
        onPress={() => router.push(`/plant/${item.id}`)}
        className="flex-1"
      >
        <View className="flex flex-row items-center justify-start gap-2">
          <View className="size-[75px] items-center justify-center overflow-hidden rounded-full bg-primary-200 p-2">
            {item.images && item.images.length > 0 ? (
              <Image
                source={{ uri: item.images[0].filePath }}
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
    </View>
  );
};
