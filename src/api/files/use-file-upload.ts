import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

type Variables = { fileUri: string };
type Response = {
  file: {
    id: string;
    path: string;
  };
};

export const useFileUpload = createMutation<Response, Variables, AxiosError>({
  mutationFn: async ({ fileUri }) => {
    const filename = fileUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename || '');
    const type = match ? `image/${match[1]}` : 'application/octet-stream';

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: filename,
      type,
    } as any);

    const res = await client.post<Response>('/api/v1/files/upload', formData, {
      headers: {
        'x-custom-lang': 'en',
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('res', res);

    return res.data;
  },
});
