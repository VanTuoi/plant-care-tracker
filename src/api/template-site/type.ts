export enum Sunlight {
  FULL_SUN = 'full_sun',
  PARTIAL_SUN = 'partial_sun',
  SHADE = 'shade',
  UNKNOWN = 'unknown',
}

export enum LightType {
  LED = 'led',
  FLUORESCENT = 'fluorescent',
  INCANDESCENT = 'incandescent',
  NATURAL = 'natural',
  UNKNOWN = 'unknown',
}

export enum SoilType {
  SANDY = 'sandy',
  CLAY = 'clay',
  LOAMY = 'loamy',
  PEATY = 'peaty',
  CHALKY = 'chalky',
  SILTY = 'silty',
  UNKNOWN = 'unknown',
}

export type TemplateSite = {
  id: string;
  name: string;
  description?: string;

  sunlight?: Sunlight;
  lightDuration?: number;
  lightType?: LightType;

  soilMoisture?: number;
  soilType?: SoilType;
  phSoil?: number;

  temperature?: number;
  humidity?: number;
  windExposure?: number;

  latitude?: number;
  longitude?: number;
  altitude?: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type FilterTemplateSites = {
  name?: string;
  scientificName?: string;
};

export type SortTemplateSite = {
  orderBy: keyof TemplateSite;
  order: 'asc' | 'desc';
};

export type QueryTemplateSites = {
  page?: number;
  limit?: number;
  filters?: FilterTemplateSites | null;
  sort?: SortTemplateSite[] | null;
};
