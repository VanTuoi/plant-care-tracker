import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export const ArrowLeft = ({
  size = 24,
  color = '#000',
  ...props
}: SvgProps & { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M20 12H4M4 12L10 6M4 12L10 18"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
