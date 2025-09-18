import React from 'react';
import { Text } from 'react-native';

import { type Plant } from '@/api';

type Props = {
  plant: Plant;
};

export function CareInfoPlant({ plant }: Props) {
  return <Text>{plant.name}</Text>;
}
