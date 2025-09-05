import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import type { User } from './types';
import { updateUserMock } from './user-mock';

type Variables = Partial<User> & { id: string };
type Response = ResponseData<User>;

export const useUpdateUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    return await updateUserMock(variables);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
