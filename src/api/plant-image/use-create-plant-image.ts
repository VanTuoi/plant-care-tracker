import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { PlantImage } from './type';

type Variables = Pick<PlantImage, 'plantId' | 'fileId'>;
type Response = PlantImage;

export const useCreatePlantImage = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const res = await client.post<Response>('/api/v1/plant-images', variables);
    return res.data;
  },
});
