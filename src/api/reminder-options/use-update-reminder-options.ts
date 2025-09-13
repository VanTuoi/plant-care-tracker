import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type ErrorResponse } from '../types';
import { type NotificationForm, type NotificationResponse } from './type';

type Variables = NotificationForm;

const updateReminderApi = async (
  variables: Variables
): Promise<NotificationResponse> => {
  const res = await client.patch<NotificationResponse>(
    '/reminder-options',
    variables
  );
  return res.data;
};

export const useUpdateReminder = createMutation<
  NotificationResponse,
  Variables,
  AxiosError<ErrorResponse>
>({
  mutationFn: updateReminderApi,
});
