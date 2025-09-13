import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type InfinityPaginationResponse } from '../types';
import type { QuerySpecies, Species } from './type';

type Variables = QuerySpecies;
type Response = InfinityPaginationResponse<Species>;

export const useSpecies = createQuery<Response, Variables, AxiosError>({
  queryKey: ['species'],
  fetcher: async (variables) => {
    const res = await client.get<Response>('/species', { params: variables });
    return res.data;
  },
});
