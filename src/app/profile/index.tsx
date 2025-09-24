/* eslint-disable max-lines-per-function */
import { Stack, useRouter } from 'expo-router';
import * as React from 'react';

import { useMe } from '@/api';
import {
  ErrorState,
  Item,
  ItemsContainer,
  LoadingState,
} from '@/components/common';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Switch,
  Text,
  View,
} from '@/components/ui';
import { EditIcon, Location, Tag, User2 } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function Profile() {
  const router = useRouter();
  const { data, isPending, isError } = useMe();

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <>
      <Stack.Screen
        options={{
          title: translate('settings.profile.title'),
        }}
      />
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="w-full flex-1 flex-col items-center gap-10 px-4">
          <View className="size-[85px] items-center justify-center rounded-full bg-primary-100">
            <User2 color={colors.primary[800]} size={40} />
            <View className="absolute bottom-0 right-0 size-10 items-center justify-center rounded-full border border-gray-50 bg-primary-100">
              <EditIcon size={16} color={colors.primary[800]} />
            </View>
          </View>

          <ItemsContainer title={translate('settings.profile.name_section')}>
            <Item
              label={translate('settings.profile.display_name')}
              icon={<Tag size={24} />}
              iconColor={colors.neutral[200]}
              value={`${data?.firstName ?? ''} ${data?.lastName ?? ''}`.trim()}
              onPress={() => router.push('./profile/edit-name')}
            />
          </ItemsContainer>

          <ItemsContainer
            title={translate('settings.profile.location_section')}
          >
            <Item
              label={translate('settings.profile.location')}
              icon={<Location size={24} />}
              iconColor={colors.neutral[200]}
              value={'Càng Long'}
            />
            <View className="w-full px-4">
              <Button
                label={translate('settings.profile.update_location')}
                textClassName="text-primary-800"
                className="rounded-full bg-primary-50"
              />
            </View>
          </ItemsContainer>

          <ItemsContainer title={translate('settings.profile.beta_section')}>
            <Text className="text-md pb-2 text-primary-300">
              {translate('settings.profile.beta_description')}
            </Text>
            <Item
              label={translate('settings.profile.become_beta')}
              icon={
                <View className="size-7 items-center justify-center">
                  <Text className="text-center font-signika-bold text-xl text-white">
                    B
                  </Text>
                </View>
              }
              iconColor={colors.neutral[200]}
            >
              <Switch accessibilityLabel="notification" onChange={() => {}} />
            </Item>
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  );
}
