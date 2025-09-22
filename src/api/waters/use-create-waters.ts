import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Water, WaterSchemaFormValues } from './type';

type Variables = WaterSchemaFormValues;
type Response = Water;

export const useCreateWater = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const res = await client.post<Response>('/api/v1/waters', variables);
    return res.data;
  },
});
