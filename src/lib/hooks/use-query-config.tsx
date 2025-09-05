/* eslint-disable max-params */
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getNextPageParam,
  getPreviousPageParam,
  getQueryKey,
  type PaginateQuery,
} from '@/api';

export function useQueryConfig(
  key: string,
  fetchFn: (params: any) => Promise<any>,
  params: Record<string, any>,
  options?: object
) {
  const queryKey = getQueryKey(key, params);

  return useQuery({
    queryKey,
    queryFn: () => fetchFn(params),
    ...options,
  });
}

export function useInfiniteQueryConfig<T>(
  key: string,
  fetchFn: (params: any) => Promise<PaginateQuery<T>>,
  params: Record<string, any>,
  options?: object
) {
  const queryKey = getQueryKey(key, params);

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      return fetchFn({ ...params, offset: pageParam });
    },
    getNextPageParam,
    getPreviousPageParam,
    initialPageParam: 0,
    ...options,
  });
}
