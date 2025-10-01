import { z } from 'zod';

import { translate } from '@/lib/i18n';

import { type Plant } from '../plants';

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

export enum WaterStatusEnum {
  SCHEDULED = 'scheduled',
  DONE = 'done',
  MISSED = 'missed',
}

export type Water = {
  id: string;
  note?: string;
  amount: number;
  method: WaterEnum;
  status: WaterStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  plant: Plant;
};

export const waterSchema = z.object({
  plantId: z.string(),
  note: z.string().optional(),
  amount: z.number(),
  method: z.nativeEnum(WaterEnum, {
    required_error: translate('waters.form.select'),
  }),
  status: z
    .nativeEnum(WaterStatusEnum)
    .optional()
    .default(WaterStatusEnum.DONE),
});

export type WaterSchemaFormValues = z.infer<typeof waterSchema>;
