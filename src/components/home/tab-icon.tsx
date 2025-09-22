import { View } from 'react-native';

import { cn } from '@/lib';

type TabIconProps = {
  icon: React.ReactNode;
  focused: boolean;
};

export function TabIcon({ icon, focused }: TabIconProps) {
  return (
    <View
      className={cn('rounded-full px-6 py-2', focused ? 'bg-primary-50' : '')}
    >
      {icon}
    </View>
  );
}
