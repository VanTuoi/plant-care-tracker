/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import {
  type DifficultyLevelEnum,
  type SunlightNeedEnum,
  useSpeciesDetail,
} from '@/api';
import {
  type FertilizerMethodEnum,
  type FertilizerTypeEnum,
} from '@/api/fertilizers';
import { type WaterEnum } from '@/api/waters';
import { ImageSlider } from '@/components/common/image-slider';
import { CareSection } from '@/components/species/detail/care-section';
import {
  DifficultyConfig,
  SpeciesAttribute,
  SunlightConfig,
} from '@/components/species/detail/species-attribute';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';
import {
  Calendar,
  Fertilizer,
  Heart,
  Home,
  Tag,
  WaterDrop,
} from '@/components/ui/icons';
import { translate } from '@/lib';

export default function SpeciesDetail() {
  const router = useRouter();
  const { id, siteId } = useLocalSearchParams<{ id: string; siteId: string }>();
  const { data, isPending } = useSpeciesDetail({ variables: { id } });

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
        y: sectionPositions[key] - 20,
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

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  const sections = [
    { key: 'care', label: translate('species.care.title', 'Chăm sóc') },
    { key: 'area', label: 'Khu vực' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: data?.name,
          headerTitleAlign: 'center',
        }}
      />

      <FocusAwareStatusBar />

      <ScrollView
        ref={scrollViewRef}
        stickyHeaderIndices={[3]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        className="flex-1 flex-col gap-8 bg-primary-50"
      >
        <ImageSlider
          images={[
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
            'https://trongcay.vn/upload/news/2023/10/18/image-1697600685cay-luoi-ho-3.jpg',
          ]}
          children={
            <View className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-row items-center rounded-2xl bg-yellow-300 px-4 py-2">
              <Home color={colors.primary[800]} size={14} />
              <Text className="text-md ml-2 font-bold text-primary-800">
                {translate('species.location_chip', { count: 1 })}
              </Text>
            </View>
          }
        />

        <View className="flex-col gap-1 px-4 pt-6">
          <Text className="text-3xl font-bold text-primary-800">
            {data?.name}
          </Text>
          <Text className="text-xl text-primary-500">
            {data?.scientificName}
          </Text>
        </View>

        <View className="flex-row gap-4 px-4 pt-4">
          {data?.sunlightNeed && (
            <SpeciesAttribute
              icon={SunlightConfig[data.sunlightNeed as SunlightNeedEnum]?.icon}
              label={
                SunlightConfig[data.sunlightNeed as SunlightNeedEnum]?.label
              }
            />
          )}

          {data?.difficultyLevel && (
            <SpeciesAttribute
              icon={
                DifficultyConfig[data.difficultyLevel as DifficultyLevelEnum]
                  ?.icon
              }
              label={
                DifficultyConfig[data.difficultyLevel as DifficultyLevelEnum]
                  ?.label
              }
            />
          )}
        </View>

        <View className="sticky flex-row flex-wrap gap-2 bg-primary-50 px-4 py-2 pt-4">
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
          className="flex-col gap-4 px-4 pt-4"
        >
          <Text className="text-3xl font-bold text-primary-800">
            {translate('species.care.title', 'Chăm sóc')}
          </Text>

          <CareSection
            label={translate('species.care.watering.title')}
            items={[
              {
                icon: <Calendar color="white" size={32} />,
                title: translate('species.care.watering.frequency', {
                  freq: data?.wateringFrequency,
                }),
              },
              {
                icon: <WaterDrop color="white" size={32} />,
                title: translate('species.care.watering.amount', {
                  amount: data?.wateringAmount,
                }),
                description: translate('species.care.watering.method', {
                  method: translate(
                    `species.care.watering.watering_method.${data?.wateringMethod as WaterEnum}`
                  ),
                }),
              },
            ]}
          />

          <CareSection
            label={translate('species.care.fertilizing.title', 'Bón phân')}
            items={[
              {
                icon: <Calendar color="white" size={32} />,
                title: translate('species.care.fertilizing.frequency', {
                  freq: data?.fertilizingFrequency,
                }),
              },
              {
                icon: <Fertilizer color="white" size={32} />,
                title: translate('species.care.fertilizing.amount', {
                  amount: data?.fertilizingAmount,
                }),
                description: translate('species.care.fertilizing.method', {
                  method: translate(
                    `species.care.fertilizing.fertilizing_method.${data?.fertilizingMethod as FertilizerMethodEnum}`
                  ),
                }),
              },
              {
                icon: <Tag color="white" size={32} />,
                title: translate('species.care.fertilizing.type', {
                  type: translate(
                    `species.care.fertilizing.fertilizer_type.${data?.fertilizerType as FertilizerTypeEnum}`
                  ),
                }),
              },
            ]}
          />
        </View>

        <View
          onLayout={(e) => handleLayout('area', e)}
          className="min-h-screen flex-col gap-8 px-4 pt-4"
        >
          <Text className="text-3xl font-bold text-primary-800">Khu vực</Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 w-full flex-row items-center gap-5 bg-primary-100 p-5">
        <Button
          onPress={() =>
            router.push(`/plant/add-plant/${data?.id}?siteId=${siteId}`)
          }
          variant="secondary"
          label={translate('species.add_plant')}
          size="lg"
          className="h-[45] flex-1 rounded-full bg-primary-800"
        />
        <Heart size={32} color={colors.primary[800]} />
      </View>
    </>
  );
}
