/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';

import { type Plant, usePlant } from '@/api';
import { type QuerySites, type Site, useSites } from '@/api/sites';
import { Image, Pressable, Text, View } from '@/components/ui';
import { translate, useQueryParams } from '@/lib';

const defaultFilter: QuerySites = {
  page: 1,
  limit: 10,
  filters: null,
  sort: null,
};

export const SiteList = () => {
  const router = useRouter();
  const { queryParams } = useQueryParams<QuerySites>(defaultFilter);

  const { data, isPending, isError } = useSites({
    variables: queryParams,
  });

  const { data: plantsData } = usePlant({
    variables: {},
  });

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center pt-5">
        <Text className="text-primary-500">Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex flex-col justify-start gap-2">
        {data?.data.map((site: Site) => {
          return (
            <Pressable
              key={site.id}
              onPress={() => router.push(`/sites/${site.id}`)}
            >
              <View className="w-full flex-row gap-1">
                <Image
                  source={require('@/assets/cactus flower-cuate.png')}
                  className="min-h-[200px] flex-1 bg-primary-200"
                  style={{
                    aspectRatio: 0.5,
                    borderTopLeftRadius: '"12"',
                    borderBottomLeftRadius: '12',
                  }}
                />

                <View className="flex-1 flex-col gap-1">
                  <Image
                    source={require('@/assets/cactus flower-cuate.png')}
                    className="min-h-[50px] flex-1 bg-primary-200"
                    resizeMode="cover"
                  />
                  <Image
                    source={require('@/assets/cactus flower-cuate.png')}
                    className="min-h-[50px] flex-1 bg-primary-200"
                    resizeMode="cover"
                  />
                </View>

                <Image
                  source={require('@/assets/cactus flower-cuate.png')}
                  className="min-h-[200px] flex-1 bg-primary-200"
                  style={{
                    aspectRatio: 0.5,
                    borderTopRightRadius: '12',
                    borderBottomRightRadius: '12',
                  }}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-col">
                  <Text className="text-2xl font-bold text-primary-800">
                    {site.name}
                  </Text>
                  <Text className="text-md font-medium text-neutral-600">
                    {
                      plantsData?.data.filter(
                        (item: Plant) => item.siteId === site.id
                      ).length
                    }{' '}
                    cây
                  </Text>
                </View>
                <Text className="rounded-full p-2 font-bold text-danger-600">
                  {
                    plantsData?.data.filter(
                      (item: Plant) => item.siteId === site.id
                    ).length
                  }{' '}
                  nhiệm vụ
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};
