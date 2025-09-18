import { type AxiosError } from 'axios';
import { createInfiniteQuery } from 'react-query-kit';

import { client } from '../common';
import { type InfinityPaginationResponse } from '../types';
import type { QuerySpecies, Species } from './type';

type Response = InfinityPaginationResponse<Species>;
type Variables = QuerySpecies;

export const useSpecies = createInfiniteQuery<
  Response,
  Variables,
  AxiosError,
  number
>({
  queryKey: ['species'],

  initialPageParam: 1,

  fetcher: async (
    variables: Variables,
    { pageParam = 1 }: { pageParam?: number }
  ) => {
    const res = await client.get<Response>('/api/v1/species', {
      params: {
        ...variables,
        page: pageParam,
      },
    });

    return res.data;
  },

  getNextPageParam: (lastPage, allPages) =>
    lastPage.hasNextPage ? allPages.length + 1 : undefined,
});
