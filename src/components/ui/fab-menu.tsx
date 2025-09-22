/* eslint-disable max-lines-per-function */
import React, { type ReactNode, useState } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/lib';

import colors from './colors';
import { Plus } from './icons';

export type FabItem = {
  icon: ReactNode;
  label?: string;
  backgroundColor?: string;
  onPress?: () => void;
};

type FabMenuProps = {
  items: FabItem[];
  bottom?: number;
  right?: number;
  top?: number;
  left?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

export function FabMenu({
  items,
  bottom,
  right,
  top,
  left,
  position,
}: FabMenuProps) {
  const [open, setOpen] = useState(false);
  const progress = useSharedValue(0);

  const toggle = () => {
    setOpen(!open);
    progress.value = withTiming(!open ? 1 : 0, { duration: 300 });
  };

  const getPositionStyle = (): ViewStyle => {
    const style: ViewStyle = {};
    if (position) {
      switch (position) {
        case 'top-left':
          style.top = 20;
          style.left = 20;
          break;
        case 'top-right':
          style.top = 20;
          style.right = 20;
          break;
        case 'bottom-left':
          style.bottom = 20;
          style.left = 20;
          break;
        case 'bottom-right':
          style.bottom = 20;
          style.right = 20;
          break;
      }
    } else {
      if (top !== undefined) style.top = top;
      if (left !== undefined) style.left = left;
      if (bottom !== undefined) style.bottom = bottom;
      if (right !== undefined) style.right = right;
    }
    return style;
  };

  const renderFabItem = (item: FabItem, index: number) => {
    const bg = item.backgroundColor ?? 'bg-primary-800';
    return (
      <Pressable
        key={index}
        onPress={item.onPress}
        className="mr-2 flex-row-reverse items-center gap-2"
      >
        <View
          className={cn('size-12 items-center justify-center rounded-full', bg)}
        >
          {item.icon}
        </View>
        {item.label && (
          <Text className={cn('rounded-full px-4 py-3 text-primary-50', bg)}>
            {item.label}
          </Text>
        )}
      </Pressable>
    );
  };

  const menuStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scale: progress.value },
      { translateY: (1 - progress.value) * 20 },
    ],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.25,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 135}deg` }],
  }));

  return (
    <>
      {open && (
        <Animated.View
          pointerEvents="auto"
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'white',
            },
            overlayStyle,
          ]}
        >
          <Pressable style={{ flex: 1 }} onPress={toggle} />
        </Animated.View>
      )}

      <View
        style={[{ position: 'absolute' }, getPositionStyle()]}
        className="items-end"
      >
        <Animated.View
          style={menuStyle}
          className="mb-3 flex-col items-end gap-3 self-end"
          pointerEvents={open ? 'auto' : 'none'}
        >
          {items.map(renderFabItem)}
        </Animated.View>

        <Pressable
          className={`size-16 items-center justify-center self-end rounded-full shadow-md ${open ? 'bg-primary-200' : 'bg-primary-800'}`}
          onPress={toggle}
        >
          <Animated.View style={iconStyle}>
            <Plus
              size={32}
              color={open ? colors.primary[800] : colors.primary[100]}
            />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}
