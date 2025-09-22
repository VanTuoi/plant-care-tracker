import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Species } from './type';

type Variables = { id: string };
type Response = Species;

export const useSpeciesDetail = createQuery<Response, Variables, AxiosError>({
  queryKey: ['species'],
  fetcher: async ({ id }) => {
    const res = await client.get<Response>(`/api/v1/species/${id}`);
    return res.data;
  },
});
