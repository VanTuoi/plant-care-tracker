import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { queryClient } from '../common';
import type { ResponseData } from '../types';
import { deleteUserMock } from './user-mock';

type Variables = { id: string };
type Response = ResponseData<null>;

export const useDeleteUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async ({ id }) => {
    return await deleteUserMock(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
