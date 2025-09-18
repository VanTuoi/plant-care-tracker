import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Site, SiteFormValues } from './type';

type Variables = SiteFormValues;
type Response = Site;

export const useCreateSite = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const res = await client.post<Response>('/api/v1/sites', variables);
    return res.data;
  },
});
