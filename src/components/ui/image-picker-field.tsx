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
        snapPoints={['30%']}
        backgroundStyle={{ backgroundColor }}
      >
        <View className="flex-col items-center gap-3 px-4">
          <Text className="pb-2 text-xl font-bold">Chọn ảnh</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={async () => {
                dismiss();
                await takePhoto();
              }}
              className="flex-1 flex-row items-center justify-start gap-2 rounded-full bg-primary-50 p-1"
            >
              <View className="rounded-full bg-white p-3">
                <Camera size={24} color={colors.primary[800]} />
              </View>
              <Text className="font-medium text-primary-900">
                Chụp từ Camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                dismiss();
                await pickImage();
              }}
              className="flex-1 flex-row items-center justify-start gap-2 rounded-full bg-primary-50 p-1"
            >
              <View className="rounded-full bg-white p-3">
                <GalleryHorizontal size={24} color={colors.primary[800]} />
              </View>
              <Text className="font-medium text-primary-900">
                Chọn từ Thư viện
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            label="Huỷ"
            variant="default"
            textClassName="font-bold text-black dark:text-white"
            className="mt-10 w-full rounded-full border-gray-200 bg-gray-50 dark:bg-gray-800"
            size="lg"
            onPress={dismiss}
          />
        </View>
      </Modal>
    </View>
  );
}
