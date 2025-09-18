/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import {
  plantFormSchema,
  type PlantFormValues,
  PlantSizeEnum,
  useCreatePlantImage,
  useFileUpload,
  useSites,
} from '@/api';
import { useCreatePlant } from '@/api/plants/use-create-plant';
import {
  colors,
  DatePickerField,
  Image,
  ImagePickerField,
  Input,
  showErrorMessage,
  Text,
} from '@/components/ui';
import { cn } from '@/lib';

import { WizardForm, type WizardStep } from '../common/wizard-form';

const SiteSelector = ({ setValue, watch }: any) => {
  const val = watch('siteId');
  const { data } = useSites({ variables: {} });

  return (
    <View className="gap-3">
      {data?.data.map((site) => (
        <Pressable
          key={site.id}
          className={cn(
            'px-4 py-3 rounded-full items-center',
            val === site.id ? 'bg-primary-800' : 'bg-white'
          )}
          onPress={() => setValue('siteId', site.id)}
        >
          <Text
            className={cn(
              'text-xl',
              val === site.id ? 'text-white' : 'text-primary-800'
            )}
          >
            {site.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const getPlantSteps = (props: AddPlantScreenProps): WizardStep[] => {
  const steps: WizardStep[] = [];

  if (!props.siteId || props.siteId === 'undefined') {
    steps.push({
      key: 'siteId',
      title: 'Bạn muốn đặt cây ở đâu?',
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      render: (p) => <SiteSelector {...p} />,
    });
  }

  steps.push(
    {
      key: 'inGround',
      title: 'Cây của bạn có ở trong chậu không?',
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      render: ({ setValue, watch }) => {
        const val = watch('inGround');

        const getButtonStyle = (option: boolean, isLeftBtn: boolean) =>
          cn(
            'py-4 flex-1 items-center border border-primary-400',
            val === option ? 'bg-primary-800' : 'bg-white',
            isLeftBtn
              ? 'rounded-tl-2xl rounded-br-2xl rounded-bl-2xl'
              : 'rounded-tr-2xl rounded-bl-2xl'
          );

        const getTextStyle = (option: boolean) =>
          cn(
            'text-xl font-bold',
            val === option ? 'text-white' : 'text-primary-500'
          );

        return (
          <View className="mt-4 flex-row gap-4">
            <Pressable
              className={getButtonStyle(false, true)}
              onPress={() => setValue('inGround', false)}
            >
              <Text className={getTextStyle(false)}>Trong chậu</Text>
            </Pressable>

            <Pressable
              className={getButtonStyle(true, false)}
              onPress={() => setValue('inGround', true)}
            >
              <Text className={getTextStyle(true)}>Ngoài đất</Text>
            </Pressable>
          </View>
        );
      },
    },
    {
      key: 'size',
      title: 'Kích thước của cây',
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      render: ({ setValue, watch }) => {
        const val = watch('size');

        const sizes = [
          { key: PlantSizeEnum.TINY, label: 'Rất nhỏ' },
          { key: PlantSizeEnum.SMALL, label: 'Nhỏ' },
          { key: PlantSizeEnum.MEDIUM, label: 'Trung bình' },
          { key: PlantSizeEnum.LARGE, label: 'Lớn' },
          { key: PlantSizeEnum.HUGE, label: 'Khổng lồ' },
        ];

        return (
          <View className="mt-4 w-full gap-3">
            {sizes.map((s) => (
              <Pressable
                key={s.key}
                className={cn(
                  'px-4 py-3 rounded-full items-center',
                  val === s.key ? 'bg-primary-800' : 'bg-white'
                )}
                onPress={() => setValue('size', s.key)}
              >
                <Text
                  className={cn(
                    'text-xl',
                    val === s.key ? 'text-white' : 'text-primary-800'
                  )}
                >
                  {s.label}
                </Text>
              </Pressable>
            ))}
          </View>
        );
      },
    },
    {
      key: 'lastWateredAt',
      title: 'Lần cuối tưới nước',
      optional: true,
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
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
      optional: true,
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
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
      key: 'plantImageUri',
      title: 'Thêm ảnh cây của bạn',
      optional: true,
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      render: ({ setValue, watch }) => (
        <ImagePickerField
          value={watch('plantImageUri')}
          onChange={(uri) => setValue('plantImageUri', uri)}
        />
      ),
    },
    {
      key: 'name',
      title: 'Đặt tên cho cây',
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      optional: false,
      render: ({ control }) => (
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Ví dụ: Cây Lưỡi Hổ"
              placeholderTextColor={colors.primary[500]}
              className="rounded-full bg-primary-200 p-4 text-primary-500"
            />
          )}
        />
      ),
    }
  );

  return steps;
};

type AddPlantScreenProps = {
  speciesId?: string;
  siteId?: string;
};

export default function AddPlantScreen(props: AddPlantScreenProps) {
  const cleanDefaults = Object.fromEntries(
    Object.entries({ ...props }).filter(
      ([_, v]) => v !== undefined && v !== null && v !== '' && v !== 'undefined'
    )
  );

  const router = useRouter();

  const { mutateAsync: createPlant } = useCreatePlant();
  const { mutateAsync: uploadFile } = useFileUpload();
  const { mutateAsync: createPlantImage } = useCreatePlantImage();

  return (
    <WizardForm<PlantFormValues>
      steps={getPlantSteps(props)}
      formSchema={plantFormSchema}
      defaultValues={cleanDefaults}
      onSubmit={async (data) => {
        try {
          const dataSuccess = await createPlant(data);

          if (data.plantImageUri) {
            const res = await uploadFile({ fileUri: data.plantImageUri });
            await createPlantImage({
              plantId: dataSuccess.id,
              fileId: res.file.id,
            });
          }

          if (props.siteId && props.siteId !== 'undefined') {
            router.push(`/sites/${props.siteId}`);
          } else {
            router.push('/my-plant');
          }
        } catch (err) {
          showErrorMessage('Tạo cây thất bại');
          console.error(err);
        }
      }}
    />
  );
}
