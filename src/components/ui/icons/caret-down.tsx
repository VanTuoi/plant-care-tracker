import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const CaretDown = ({
  size = 12,
  color = '#000',
  ...props
}: SvgProps & { size?: number; color?: string }) => (
  <Svg width={size} height={size} fill="none" viewBox="0 0 12 12" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.75 4.744 6 8.494l-3.75-3.75"
    />
  </Svg>
);
