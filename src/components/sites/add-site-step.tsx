/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Pressable, View } from 'react-native';

import {
  siteFormSchema,
  type SiteFormValues,
  Sunlight,
  useCreateSite,
  useTemplateSites,
} from '@/api';
import { colors, Image, Input, showErrorMessage, Text } from '@/components/ui';
import { cn } from '@/lib';

import { WizardForm, type WizardStep } from '../common/wizard-form';

const TemplateSiteSelector = ({ setValue, watch }: any) => {
  const { data } = useTemplateSites({ variables: {} });
  const val = watch('templateSiteId');
  return (
    <View className="gap-3">
      {data?.data.map((templateSite) => (
        <Pressable
          key={templateSite.id}
          className={cn(
            'px-4 py-3 rounded-full items-center',
            val === templateSite.id ? 'bg-primary-800' : 'bg-white'
          )}
          onPress={() => setValue('templateSiteId', templateSite.id)}
        >
          <Text
            className={cn(
              'text-xl',
              val === templateSite.id ? 'text-white' : 'text-primary-800'
            )}
          >
            {templateSite.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const getSiteSteps = (): WizardStep[] => {
  const steps: WizardStep[] = [];

  steps.push(
    {
      key: 'templateSiteId',
      title: 'Khu vực trồng cây của bạn là?',
      optional: false,
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      render: (p) => <TemplateSiteSelector {...p} />,
    },
    {
      key: 'sunlight',
      title: 'Nơi này có ánh sáng thế nào?',
      optional: false,
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
        />
      ),
      render: ({ setValue, watch }) => {
        const val = watch('sunlight');

        const options = [
          { key: Sunlight.FULL_SUN, label: 'Nắng gắt' },
          { key: Sunlight.PARTIAL_SUN, label: 'Nắng một phần' },
          { key: Sunlight.SHADE, label: 'Bóng râm' },
          { key: Sunlight.UNKNOWN, label: 'Không rõ' },
        ];

        return (
          <View className="mt-4 w-full gap-3">
            {options.map((o) => (
              <Pressable
                key={o.key}
                className={cn(
                  'px-4 py-3 rounded-full items-center',
                  val === o.key ? 'bg-primary-800' : 'bg-white'
                )}
                onPress={() => setValue('sunlight', o.key)}
              >
                <Text
                  className={cn(
                    'text-xl',
                    val === o.key ? 'text-white' : 'text-primary-800'
                  )}
                >
                  {o.label}
                </Text>
              </Pressable>
            ))}
          </View>
        );
      },
    },
    {
      key: 'name',
      title: 'Đặt tên cho khu vực',
      image: (
        <Image
          source={require('@/assets/cactus flower-cuate.png')}
          style={{ width: '100%', aspectRatio: 1 }}
          resizeMode="cover"
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
              placeholder="Ví dụ: Tầng 2"
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

type AddSiteScreenProps = {
  templateSiteId?: string;
};

export default function AddSiteScreen(props: AddSiteScreenProps) {
  const cleanDefaults = Object.fromEntries(
    Object.entries({ ...props }).filter(
      ([_, v]) => v !== undefined && v !== null && v !== '' && v !== 'undefined'
    )
  );
  const router = useRouter();
  const createSite = useCreateSite();

  return (
    <WizardForm<SiteFormValues>
      steps={getSiteSteps()}
      formSchema={siteFormSchema}
      defaultValues={cleanDefaults}
      onSubmit={(data) => {
        createSite.mutate(data, {
          onSuccess: (_) => {
            router.replace('/my-plant');
          },
          onError: (err) => {
            showErrorMessage('Tạo khu vực thất bại');
            console.error(err);
          },
        });
      }}
    />
  );
}
