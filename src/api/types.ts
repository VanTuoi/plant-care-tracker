export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};
export type InfinityPaginationResponse<T> = {
  data: T[];
  hasNextPage: boolean;
};

export interface ResponseData<T> {
  data?: T | null;
}

export interface ErrorResponse {
  status: number;
  message?: string;
  errors?: {
    email?: 'notFound';
    password?: 'incorrectPassword';
    [key: string]: string | undefined;
  };
}
