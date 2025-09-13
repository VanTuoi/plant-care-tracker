import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type ErrorResponse } from '../types';
import { type LoginResponse } from './type';

type Variables = { email: string; password: string };

const loginApi = async ({
  email,
  password,
}: Variables): Promise<LoginResponse> => {
  const res = await client.post<LoginResponse>('/auth/email/login', {
    email,
    password,
  });
  return res.data;
};

export const useLogin = createMutation<
  LoginResponse,
  Variables,
  AxiosError<ErrorResponse>
>({
  mutationFn: loginApi,
});
