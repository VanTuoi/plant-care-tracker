import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Plant, PlantFormValues } from './type';

type Variables = PlantFormValues;
type Response = Plant;

export const useCreatePlant = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const res = await client.post<Response>('/plants', variables);
    return res.data;
  },
});
