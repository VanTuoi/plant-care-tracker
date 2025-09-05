import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const EditIcon = ({
  color = '#000',
  size = 24,
  ...props
}: SvgProps & { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 528.899 528.899"
    fill="none"
    {...props}
  >
    <Path
      d="M328.883 89.125L436.473 196.714 164.133 469.054 56.604 361.465 328.883 89.125ZM518.113 63.177L470.132 15.196C451.589 -3.347 421.479 -3.347 402.873 15.196L356.912 61.157 464.502 168.747 518.113 115.136C532.495 100.753 532.495 77.559 518.113 63.177ZM0.3 512.69C-1.658 521.502 6.198 529.398 15.011 527.255L134.902 498.186 27.473 390.597 0.3 512.69Z"
      fill={color}
    />
  </Svg>
);
