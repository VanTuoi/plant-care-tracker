import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type Fertilizer } from './type';

type Variables = Omit<Fertilizer, 'createdAt' | 'updatedAt'>;
type Response = Fertilizer;

export const useUpdateFertilizers = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const { id, ...data } = variables;
    const res = await client.patch<Response>(`/api/v1/fertilizers/${id}`, data);
    return res.data;
  },
});
