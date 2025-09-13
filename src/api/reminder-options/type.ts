import { z } from 'zod';

export const NotificationSchema = z.object({
  isEnabled: z.boolean(),
  sendMode: z.enum(['anytime', 'fixed_time']),
  startTime: z.union([z.string(), z.date()]).optional(),
  endTime: z.union([z.string(), z.date()]).optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  channels: z.array(z.enum(['email', 'socket'])),
});

export type NotificationForm = z.infer<typeof NotificationSchema>;

export const NotificationResponseSchema = NotificationSchema.extend({
  id: z.string().uuid(),
  updatedAt: z.string().datetime(),
  userId: z.string().uuid(),
});

export type NotificationResponse = z.infer<typeof NotificationResponseSchema>;
