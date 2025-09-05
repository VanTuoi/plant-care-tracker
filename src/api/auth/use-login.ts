import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { type ResponseData } from '../types';
import { loginMock } from './auth-mock';
import { type LoginResponse } from './type';

type Variables = { email: string; password: string };
type Response = ResponseData<LoginResponse>;

export const useLogin = createMutation<
  Response,
  Variables,
  AxiosError<ResponseData<null>>
>({
  mutationFn: loginMock,
});
