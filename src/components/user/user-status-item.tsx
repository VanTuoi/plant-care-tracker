/* eslint-disable max-lines-per-function */
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { useChangeStatusUser, type User } from '@/api';
import { Options, type OptionType } from '@/components/ui/select';
import { translate } from '@/lib';

type Props = {
  User: User;
};

const statusColors: Record<User['status'], string> = {
  active: 'bg-green-100 dark:bg-green-900',
  block: 'bg-red-100 dark:bg-red-900',
  graduated: 'bg-yellow-100 dark:bg-yellow-800',
};

const textColors: Record<User['status'], string> = {
  active: 'text-green-800 dark:text-green-200',
  block: 'text-red-800 dark:text-red-200',
  graduated: 'text-yellow-800 dark:text-yellow-200',
};

export const UserStatusItem = ({ User }: Props) => {
  const changeStatus = useChangeStatusUser();
  const modalRef = useRef<BottomSheetModal>(null);

  const options: OptionType[] = [
    { label: translate('detail_user.select_status.active'), value: 'active' },
    { label: translate('detail_user.select_status.block'), value: 'block' },
    {
      label: translate('detail_user.select_status.graduated'),
      value: 'graduated',
    },
  ];

  const handleSelect = useCallback(
    (option: OptionType) => {
      changeStatus.mutate(
        {
          id: User.id,
          status: option.value as User['status'],
        },
        {
          onSuccess: () => {
            modalRef.current?.dismiss();
            showMessage({
              message: 'The User status has been updated.',
              type: 'success',
              backgroundColor: '#22c55e',
              color: '#fff',
              icon: 'success',
              duration: 3000,
            });
          },
          onError: () => {
            showMessage({
              message: 'The User status has not been updated.',
              type: 'danger',
              backgroundColor: '#ef4444',
              color: '#fff',
              icon: 'danger',
              duration: 3000,
            });
          },
        }
      );
    },
    [User.id, changeStatus]
  );

  const statusLabel =
    options.find((o) => o.value === User.status)?.label ?? User.status;

  return (
    <>
      <Pressable
        className={`w-[110px] rounded-lg px-3 py-2 ${statusColors[User.status]} flex-row items-center justify-center`}
        onPress={() => modalRef.current?.present()}
        disabled={changeStatus.isPending}
      >
        {changeStatus.isPending ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text
            testID={`User-${User.id}-status-trigger`}
            className={`text-sm font-semibold ${textColors[User.status]}`}
          >
            {statusLabel}
          </Text>
        )}
      </Pressable>

      <Options
        ref={modalRef}
        options={options}
        value={User.status}
        onSelect={handleSelect}
        testID={`User-${User.id}-status`}
      />
    </>
  );
};
