import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';

import { colors } from '@/components/ui';

import { ArrowLeft } from './icons';

export const BackButton = ({ tintColor }: { tintColor?: string }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
      }}
    >
      <ArrowLeft color={tintColor ?? colors.primary[800]} size={20} />
    </Pressable>
  );
};
