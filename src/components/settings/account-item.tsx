import { useRouter } from 'expo-router';
import React from 'react';

import { colors } from '@/components/ui';
import { translate } from '@/lib';

import { Item } from '../common/item';
import { User } from '../ui/icons';

export const AccountItem = () => {
  const router = useRouter();
  return (
    <>
      <Item
        label={translate('settings.profile.title')}
        onPress={() => router.push('/profile')}
        icon={<User size={24} />}
        iconColor={colors.neutral[200]}
      />
    </>
  );
};
