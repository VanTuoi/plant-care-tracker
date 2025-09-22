import { useRouter } from 'expo-router';
import React from 'react';

import { colors } from '@/components/ui';

import { Item } from '../common/item';
import { User } from '../ui/icons/user';

export const AccountItem = () => {
  const router = useRouter();
  return (
    <>
      <Item
        label="Tài khoản"
        onPress={() => router.push('/profile')}
        icon={<User size={24} />}
        iconColor={colors.neutral[200]}
      />
    </>
  );
};
