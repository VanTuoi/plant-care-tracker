import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const PlusIcon = ({ color = '#000', style, ...props }: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={24}
    height={24}
    {...props}
    style={StyleSheet.flatten([style])}
  >
    <Path
      d="M6 12H18M12 6V18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
