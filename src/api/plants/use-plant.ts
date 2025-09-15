import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type Plant } from './type';

type Variables = { id: string };
type Response = Plant;

export const usePlant = createQuery<Response, Variables, AxiosError>({
  queryKey: ['plants'],
  fetcher: async ({ id }) => {
    const res = await client.get<Response>(`/plants/${id}`);
    return res.data;
  },
});
