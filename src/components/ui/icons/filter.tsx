import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Filter = ({ color = '#999', ...props }: SvgProps) => (
  <Svg
    color={color}
    viewBox="0 0 36 36"
    width={24}
    height={24}
    fill="none"
    {...props}
    className="fill-black dark:fill-white"
  >
    <Path
      d="M28.54 13H7.46a1 1 0 0 1 0-2H28.54a1 1 0 0 1 0 2Z"
      fill="currentColor"
    />
    <Path
      d="M21.17 19H7.46a1 1 0 0 1 0-2H21.17a1 1 0 0 1 0 2Z"
      fill="currentColor"
    />
    <Path
      d="M13.74 25H7.46a1 1 0 0 1 0-2h6.28a1 1 0 0 1 0 2Z"
      fill="currentColor"
    />
  </Svg>
);
