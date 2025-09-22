import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type ErrorResponse } from '../types';
import { type NotificationResponse } from './type';

const getReminderApi = async (): Promise<NotificationResponse> => {
  const res = await client.get<NotificationResponse[]>(
    '/api/v1/reminder-options'
  );
  return res.data[0];
};

export const useGetReminder = createMutation<
  NotificationResponse,
  null,
  AxiosError<ErrorResponse>
>({
  mutationFn: getReminderApi,
});
