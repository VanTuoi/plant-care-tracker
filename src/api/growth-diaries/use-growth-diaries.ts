import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type GrowthDiary } from './type';

type Response = GrowthDiary[];

export const useGrowthDiaries = createQuery<Response, void, AxiosError>({
  queryKey: ['growth-diaries'],
  fetcher: async () => {
    const res = await client.get<Response>('/api/v1/growth-diaries');
    return res.data;
  },
});
