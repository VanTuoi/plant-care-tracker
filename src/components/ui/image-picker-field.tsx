import React from 'react';
import { Text, View } from 'react-native';

import { Image as ImageIcon } from './icons';

// type Props = {
//   onChange?: (uri: string) => void;
//   initialUri?: string;
// };

export function ImagePickerField() {
  return (
    <View style={{ alignItems: 'center' }}>
      <ImageIcon size={36} color="#666" />
      <Text style={{ marginTop: 8, color: '#666' }}>Chọn ảnh</Text>
    </View>
  );
}
