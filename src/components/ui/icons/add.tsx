import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Plus({ color = 'black', size = 24, ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6 12H12M12 12H18M12 12V18M12 12V6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
