import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type InfinityPaginationResponse } from '../types';
import type { Plant, QueryPlant } from './type';

type Variables = QueryPlant;
type Response = InfinityPaginationResponse<Plant>;

export const usePlant = createQuery<Response, Variables, AxiosError>({
  queryKey: ['plants'],
  fetcher: async (variables) => {
    const res = await client.get<Response>('/plants', { params: variables });
    return res.data;
  },
});
