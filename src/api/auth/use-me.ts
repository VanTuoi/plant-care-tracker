import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import { type User } from '../user';

type Response = User;

export const useMe = createQuery<Response, null, AxiosError>({
  queryKey: ['me'],
  fetcher: async () => {
    const res = await client.get<Response>(`/api/v1/auth/me`);
    return res.data;
  },
});
