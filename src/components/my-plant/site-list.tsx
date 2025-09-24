/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';

import { type Plant, type PlantImage, usePlants } from '@/api';
import { type QuerySites, type Site, useSites } from '@/api/sites';
import { Image, Pressable, Text, View } from '@/components/ui';
import { getFileUrl, translate, useQueryParams } from '@/lib';

import { ErrorState } from '../common';
import { LoadingState } from '../common/loading-state';

const defaultFilter: QuerySites = {
  page: 1,
  limit: 10,
  filters: null,
  sort: null,
};

export const SiteList = () => {
  const router = useRouter();
  const { queryParams } = useQueryParams<QuerySites>(defaultFilter);

  const { width } = Dimensions.get('window');
  const IMAGE_HEIGHT = 200;

  const { data, isPending, isError } = useSites({
    variables: queryParams,
  });

  const { data: plantsData } = usePlants({
    variables: {},
  });

  const getPlantImage = (images?: PlantImage[], index: number = 0) => {
    return images && images[index]?.filePath
      ? { uri: getFileUrl(images[index].filePath) }
      : require('@/assets/cactus flower-cuate.png');
  };

  if (isPending) {
    return <LoadingState />;
  }
  if (isError) {
    return <ErrorState />;
  }

  return (
    <View className="flex flex-col justify-start gap-2">
      {data?.data.map((site: Site) => {
        return (
          <Pressable
            key={site.id}
            onPress={() => router.push(`/sites/${site.id}`)}
          >
            <View className="w-full flex-row gap-1">
              <Image
                source={getPlantImage(
                  plantsData?.data.filter((item) => item.siteId === site.id)[0]
                    ?.images,
                  0
                )}
                style={{
                  width: width / 2 - 28,
                  height: IMAGE_HEIGHT,
                  borderTopLeftRadius: 32,
                  borderBottomLeftRadius: 32,
                }}
                className="bg-primary-200"
                resizeMode="cover"
              />

              <View style={{ width: width / 2 - 4 }} className="flex-col gap-1">
                <View className="flex-1 flex-row gap-1">
                  <Image
                    source={getPlantImage(plantsData?.data[0]?.images, 1)}
                    style={{
                      flex: 1,
                      height: IMAGE_HEIGHT / 2 - 2,
                    }}
                    className="bg-primary-200"
                    resizeMode="cover"
                  />
                  <Image
                    source={getPlantImage(plantsData?.data[0]?.images, 3)}
                    style={{
                      flex: 1,
                      height: IMAGE_HEIGHT / 2 - 2,
                      borderTopRightRadius: 32,
                    }}
                    className="bg-primary-200"
                    resizeMode="cover"
                  />
                </View>

                <View className="flex-1 flex-row gap-1">
                  <Image
                    source={getPlantImage(plantsData?.data[0]?.images, 2)}
                    style={{
                      flex: 1,
                      height: IMAGE_HEIGHT / 2 - 2,
                    }}
                    className="bg-primary-200"
                    resizeMode="cover"
                  />
                  <Image
                    source={getPlantImage(plantsData?.data[0]?.images, 3)}
                    style={{
                      flex: 1,
                      height: IMAGE_HEIGHT / 2 - 2,
                      borderBottomRightRadius: 32,
                    }}
                    className="bg-primary-200"
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>

            <View className="flex-row items-start justify-between py-2">
              <View className="flex-col gap-0">
                <Text className="font-signika-bold text-2xl text-primary-800">
                  {site.name}
                </Text>
                <Text className="text-md font-medium text-neutral-600">
                  {
                    plantsData?.data.filter(
                      (item: Plant) => item.siteId === site.id
                    ).length
                  }{' '}
                  {translate('my_plant.site_list.plant_number')}
                </Text>
              </View>
              <Text className="rounded-full bg-danger-200 px-2 py-1 font-signika-bold text-danger-600">
                {
                  plantsData?.data.filter(
                    (item: Plant) => item.siteId === site.id
                  ).length
                }{' '}
                {translate('my_plant.site_list.task')}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
