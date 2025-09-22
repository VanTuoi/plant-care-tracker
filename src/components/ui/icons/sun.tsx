import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

interface SunProps extends SvgProps {
  size?: number;
  color?: string;
}

export const Sun = ({ size = 24, color = '#000', ...props }: SunProps) => (
  <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" {...props}>
    <Path
      fill={color}
      d="M3 12H5M5.00006 19L7.00006 17M12 19V21M17 17L19 19M5 5L7 7M19 12H21M16.9999 7L18.9999 5M12 3V5M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
