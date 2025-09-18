import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { GrowthDiary, GrowthDiaryFormValues } from './type';

type Variables = GrowthDiaryFormValues;
type Response = GrowthDiary;

export const useCreateGrowthDiary = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const res = await client.post<Response>(
      '/api/v1/growth-diaries',
      variables
    );
    return res.data;
  },
});
