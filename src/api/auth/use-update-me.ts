import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type User, type UserNameForm } from '../user';

type Variables = UserNameForm;
type Response = User;

export const useUpdateMe = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { ...data } = variables;
    const res = await client.patch<Response>(`/api/v1/auth/me`, data);
    return res.data;
  },
});
