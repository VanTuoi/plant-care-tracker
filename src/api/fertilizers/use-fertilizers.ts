import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Fertilizer } from './type';

type Response = Fertilizer[];

export const useFertilizers = createQuery<Response, void, AxiosError>({
  queryKey: ['fertilizers'],
  fetcher: async () => {
    const res = await client.get<Response>('/api/v1/fertilizers');
    return res.data;
  },
});
