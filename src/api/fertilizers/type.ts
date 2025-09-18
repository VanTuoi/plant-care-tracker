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

export type Fertilizer = {
  id: string;
  note?: string;
  amount: number;
  method: FertilizerMethodEnum;
  fertilizerType: FertilizerTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  plantId: string;
};
