/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { Animated, ScrollView } from 'react-native';

import { Button, colors, showWaningMessage, Text, View } from '../ui';

export type WizardStep = {
  key: string;
  title: string;
  description?: string;
  image: React.ReactNode;
  render: (methods: UseFormReturn<any>) => React.ReactNode;
  optional?: boolean;
};

export function WizardForm<T>({
  steps,
  formSchema,
  onSubmit,
  defaultValues,
}: {
  steps: WizardStep[];
  formSchema: any;
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
}) {
  const cleanDefaults = Object.fromEntries(
    Object.entries(defaultValues ?? {}).filter(
      ([_, v]) => v !== undefined && v !== null && v !== '' && v !== 'undefined'
    )
  );

  const methods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...cleanDefaults } as T,
    mode: 'onChange',
  });
  const { handleSubmit, trigger } = methods;

  const [activeStep, setActiveStep] = useState(0);

  const step = steps[activeStep];

  const next = async () => {
    if (!step.optional) {
      const valid = await trigger(step.key as any);
      if (!valid) {
        showWaningMessage('Chọn ít nhất 1 lựa chọn');
        return;
      }
    }

    if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
    else handleSubmit(onSubmit)();
  };

  const prev = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  return (
    <FormProvider {...methods}>
      <View className="min-h-screen bg-primary-50">
        <View className="px-4 pb-3 pt-6">
          <View className="h-2 overflow-hidden rounded-full bg-primary-100">
            <Animated.View
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                height: '100%',
                borderRadius: 24,
                backgroundColor: colors.primary[800],
              }}
            />
          </View>
          <Text className="mt-4 text-3xl font-bold text-primary-800">
            {step.title}
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>{step.image}</View>

          <View className="mt-6 w-full">{step.render(methods)}</View>
        </ScrollView>

        <View className="absolute inset-x-0 bottom-0 flex-row justify-between gap-4 bg-primary-50 px-6 pb-6">
          <Button
            size="lg"
            disabled={activeStep === 0}
            label="Quay lại"
            onPress={prev}
            variant="default"
            className="flex-1 rounded-full bg-primary-200 text-primary-50"
          />
          <Button
            size="lg"
            variant="default"
            label={activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
            onPress={next}
            className="flex-1 rounded-full bg-primary-800"
          />
        </View>
      </View>
    </FormProvider>
  );
}
