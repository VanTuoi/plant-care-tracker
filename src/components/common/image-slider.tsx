import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';

import { colors, Image, View } from '@/components/ui';

type Props = {
  images: string[];
  height?: number;
  children?: React.ReactNode;
};

const screenWidth = Dimensions.get('window').width;

export function ImageSlider({ images, height = 330, children }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerVisible, setViewerVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / e.nativeEvent.layoutMeasurement.width);
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <View className="relative">
      <View style={{ height }}>
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(_, idx) => idx.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                setActiveIndex(index);
                setViewerVisible(true);
              }}
            >
              <Image
                source={{ uri: item }}
                style={{ width: screenWidth, height }}
                resizeMode="cover"
              />
            </Pressable>
          )}
        />
      </View>

      <View className="mt-2 flex-row justify-center gap-2">
        {images.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: 6,
              height: 6,
              borderRadius: 6,
              backgroundColor:
                idx === activeIndex ? colors.primary[800] : colors.primary[300],
            }}
          />
        ))}
      </View>

      <ImageViewing
        images={images.map((uri) => ({ uri }))}
        imageIndex={activeIndex}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        // FooterComponent={() => {}}
      />
      {children}
    </View>
  );
}
