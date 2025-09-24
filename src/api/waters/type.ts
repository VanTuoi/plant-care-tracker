import { z } from 'zod';

import { translate } from '@/lib/i18n';

export enum WaterEnum {
  ROOT = 'root',
  SPRAY = 'spray',
  IMMERSION = 'immersion',
  DRIP = 'drip',
  WICK = 'wick',
  SELF_WATERING = 'self_watering',
  OVERHEAD = 'overhead',
  OTHER = 'other',
}

export type Water = {
  id: string;
  note?: string;
  amount: number;
  method: WaterEnum;
  createdAt: Date;
  updatedAt: Date;
  plantId: string;
};

export const waterSchema = z.object({
  plantId: z.string(),
  note: z.string().optional(),
  amount: z.number(),
  method: z.nativeEnum(WaterEnum, {
    required_error: translate('waters.form.select'),
  }),
});

export type WaterSchemaFormValues = z.infer<typeof waterSchema>;
