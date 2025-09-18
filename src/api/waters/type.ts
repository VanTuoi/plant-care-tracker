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
