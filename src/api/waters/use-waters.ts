import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Water } from './type';

type Response = Water[];

export const useWaters = createQuery<Response, void, AxiosError>({
  queryKey: ['waters'],
  fetcher: async () => {
    const res = await client.get<Response>('/api/v1/waters');
    return res.data;
  },
});
