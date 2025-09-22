import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type Site } from './type';

type Variables = { id: string };
type Response = Site;

export const useSite = createQuery<Response, Variables, AxiosError>({
  queryKey: ['sites'],
  fetcher: async ({ id }) => {
    const res = await client.get<Response>(`/api/v1/sites/${id}`);
    return res.data;
  },
});
