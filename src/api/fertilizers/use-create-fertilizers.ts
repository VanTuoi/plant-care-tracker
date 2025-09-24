import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Fertilizer, FertilizerSchemaFormValues } from './type';

type Variables = FertilizerSchemaFormValues;
type Response = Fertilizer;

export const useCreateFertilizer = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const res = await client.post<Response>('/api/v1/fertilizers', variables);
    return res.data;
  },
});
