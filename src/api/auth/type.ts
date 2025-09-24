import { z } from 'zod';

import { translate } from '@/lib/i18n';

import { type User } from '../user';

export type LoginResponse = {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user: User;
};

export const loginSchema = z.object({
  email: z
    .string({
      required_error: translate('login.errors.email_required'),
    })
    .email(translate('login.errors.email_invalid')),
  password: z
    .string({
      required_error: translate('login.errors.password_required'),
    })
    .min(6, translate('login.errors.password_min')),
});

export type LoginForm = z.infer<typeof loginSchema>;
