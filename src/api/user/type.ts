import { z } from 'zod';

import { type FileType } from '../files/type';
import { type Role } from '../role';
import { type Status } from '../status';

export type User = {
  id: string;
  email: string | null;
  password?: string;
  provider: string;
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;
  role?: Role | null;
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export const userFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

export const userNameSchema = userFormSchema.pick({
  firstName: true,
  lastName: true,
});

export type UserNameForm = z.infer<typeof userNameSchema>;
