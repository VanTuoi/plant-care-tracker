import React from 'react';

import { colors } from '@/components/ui';

import { Item } from '../common/item';
import { User } from '../ui/icons/user';

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
