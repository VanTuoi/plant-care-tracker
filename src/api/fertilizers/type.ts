import { z } from 'zod';

import { translate } from '@/lib/i18n';

import { type Plant } from '../plants';

export enum FertilizerMethodEnum {
  SOIL_MIXING = 'soil_mixing',
  SURFACE_SPREAD = 'surface_spread',
  LIQUID_FEED = 'liquid_feed',
  FOLIAR_FEED = 'foliar_feed',
  OTHER = 'other',
}

export enum FertilizerTypeEnum {
  ORGANIC = 'organic',
  INORGANIC = 'inorganic',
  NPK = 'npk',
  UREA = 'urea',
  AMMONIUM_SULFATE = 'ammonium_sulfate',
  LIQUID = 'liquid',
  COMPOST = 'compost',
  MANURE = 'manure',
  BONEMEAL = 'bonemeal',
  BLOODMEAL = 'bloodmeal',
  GREEN_MANURE = 'green_manure',
  MICRO_NUTRIENT = 'micro_nutrient',
  OTHER = 'other',
}

export enum FertilizerStatusEnum {
  SCHEDULED = 'scheduled',
  DONE = 'done',
  MISSED = 'missed',
}

export type Fertilizer = {
  id: string;
  note?: string;
  amount: number;
  method: FertilizerMethodEnum;
  fertilizerType: FertilizerTypeEnum;
  status: FertilizerStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  plant: Plant;
};

export const fertilizerSchema = z.object({
  plantId: z.string(),
  note: z.string().optional(),
  amount: z.number(),
  method: z.nativeEnum(FertilizerMethodEnum, {
    required_error: translate('fertilizers.form.select'),
  }),
  fertilizerType: z.nativeEnum(FertilizerTypeEnum, {
    required_error: translate('fertilizers.form.select'),
  }),
  status: z
    .nativeEnum(FertilizerStatusEnum)
    .optional()
    .default(FertilizerStatusEnum.DONE),
});

export type FertilizerSchemaFormValues = z.infer<typeof fertilizerSchema>;
