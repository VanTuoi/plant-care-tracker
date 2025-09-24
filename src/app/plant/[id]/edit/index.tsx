/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert } from 'react-native';

import { useDeletePlant, usePlant } from '@/api';
import { Item } from '@/components/common/item';
import { ItemsContainer } from '@/components/common/items-container';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Home, Plant, Size, Tag } from '@/components/ui/icons';
import { translate } from '@/lib';

export default function Edit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = usePlant({ variables: { id } });
  const { mutateAsync } = useDeletePlant();

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color={colors.primary[800]} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{translate('common.error_load')}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: translate('plant.plantEdit.settings_title'),
        }}
      />

      <FocusAwareStatusBar />

      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80, gap: 20 }}
          className=" px-4 py-1"
        >
          <ItemsContainer title={translate('plant.plantEdit.name_section')}>
            <Item
              label={translate('plant.plantEdit.name_edit')}
              icon={<Tag size={24} />}
              bgColor="bg-primary-800"
              iconColor={colors.neutral[200]}
              onPress={() => router.push('./edit/name')}
            />
          </ItemsContainer>

          <ItemsContainer
            title={translate('plant.plantEdit.fertilizer_section')}
          >
            <Item
              label={translate('plant.plantEdit.fertilizer')}
              icon={<Plant size={24} />}
              bgColor="bg-yellow-600"
              iconColor={colors.neutral[200]}
            />
          </ItemsContainer>

          <ItemsContainer title={translate('plant.plantEdit.plant_section')}>
            <Item
              label={translate('plant.plantEdit.size')}
              icon={<Size size={24} />}
              bgColor="bg-primary-400"
              iconColor={colors.neutral[200]}
              onPress={() => router.push('./edit/size')}
            />
            <Item
              label={translate('plant.plantEdit.type')}
              icon={<Plant size={24} />}
              bgColor="bg-primary-400"
              iconColor={colors.neutral[200]}
            />
          </ItemsContainer>

          <ItemsContainer title={translate('plant.plantEdit.area_section')}>
            <Item
              label={translate('plant.plantEdit.area')}
              bgColor="bg-gray-400"
              icon={<Home size={24} />}
              iconColor={colors.neutral[200]}
              onPress={() => router.push('./edit/name')}
            />
          </ItemsContainer>

          <View className="flex flex-col items-start justify-start rounded-2xl bg-primary-100 p-5">
            <Text>{translate('plant.plantEdit.note_title')}</Text>
            <Text>{translate('plant.plantEdit.note_content')}</Text>
          </View>

          <View className="w-full flex-col">
            <Button
              size="lg"
              label={translate('plant.plantEdit.archive')}
              variant="secondary"
              textClassName="font-signika-bold"
              className="rounded-full bg-primary-800"
            />
            <Button
              size="lg"
              label={translate('plant.plantEdit.delete')}
              onPress={() => {
                Alert.alert(
                  translate('plant.plantEdit.delete_alert_title'),
                  translate('plant.plantEdit.delete_alert_message'),
                  [
                    {
                      text: translate('plant.plantEdit.delete_alert_cancel'),
                      style: 'cancel',
                    },
                    {
                      text: translate('plant.plantEdit.delete_alert_confirm'),
                      style: 'destructive',
                      onPress: async () => {
                        try {
                          await mutateAsync({ id: data.id });
                          router.replace('/my-plant');
                        } catch (err) {
                          Alert.alert(
                            translate('plant.plantEdit.delete_error_title'),
                            translate('plant.plantEdit.delete_error_message')
                          );
                        }
                      },
                    },
                  ]
                );
              }}
              variant="destructive"
              textClassName="font-signika-bold"
              className="rounded-full bg-danger-700"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
