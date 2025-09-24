/* eslint-disable max-lines-per-function */
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { translate } from '@/lib';

import { Button } from './button';
import colors from './colors';
import { Camera, GalleryHorizontal } from './icons';
import { Modal, useModal } from './modal';

type Props = {
  onChange?: (uri: string) => void;
  value?: string;
  className?: string;
};

export function ImagePickerField({ onChange, value, className }: Props) {
  const [imageUri, setImageUri] = useState(value);

  const { ref, present, dismiss } = useModal();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark' ? colors.neutral[200] : colors.primary[50];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onChange?.(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onChange?.(result.assets[0].uri);
    }
  };

  return (
    <View className="w-full items-center p-1">
      <TouchableOpacity
        onPress={present}
        className={`h-[150px] w-full items-center justify-center overflow-hidden rounded-xl
        ${imageUri ? '' : 'border border-dashed border-primary-200 bg-primary-100'}
        ${className ?? ''}`}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="size-full rounded-xl" />
        ) : (
          <Camera size={40} color={colors.primary[900]} />
        )}
      </TouchableOpacity>

      <Modal
        ref={ref}
        snapPoints={['32%']}
        backgroundStyle={{ backgroundColor }}
      >
        <View className="flex-col items-start gap-4 px-4">
          <Text className="pb-2 font-signika-bold text-2xl text-primary-800">
            {translate('common.imagePicker.title')}
          </Text>
          <View className="flex-col gap-3">
            <TouchableOpacity
              onPress={async () => {
                dismiss();
                await takePhoto();
              }}
              className="flex-row items-center justify-start gap-2"
            >
              <View className="rounded-full bg-primary-100 p-3">
                <Camera size={24} color={colors.primary[800]} />
              </View>
              <Text className="font-medium text-primary-900">
                {translate('common.imagePicker.camera')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                dismiss();
                await pickImage();
              }}
              className="flex-row items-center justify-start gap-2"
            >
              <View className="rounded-full bg-primary-100 p-3">
                <GalleryHorizontal size={24} color={colors.primary[800]} />
              </View>
              <Text className="font-medium text-primary-900">
                {translate('common.imagePicker.gallery')}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            label={translate('common.button.cancel')}
            variant="default"
            textClassName="font-signika-bold text-primary-50 dark:text-white"
            className="w-full rounded-full border-gray-200 bg-primary-800 dark:bg-gray-800"
            size="lg"
            onPress={dismiss}
          />
        </View>
      </Modal>
    </View>
  );
}
