import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

interface FilterProps extends SvgProps {
  size?: number;
  color?: string;
}

export const Filter = ({
  size = 24,
  color = '#999',
  ...props
}: FilterProps) => (
  <Svg viewBox="0 0 36 36" width={size} height={size} fill="none" {...props}>
    <Path
      d="M28.54 13H7.46a1 1 0 0 1 0-2H28.54a1 1 0 0 1 0 2Z"
      stroke={color}
      strokeWidth={1.4}
      fill={color}
    />
    <Path
      d="M21.17 19H7.46a1 1 0 0 1 0-2H21.17a1 1 0 0 1 0 2Z"
      stroke={color}
      strokeWidth={1.4}
      fill={color}
    />
    <Path
      d="M13.74 25H7.46a1 1 0 0 1 0-2h6.28a1 1 0 0 1 0 2Z"
      stroke={color}
      strokeWidth={1.4}
      fill={color}
    />
  </Svg>
);
