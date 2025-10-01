import { z } from 'zod';

import {
  type FertilizerMethodEnum,
  type FertilizerTypeEnum,
} from '../fertilizers';
import { type PlantImage } from '../plant-image';
import { type Site } from '../sites';
import { type DifficultyLevelEnum, type SunlightNeedEnum } from '../species';
import { type WaterEnum } from '../waters';

export enum PlantSizeEnum {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  HUGE = 'huge',
}

export type Plant = {
  id: string;
  name?: string;
  scientificName?: string;
  size?: PlantSizeEnum;
  inGround: boolean;
  isDead: boolean;
  wateringFrequency?: number;
  wateringAmount?: number;
  wateringMethod?: WaterEnum;

  fertilizingFrequency?: number;
  fertilizingAmount?: number;
  fertilizingMethod?: FertilizerMethodEnum;
  fertilizerType?: FertilizerTypeEnum;

  sunlightNeed?: SunlightNeedEnum;
  difficultyLevel?: DifficultyLevelEnum;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  speciesId?: string;
  images?: PlantImage[];
  userId?: string;
  site?: Site;
};

export type FilterPlant = {
  speciesId?: string;
  siteId?: string;
  siteName?: string;
  userId?: string;
  name?: string;
};

export type SortPlant = {
  orderBy: keyof Plant;
  order: 'asc' | 'desc';
};

export type QueryPlant = {
  page?: number;
  limit?: number;
  filters?: FilterPlant | null;
  sort?: SortPlant[] | null;
};

export const plantFormSchema = z.object({
  inGround: z.boolean(),
  lastWateredAt: z.date().optional(),
  lastFertilizedAt: z.date().optional(),
  plantImageUri: z.string().optional(),
  name: z.string().optional(),
  size: z.nativeEnum(PlantSizeEnum),
  siteId: z.string(),
  speciesId: z.string().optional(),
});

export type PlantFormValues = z.infer<typeof plantFormSchema>;

export const plantNameSchema = plantFormSchema.pick({
  name: true,
});

export type PlantNameForm = z.infer<typeof plantNameSchema>;

export const plantSizeSchema = plantFormSchema.pick({
  size: true,
});

export type PlantSizeForm = z.infer<typeof plantSizeSchema>;
