import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import type { User } from './types';
import { createUserMock } from './user-mock';

type Variables = User;
type Response = ResponseData<User>;

export const useCreateUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    return await createUserMock(variables);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
