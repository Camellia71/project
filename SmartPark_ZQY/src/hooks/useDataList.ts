import { useState, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface DataFetcher<T> {
  (args: T & { page: number; pageSize: number }): Promise<any>;
}

interface ResponseParser<T> {
  (response: any): { list: T[]; total: number };
}

interface UseDataListOptions<T> {
  responseParser?: ResponseParser<T>;
  queryKey?: string;
  staleTime?: number;
  gcTime?: number;
}

export interface UseDataListResult<T, F> {
  dataList: T[];
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  error: unknown;
  formData: F;
  setFormData: React.Dispatch<React.SetStateAction<F>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => void;
  invalidate: () => void;
  reset: () => void;
  onChange: (page: number, pageSize?: number) => void;
}

function useDataList<T extends object, F extends object>(
  initialFormData: F,
  fetchData: DataFetcher<F>,
  options: UseDataListOptions<T> = {}
): UseDataListResult<T, F> {
  const {
    responseParser,
    queryKey: customQueryKey,
    staleTime = 30000,
    gcTime = 5 * 60 * 1000,
  } = options;

  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [formData, setFormData] = useState<F>(initialFormData);

  const defaultParser = (response: any): { list: T[]; total: number } => {
    const res = response?.data || response;
    return {
      list: res?.list || [],
      total: res?.total || 0,
    };
  };

  const parseResponse = useMemo(() => responseParser || defaultParser, [responseParser]);

  const baseQueryKey = useMemo(() => customQueryKey || fetchData.name || 'dataList', [customQueryKey, fetchData.name]);
  
  const queryKey = [baseQueryKey, page, pageSize, formData] as const;

  const {
    data: parsedData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetchData({ page, pageSize, ...formData as any });
      return parseResponse(response);
    },
    staleTime,
    gcTime,
  });

  const dataList = parsedData?.list || [];
  const total = parsedData?.total || 0;

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [baseQueryKey] });
  }, [queryClient, baseQueryKey]);

  const onChange = useCallback((newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize !== undefined) {
      setPageSize(newPageSize);
    }
  }, []);

  const reset = useCallback(() => {
    setPage(1);
    setPageSize(10);
    setFormData(initialFormData);
  }, [initialFormData]);

  return {
    dataList,
    page,
    pageSize,
    total,
    loading: isLoading,
    error,
    formData,
    setFormData,
    setPage,
    setPageSize,
    refetch,
    invalidate,
    reset,
    onChange,
  };
}

export default useDataList;