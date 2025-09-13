import { type LightType, type SoilType, type Sunlight } from '../template-site';

export type Site = {
  id: string;

  name?: string;
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

  userId?: string;
  templateSiteId?: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export type FilterSites = {
  name?: string;
  scientificName?: string;
};

export type SortSite = {
  orderBy: keyof Site;
  order: 'asc' | 'desc';
};

export type QuerySites = {
  page?: number;
  limit?: number;
  filters?: FilterSites | null;
  sort?: SortSite[] | null;
};
