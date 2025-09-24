/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { useRouter } from 'expo-router';
import React from 'react';

import { Item } from '@/components/common/item';
import { ItemsContainer } from '@/components/common/items-container';
import { AccountItem } from '@/components/settings/account-item';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Logout, Settings as SettingsIcon } from '@/components/ui/icons';
import { translate, useAuth } from '@/lib';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const route = useRouter();

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 gap-4 px-4 py-2">
          <Text className="py-2 font-signika-bold text-2xl">
            {translate('settings.title')}
          </Text>
          <ItemsContainer tx="settings.generale">
            <LanguageItem />
            <ThemeItem />
            <AccountItem />
          </ItemsContainer>

          <ItemsContainer tx={'settings.notification.title'}>
            <Item
              icon={<SettingsIcon />}
              iconColor={colors.neutral[200]}
              tx={'settings.notification.general'}
              onPress={() => route.push('/notification')}
            />
          </ItemsContainer>

          <ItemsContainer tx="settings.about">
            <Item tx="settings.app_name" value={Env.NAME} />
            <Item tx="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer tx="settings.logout">
            <Item
              icon={<Logout size={24} />}
              iconColor={colors.neutral[200]}
              tx="settings.logout"
              onPress={signOut}
            />
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  );
}
