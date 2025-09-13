import React from 'react';

import { colors } from '@/components/ui';

import { User } from '../ui/icons/user';
import { Item } from './item';

export const AccountItem = () => {
  return (
    <>
      <Item
        label="Account"
        onPress={() => {}}
        icon={<User size={24} />}
        iconColor={colors.neutral[200]}
      />
    </>
  );
};
