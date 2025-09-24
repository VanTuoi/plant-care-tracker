/* eslint-disable max-lines-per-function */
import { Env } from '@env';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { type LoginForm as LoginFormType, loginSchema } from '@/api';
import {
  Button,
  ControlledInput,
  ControlledPasswordInput,
  Image,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib/i18n';

export type LoginFormProps = {
  onSubmit?: SubmitHandler<LoginFormType>;
  errorMessage?: string | null;
  isLoading?: boolean;
};

export const LoginForm = ({
  onSubmit = () => {},
  errorMessage,
  isLoading,
}: LoginFormProps) => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: Env.APP_ENV === 'development' ? 'john.doe@example.com' : '',
      password: Env.APP_ENV === 'development' ? 'secret' : '',
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="mb-6 items-center justify-center">
          <Text className="mb-5 w-full text-center font-signika-bold text-8xl text-green-700">
            Panda
          </Text>
          <Text className="pb-6 text-center font-signika-bold text-4xl">
            {translate('login.title')}
          </Text>
          <Image
            source={require('@/assets/strelitzia plant.png')}
            style={{ width: 250, height: 250 }}
          />
        </View>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label={translate('login.form.email')}
        />
        <ControlledPasswordInput
          testID="password-input"
          control={control}
          name="password"
          label={translate('login.form.password')}
          placeholder="******"
        />
        {errorMessage && (
          <Text className="mb-4 text-left text-sm text-red-500">
            {errorMessage}
          </Text>
        )}
        <View className="w-full items-end">
          <Button
            label={translate('login.forget_password')}
            onPress={() => router.push('/forget-password')}
            variant="link"
            size="sm"
          />
        </View>
        <Button
          variant="secondary"
          loading={isLoading}
          size="lg"
          className="mt-8"
          testID="login-button"
          label={translate('login.button')}
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          variant="outline"
          size="lg"
          className="mt-2"
          testID="login-button"
          label={translate('login.button_register')}
          onPress={() => router.push('/register')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
