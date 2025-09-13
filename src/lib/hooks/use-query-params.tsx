import { useRouter } from 'expo-router';
import { usePathname, useSearchParams } from 'expo-router/build/hooks';
import { useMemo } from 'react';

export function useQueryParams<T extends Record<string, any>>(
  defaultParams: T
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryParams: T = useMemo(() => {
    const params: Record<string, string> = Object.fromEntries(
      searchParams.entries()
    );
    const result: any = { ...defaultParams };

    for (const key in defaultParams) {
      if (params[key] !== undefined) {
        try {
          const parsed = JSON.parse(params[key] as string);
          result[key] = parsed;
        } catch {
          if (typeof defaultParams[key] === 'number') {
            const n = Number(params[key]);
            result[key] = isNaN(n) ? defaultParams[key] : n;
          } else {
            result[key] = params[key];
          }
        }
      }
    }
    return result;
  }, [searchParams, defaultParams]);

  const setQuery = (newParams: Partial<T>, replace = false) => {
    const merged = replace ? newParams : { ...queryParams, ...newParams };

    const filtered: Record<string, string> = {};
    for (const key in merged) {
      const val = merged[key];
      if (val !== undefined && val !== null && val !== '') {
        filtered[key] =
          typeof val === 'object' ? JSON.stringify(val) : String(val);
      }
    }

    if (replace) {
      router.replace({ pathname: pathname as any, params: filtered });
    } else {
      router.setParams(filtered);
    }
  };

  return {
    queryParams,
    setQuery,
  };
}
