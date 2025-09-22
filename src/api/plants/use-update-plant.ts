import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Plant, PlantNameForm } from './type';

type Variables = PlantNameForm & { id: string };
type Response = Plant;

export const useUpdatePlant = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { id, ...data } = variables;
    const res = await client.patch<Response>(`/api/v1/plants/${id}`, data);
    return res.data;
  },
});
