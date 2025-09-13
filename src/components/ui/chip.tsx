import { View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Text } from './text';

const chip = tv({
  slots: {
    container: 'rounded-full px-3 py-1',
    label: 'font-medium',
  },
  variants: {
    variant: {
      default: {
        container: 'bg-gray-200',
        label: 'text-black',
      },
      primary: {
        container: 'bg-primary-600',
        label: 'text-white',
      },
      outline: {
        container: 'border border-gray-400',
        label: 'text-gray-700',
      },
    },
    size: {
      sm: {
        container: 'px-2 py-0.5',
        label: 'text-xs',
      },
      md: {
        container: 'px-3 py-1',
        label: 'text-sm',
      },
      lg: {
        container: 'px-4 py-2',
        label: 'text-base',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type ChipProps = {
  label?: string;
  variant?: 'default' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
};

export const Chip = ({ label, variant, size }: ChipProps) => {
  const styles = chip({ variant, size });
  return (
    <View className={styles.container()} style={{ alignSelf: 'flex-start' }}>
      <Text className={styles.label()}>{label}</Text>
    </View>
  );
};
