export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export interface Errors {
  [field: string]: string[];
}

export interface ResponseData<T> {
  message: string;
  success: boolean;
  meta?: any;
  data: T | null;
  errors?: Errors;
}
