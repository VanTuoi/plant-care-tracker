/* eslint-disable max-lines-per-function */
import React from 'react';
import { Controller } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import { plantFormSchema, type PlantFormValues } from '@/api';
import { DatePickerField, Image, Input, Text } from '@/components/ui';
import { cn } from '@/lib';

import { WizardForm, type WizardStep } from './wizard-form';

const plantSteps: WizardStep[] = [
  {
    key: 'inGround',
    title: 'Bạn trồng cây ở đâu?',
    image: (
      <Image
        source={require('@/assets/cactus flower-cuate.png')}
        className="h-1/2 w-full"
      />
    ),
    render: ({ setValue, watch }) => {
      const val = watch('inGround');

      const getButtonStyle = (option: boolean) =>
        cn(
          'px-4 py-3 rounded-full flex-1 items-center',
          val === option ? 'bg-primary-600' : 'bg-white'
        );

      const getTextStyle = (option: boolean) =>
        cn('text-2xl', val === option ? 'text-white' : 'text-primary-800');

      return (
        <View className="mt-4 flex-row gap-4">
          <Pressable
            className={getButtonStyle(false)}
            onPress={() => setValue('inGround', false)}
          >
            <Text className={getTextStyle(false)}>Trong chậu</Text>
          </Pressable>

          <Pressable
            className={getButtonStyle(true)}
            onPress={() => setValue('inGround', true)}
          >
            <Text className={getTextStyle(true)}>Ngoài đất</Text>
          </Pressable>
        </View>
      );
    },
  },
  {
    key: 'lastWateredAt',
    title: 'Lần cuối tưới nước',
    image: (
      <Image
        source={require('@/assets/cactus flower-cuate.png')}
        className="h-1/2 w-full"
      />
    ),
    render: ({ setValue, watch }) => {
      const val = watch('lastWateredAt') ?? new Date();

      return (
        <DatePickerField
          value={val}
          onChange={(date) => setValue('lastWateredAt', date)}
        />
      );
    },
  },
  {
    key: 'lastFertilizedAt',
    title: 'Lần cuối bón phân',
    image: (
      <Image
        source={require('@/assets/cactus flower-cuate.png')}
        className="h-1/2 w-full"
      />
    ),
    render: ({ setValue, watch }) => {
      const val = watch('lastFertilizedAt') ?? new Date();

      return (
        <DatePickerField
          value={val}
          onChange={(date) => setValue('lastFertilizedAt', date)}
        />
      );
    },
  },
  {
    key: 'images',
    title: 'Thêm ảnh cây của bạn',
    image: (
      <Image
        source={require('@/assets/cactus flower-cuate.png')}
        className="h-1/2 w-full"
      />
    ),
    optional: true,
    render: () => {
      return <Text>UI chọn ảnh</Text>;
    },
  },
  {
    key: 'name',
    title: 'Đặt tên cho cây',
    image: (
      <Image
        source={require('@/assets/cactus flower-cuate.png')}
        className="h-1/2 w-full"
      />
    ),
    optional: true,
    render: ({ control }) => (
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Ví dụ: Cây Lưỡi Hổ"
            className="rounded-full bg-primary-200 p-4"
          />
        )}
      />
    ),
  },
];

type AddPlantScreenProps = {
  speciesId?: string;
  siteId?: string;
};

export default function AddPlantScreen({
  speciesId,
  siteId,
}: AddPlantScreenProps) {
  console.log(speciesId, siteId);

  return (
    <WizardForm<PlantFormValues>
      steps={plantSteps}
      formSchema={plantFormSchema}
      onSubmit={(data) => {
        console.log('Plant data:', data);
      }}
    />
  );
}
