import { customFetch, CustomFetchParams } from '@/lib/fetch';
import useSWR from 'swr';

export const fetcher = async (...args: CustomFetchParams): Promise<any> => {
    const res = await customFetch(...args);
    const data = await res.json();
    return data;
};

export const API = '/api/todos';
export const ALL_TODOS_API = '/api/todos';
export const ACTIVE_TODOS_API = '/api/todos?status=active';
export const COMPLETE_TODOS_API = '/api/todos?status=completed';

export const TODOS_COUNT_API = '/api/todos/count';

export const useTodos = (key?: any, fetch?: any) => {
    const { data, error, isLoading, mutate } = useSWR(() => key, fetch || null, {
        revalidateOnFocus: true,
        // refreshInterval: 1
    });
    return { data, error, isLoading, mutate };
};

export const useTodosCount = (fetch?: any) => {
    const { data, error, isLoading, mutate } = useSWR(TODOS_COUNT_API, fetch || null, {
        revalidateOnFocus: true
    });
    return { data, error, isLoading, mutate };
};