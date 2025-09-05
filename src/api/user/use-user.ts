import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type ResponseData } from '../types';
import type { User } from './types';
import { getUserMock } from './user-mock';

type Variables = { id: string };
type Response = ResponseData<User>;

export const useUser = createQuery<Response, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: async (variables) => {
    return await getUserMock(variables.id);
  },
});
