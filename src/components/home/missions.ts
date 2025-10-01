import type { Plant } from '@/api';
import type { Water } from '@/api';
import type { Fertilizer } from '@/api';
import { FertilizerStatusEnum, WaterStatusEnum } from '@/api';
import { translate } from '@/lib';

export type Item = {
  plant: Plant;
  type: 'watering' | 'fertilizing';
  overdueText?: string;
};

export type Mission = {
  label: string;
  items: Item[];
};

export function getLastDone<
  T extends { status: string; updatedAt: string | Date },
>(records?: T[], doneStatus?: string): T | null {
  if (!records || records.length === 0 || !doneStatus) return null;
  const doneRecords = records
    .filter((r) => r.status === doneStatus)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  return doneRecords.length > 0 ? doneRecords[0] : null;
}

export const getWateringMissions = (
  plants: Plant[] = [],
  waters: Water[] = []
): Mission[] => {
  const today = new Date();
  const items: Item[] = [];

  for (const plant of plants) {
    if (!plant.wateringFrequency) continue;

    const relatedWaters = (waters || []).filter(
      (w) => (w.plant?.id ?? (w as any).plantId) === plant.id
    );

    const lastWater = getLastDone(relatedWaters, WaterStatusEnum.DONE);
    const lastDate = lastWater ? new Date(lastWater.updatedAt) : null;

    const nextDate = lastDate
      ? new Date(
          lastDate.getTime() + plant.wateringFrequency * 24 * 60 * 60 * 1000
        )
      : today;

    if (
      nextDate.getFullYear() === today.getFullYear() &&
      nextDate.getMonth() === today.getMonth() &&
      nextDate.getDate() === today.getDate()
    ) {
      items.push({
        plant,
        type: 'watering',
      });
    }
  }

  if (items.length === 0) return [];
  return [{ label: translate('home.tasks.water'), items }];
};

export const getFertilizingMissions = (
  plants: Plant[] = [],
  fertilizers: Fertilizer[] = []
): Mission[] => {
  const today = new Date();
  const items: Item[] = [];

  for (const plant of plants) {
    if (!plant.fertilizingFrequency) continue;

    const relatedFerts = (fertilizers || []).filter(
      (f) => (f.plant?.id ?? (f as any).plantId) === plant.id
    );

    const lastFertilizer = getLastDone(relatedFerts, FertilizerStatusEnum.DONE);
    const lastDate = lastFertilizer ? new Date(lastFertilizer.updatedAt) : null;

    const nextDate = lastDate
      ? new Date(
          lastDate.getTime() + plant.fertilizingFrequency * 24 * 60 * 60 * 1000
        )
      : today;

    if (
      nextDate.getFullYear() === today.getFullYear() &&
      nextDate.getMonth() === today.getMonth() &&
      nextDate.getDate() === today.getDate()
    ) {
      items.push({
        plant,
        type: 'fertilizing',
      });
    }
  }

  if (items.length === 0) return [];
  return [{ label: translate('home.tasks.fertilize'), items }];
};

export const getTodayTasksCount = (
  plants: Plant[] = [],
  waters: Water[] = [],
  fertilizers: Fertilizer[] = []
): number => {
  const wm = getWateringMissions(plants, waters);
  const fm = getFertilizingMissions(plants, fertilizers);
  const countFrom = (ms: Mission[]) =>
    ms.reduce((s, m) => s + (m.items?.length ?? 0), 0);
  return countFrom(wm) + countFrom(fm);
};
