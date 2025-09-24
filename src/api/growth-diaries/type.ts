import { z } from 'zod';

import { translate } from '@/lib/i18n';

export enum Mood {
  HAPPY = 'happy',
  SAD = 'sad',
  NEUTRAL = 'neutral',
  ANGRY = 'angry',
  OTHER = 'other',
}

export type GrowthDiary = {
  id: string;
  plantId: string;
  fileId: string;
  note?: string;
  mood: Mood;
  createdAt: Date;
  deletedAt?: Date | null;
};

export const growthDiarySchema = z.object({
  note: z.string().optional(),
  fileId: z.string().optional(),
  plantId: z.string(),
  mood: z.nativeEnum(Mood, { required_error: translate('common.form.select') }),
});

export type GrowthDiaryFormValues = z.infer<typeof growthDiarySchema>;
