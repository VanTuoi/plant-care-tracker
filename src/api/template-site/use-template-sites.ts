import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type InfinityPaginationResponse } from '../types';
import { type QueryTemplateSites, type TemplateSite } from './type';

type Variables = QueryTemplateSites;
type Response = InfinityPaginationResponse<TemplateSite>;

export const useTemplateSites = createQuery<Response, Variables, AxiosError>({
  queryKey: ['template-sites'],
  fetcher: async (variables) => {
    const res = await client.get<Response>('/template-sites', {
      params: variables,
    });
    return res.data;
  },
});
