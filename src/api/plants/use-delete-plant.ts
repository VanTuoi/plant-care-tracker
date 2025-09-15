import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = { id: string };
type Response = { success: boolean };

export const useDeletePlant = createMutation<Response, Variables, AxiosError>({
  mutationFn: async ({ id }) => {
    const res = await client.delete<Response>(`/plants/${id}`);
    return res.data;
  },
});
