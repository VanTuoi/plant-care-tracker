import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type InfinityPaginationResponse } from '../types';
import { type QuerySites, type Site } from './type';

type Variables = QuerySites;
type Response = InfinityPaginationResponse<Site>;

export const useSites = createQuery<Response, Variables, AxiosError>({
  queryKey: ['sites'],
  fetcher: async (variables) => {
    const res = await client.get<Response>('/api/v1/sites', {
      params: variables,
    });
    return res.data;
  },
});
