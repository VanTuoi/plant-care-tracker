export type User = {
  id: string;
  name: string;
  gender: 'male' | 'female' | string;
  email: string;
  phone: string;
  status: 'active' | 'block' | 'graduated';
};

export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type FilterOption = {
  search?: string;
  sortDirection?: 'asc' | 'desc';
  sortBy?: 'id' | 'name' | 'createdAt';
  categoryId?: string;
  searchFields?: string[];
  [key: string]: any;
};
