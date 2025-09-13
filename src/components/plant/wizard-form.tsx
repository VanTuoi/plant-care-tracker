/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { Animated, Dimensions, ScrollView } from 'react-native';

import { Button, colors, Text, View } from '../ui';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
}: {
  steps: WizardStep[];
  formSchema: any;
  onSubmit: (data: T) => void;
}) {
  const methods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {} as T,
  });
  const { handleSubmit } = methods;

  const [activeStep, setActiveStep] = useState(0);

  const next = () => {
    if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
    else handleSubmit(onSubmit)();
  };
  const prev = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const step = steps[activeStep];

  return (
    <FormProvider {...methods}>
      <View className="flex-1 bg-primary-50">
        <View className="px-4 pb-3 pt-6">
          <Text className="text-3xl font-bold text-primary-800">
            {step.title}
          </Text>
          <View className="mt-2 h-3 overflow-hidden rounded-full bg-primary-100">
            <Animated.View
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                height: '100%',
                backgroundColor: colors.primary[800],
              }}
            />
          </View>
        </View>

        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{ height: SCREEN_HEIGHT - 160 }}
        >
          <View className="flex-1 items-start justify-start px-6">
            {step.image}
            <View className="mt-6 w-full">{step.render(methods)}</View>
          </View>
        </ScrollView>

        <View className="flex-row justify-between gap-4 px-6">
          <Button
            size="lg"
            disabled={activeStep === 0}
            label="Quay lại"
            onPress={prev}
            variant="default"
            className=" flex-1 rounded-full bg-primary-200 text-primary-50"
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
