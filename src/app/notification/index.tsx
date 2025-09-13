/* eslint-disable max-lines-per-function */
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, Pressable, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { useGetReminder, useUpdateReminder } from '@/api/reminder-options';
import {
  type NotificationForm,
  NotificationSchema,
} from '@/api/reminder-options/type';
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  Switch,
  Text,
  View,
} from '@/components/ui';
import {
  Bell,
  CalendarCheck,
  CaretDown,
  Clock,
  Mail,
} from '@/components/ui/icons';
import { CalendarTime } from '@/components/ui/icons/calendar-time';
import { Options, type OptionType } from '@/components/ui/select';

const reminderOptions: OptionType[] = [
  { label: 'Bất cứ khi nào', value: 'anytime' },
  { label: 'Khung giờ cố định', value: 'fixed_time' },
];

const defaultValues: NotificationForm = {
  isEnabled: false,
  sendMode: 'anytime',
  startTime: undefined,
  endTime: undefined,
  priority: 'medium',
  channels: [],
};

export default function NotificationConfig() {
  const modalRef = useRef<BottomSheetModal>(null);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const { mutate: updateReminder, isPending } = useUpdateReminder();
  const { mutate: getReminder } = useGetReminder();

  const { control, watch, reset, handleSubmit } = useForm<NotificationForm>({
    resolver: zodResolver(NotificationSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  const formValues = watch();

  useEffect(() => {
    getReminder(null, {
      onSuccess: (data) => {
        reset({
          ...data,
          startTime: data.startTime
            ? new Date(`1970-01-01T${data.startTime}Z`)
            : undefined,
          endTime: data.endTime
            ? new Date(`1970-01-01T${data.endTime}Z`)
            : undefined,
        });
      },
      onError: () => {
        showMessage({
          message: 'Lỗi khi lấy cài đặt',
          type: 'danger',
          backgroundColor: '#ef4444',
          color: '#fff',
          icon: 'danger',
        });
      },
    });
  }, []);

  const onSubmit = (data: NotificationForm) => {
    const submitData = {
      ...data,
      startTime:
        data.sendMode === 'fixed_time' && data.startTime instanceof Date
          ? data.startTime.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : undefined,
      endTime:
        data.sendMode === 'fixed_time' && data.endTime instanceof Date
          ? data.endTime.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          : undefined,
    };
    updateReminder(submitData);
  };

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-2">
          <Text className="py-2 text-2xl font-bold text-primary-900">
            Cài đặt thông báo
          </Text>
          <ItemsContainer title="Cài đặt tổng quan">
            <Item
              label="Bật thông báo"
              icon={<Bell size={24} />}
              iconColor={colors.neutral[200]}
            >
              <Controller
                control={control}
                name="isEnabled"
                render={({ field }) => (
                  <Switch
                    accessibilityLabel="notification"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Item>
          </ItemsContainer>

          {formValues.isEnabled && (
            <>
              <ItemsContainer title="Kênh nhận thông báo">
                <Item
                  label="Thông báo qua email"
                  icon={<Mail size={24} />}
                  iconColor={colors.neutral[200]}
                >
                  <Controller
                    control={control}
                    name="channels"
                    render={({ field }) => (
                      <Switch
                        accessibilityLabel="notification email"
                        checked={(field.value ?? []).includes('email')}
                        onChange={(val) => {
                          const current = field.value ?? [];
                          const newChannels = val
                            ? [...current, 'email']
                            : current.filter((c) => c !== 'email');
                          field.onChange(newChannels);
                        }}
                      />
                    )}
                  />
                </Item>

                <Item
                  label="Thông báo trực tiếp"
                  icon={<CalendarCheck size={24} />}
                  iconColor={colors.neutral[200]}
                >
                  <Controller
                    control={control}
                    name="channels"
                    render={({ field }) => (
                      <Switch
                        accessibilityLabel="notification socket"
                        checked={field.value.includes('socket')}
                        onChange={(val) => {
                          const newChannels = val
                            ? [...field.value, 'socket']
                            : field.value.filter((c) => c !== 'socket');
                          field.onChange(newChannels);
                        }}
                      />
                    )}
                  />
                </Item>
              </ItemsContainer>

              <ItemsContainer title="Thời gian báo">
                <Item
                  label="Báo vào lúc"
                  icon={<Clock size={24} />}
                  iconColor={colors.neutral[200]}
                >
                  <Pressable
                    onPress={() => modalRef.current?.present()}
                    className="flex-row items-center"
                  >
                    <Text className="mr-2 text-base text-neutral-600 dark:text-neutral-300">
                      {reminderOptions.find(
                        (o) => o.value === formValues.sendMode
                      )?.label ?? formValues.sendMode}
                    </Text>
                    <CaretDown color="#888" />
                  </Pressable>
                </Item>

                {formValues.sendMode === 'fixed_time' && (
                  <Item
                    label="Khoảng giờ"
                    icon={<CalendarTime size={24} />}
                    iconColor={colors.neutral[200]}
                  >
                    <View className="flex-1 flex-row items-center justify-end">
                      <Controller
                        control={control}
                        name="startTime"
                        render={({ field }) => (
                          <Pressable
                            onPress={() => setShowStart(true)}
                            className="px-2 py-1"
                          >
                            <Text className="text-base text-neutral-600 dark:text-neutral-300">
                              {field.value instanceof Date
                                ? field.value.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : '--:--'}
                            </Text>
                            {showStart && (
                              <DateTimePicker
                                value={
                                  field.value instanceof Date
                                    ? field.value
                                    : new Date()
                                }
                                mode="time"
                                is24Hour
                                display={
                                  Platform.OS === 'ios' ? 'spinner' : 'default'
                                }
                                onChange={(_, d) => {
                                  setShowStart(Platform.OS === 'ios');
                                  if (d) field.onChange(d);
                                }}
                              />
                            )}
                          </Pressable>
                        )}
                      />

                      <Text className="px-1 text-base text-neutral-600 dark:text-neutral-300">
                        -
                      </Text>

                      <Controller
                        control={control}
                        name="endTime"
                        render={({ field }) => (
                          <Pressable
                            onPress={() => setShowEnd(true)}
                            className="px-2 py-1"
                          >
                            <Text className="text-base text-neutral-600 dark:text-neutral-300">
                              {field.value instanceof Date
                                ? field.value.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : '--:--'}
                            </Text>
                            {showEnd && (
                              <DateTimePicker
                                value={
                                  field.value instanceof Date
                                    ? field.value
                                    : new Date()
                                }
                                mode="time"
                                is24Hour
                                display={
                                  Platform.OS === 'ios' ? 'spinner' : 'default'
                                }
                                onChange={(_, d) => {
                                  setShowStart(Platform.OS === 'ios');
                                  if (d) field.onChange(d);
                                }}
                              />
                            )}
                          </Pressable>
                        )}
                      />
                    </View>
                  </Item>
                )}
              </ItemsContainer>
            </>
          )}

          <Button
            loading={isPending}
            label="Lưu cài đặt"
            onPress={handleSubmit(onSubmit)}
            size="lg"
            variant="secondary"
          />

          <Options
            ref={modalRef}
            options={reminderOptions}
            value={formValues.sendMode}
            onSelect={(opt) => {
              reset({
                ...formValues,
                sendMode: opt.value as 'anytime' | 'fixed_time',
              });
              modalRef.current?.dismiss();
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
