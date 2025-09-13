import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const CalendarCheck = ({
  color = '#000',
  size = 24,
  ...props
}: SvgProps & { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 5.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-17.001 0A.5.5 0 0 1 5.47 5l6.53.005a1 1 0 1 0 0-2L5.5 3a2.5 2.5 0 0 0-2.5 2.5v12.577c0 .76.083 1.185.32 1.627.223.419.558.753.977.977.442.237.866.319 1.627.319h12.154c.76 0 1.185-.082 1.627-.319.419-.224.753-.558.977-.977.237-.442.319-.866.319-1.627V12a1 1 0 1 0-2 0v6.077c0 .459-.022.57-.082.684a.363.363 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.571-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684L4.999 5.5z"
      fill={color}
    />
  </Svg>
);
