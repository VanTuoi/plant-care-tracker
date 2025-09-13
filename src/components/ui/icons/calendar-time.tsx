import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg';

import { isRTL } from '@/lib';

export const CalendarTime = ({
  color = '#000000',
  style,
  size = 24,
  ...props
}: SvgProps & { size?: number }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
    style={StyleSheet.flatten([
      style,
      { transform: [{ scaleX: isRTL ? -1 : 1 }] },
    ])}
  >
    <Circle
      cx={15.5}
      cy={15.5}
      r={5.5}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="15.5 13.3440934 15.5 15.5 17 17"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1={17}
      y1={3}
      x2={17}
      y2={5}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1={7}
      y1={3}
      x2={7}
      y2={5}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.03064542,21 C7.42550126,21 6.51778501,21 5.30749668,21 C4.50512981,21 4.2141722,20.9218311 3.92083887,20.7750461 C3.62750553,20.6282612 3.39729582,20.4128603 3.24041943,20.1383964 C3.08354305,19.8639324 3,19.5916914 3,18.8409388 L3,7.15906122 C3,6.4083086 3.08354305,6.13606756 3.24041943,5.86160362 C3.39729582,5.58713968 3.62750553,5.37173878 3.92083887,5.22495386 C4.2141722,5.07816894 4.50512981,5 5.30749668,5 L18.6925033,5 C19.4948702,5 19.7858278,5.07816894 20.0791611,5.22495386 C20.3724945,5.37173878 20.6027042,5.58713968 20.7595806,5.86160362 C20.9164569,6.13606756 21,7.24671889 21,7.99747152"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
