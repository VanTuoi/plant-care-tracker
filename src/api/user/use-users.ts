import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type ResponseData } from '../types';
import type { User } from './types';
import { getUsersMock } from './user-mock';

type Response = ResponseData<User[]>;
type Variables = { search?: string };

export const useUsers = createQuery<Response, Variables, AxiosError>({
  queryKey: ['users'],
  fetcher: async ({ search }) => {
    return await getUsersMock({ search });
  },
});
