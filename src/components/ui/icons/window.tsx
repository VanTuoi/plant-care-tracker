import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Window({ color = 'black', size = 24, ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M27 23V3H5v20H3v6h26v-6H27zM17 15h8v8h-8V15zM25 5v8h-8V5H25zM7 5h8v8H7V5zM7 15h8v8H7V15zM27 27H5v-2h22V27z"
        fill={color}
      />
    </Svg>
  );
}
