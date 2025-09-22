import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Line, Path } from 'react-native-svg';

interface SunProps extends SvgProps {
  size?: number;
  color?: string;
}

export const PartialSun = ({
  size = 24,
  color = '#333',
  ...props
}: SunProps) => (
  <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
    <Path
      d="M8 15C8 12.7909 9.79086 11 12 11C14.2091 11 16 12.7909 16 15"
      stroke={color}
      fill={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="12"
      y1="8"
      x2="12"
      y2="6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="5"
      y1="15"
      x2="3"
      y2="15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="21"
      y1="15"
      x2="19"
      y2="15"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="19.071"
      y1="8.34317"
      x2="17.6568"
      y2="9.75738"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="5.41421"
      y1="9"
      x2="6.82843"
      y2="10.4142"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
