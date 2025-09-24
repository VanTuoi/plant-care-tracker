import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type ErrorResponse } from '../types';
import { type LoginResponse } from './type';

type Response = LoginResponse;
type Variables = { email: string; password: string };

export const useLogin = createMutation<
  Response,
  Variables,
  AxiosError<ErrorResponse>
>({
  mutationFn: async ({ email, password }) => {
    const res = await client.post<LoginResponse>('/api/v1/auth/email/login', {
      email,
      password,
    });
    return res.data;
  },
});
