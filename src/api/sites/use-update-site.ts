import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Site, SiteNameForm } from './type';

type Variables = SiteNameForm & { id: string };
type Response = Site;

export const useUpdateSite = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { id, ...data } = variables;
    const res = await client.patch<Response>(`/api/v1/sites/${id}`, data);
    return res.data;
  },
});
