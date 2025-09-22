import { View } from 'react-native';

import { colors } from '../ui';

type TabIconProps = {
  icon: React.ReactNode;
  focused: boolean;
};

export function TabIcon({ icon, focused }: TabIconProps) {
  return (
    <View
      className={
        focused
          ? 'rounded-full bg-primary-50 px-4 py-2'
          : 'rounded-full px-4 py-2'
      }
      style={{
        backgroundColor: focused ? undefined : colors.primary[200],
      }}
    >
      {icon}
    </View>
  );
}
