export type PlantImage = {
  id: string;
  plantId: string;
  fileId: string;
  filePath?: string;
  createdAt: Date;
  deletedAt?: Date | null;
};
