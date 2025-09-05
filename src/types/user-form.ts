import { z } from 'zod';

export const userFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  gender: z.string().min(1),
  status: z.enum(['active', 'block', 'graduated']),
});

export type FormData = z.infer<typeof userFormSchema>;
