import {
  type FertilizerMethodEnum,
  type FertilizerTypeEnum,
} from '../fertilizers';
import { type WaterEnum } from '../waters';

export enum DifficultyLevelEnum {
  EASY = 'easy',
  MODERATE = 'moderate',
  HARD = 'hard',
}

export enum SunlightNeedEnum {
  FULL_SUN = 'full_sun',
  PARTIAL_SUN = 'partial_sun',
  SHADE = 'shade',
  UNKNOWN = 'unknown',
}

export type Species = {
  id: string;
  name: string;
  scientificName: string;

  image?: {
    id: string;
    filePath: string;
  } | null;

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
};

export type FilterSpecies = {
  name?: string;
  scientificName?: string;
};

export type SortSpecies = {
  orderBy: keyof Species;
  order: 'asc' | 'desc';
};

export type QuerySpecies = {
  page?: number;
  limit?: number;
  filters?: FilterSpecies | null;
  sort?: SortSpecies[] | null;
};
