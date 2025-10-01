import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type Water } from './type';

type Variables = Omit<Water, 'createdAt' | 'updatedAt'>;
type Response = Water;

export const useUpdateWater = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { id, ...data } = variables;
    const res = await client.patch<Response>(`/api/v1/waters/${id}`, data);
    return res.data;
  },
});
