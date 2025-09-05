import { useRouter } from 'expo-router';
import { usePathname, useSearchParams } from 'expo-router/build/hooks';

export function useQueryParams<T extends Record<string, string | undefined>>(
  defaultParams: T
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramObj: T = {
    ...defaultParams,
    ...Object.fromEntries(searchParams.entries()),
  } as T;

  const setQuery = (newParams: Partial<T>, replace = false) => {
    const merged = replace ? newParams : { ...paramObj, ...newParams };

    const filtered = Object.fromEntries(
      Object.entries(merged).filter(([_, value]) => value !== undefined)
    );

    if (replace) {
      router.replace({
        pathname: pathname as any,
        params: filtered,
      });
    } else {
      router.setParams(filtered);
    }
  };

  return {
    queryParams: paramObj,
    setQuery,
  };
}
