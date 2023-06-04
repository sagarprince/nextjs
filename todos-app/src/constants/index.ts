import { ACTIVE_TODOS_API, ALL_TODOS_API, COMPLETE_TODOS_API } from '@/hooks/useTodos';
import { Filter } from '@/types';

export const filters: Filter[] = [
    {
        key: 1,
        path: '/',
        label: 'All',
        count: 0,
        dataKey: ALL_TODOS_API
    },
    {
        key: 2,
        path: '/active',
        label: 'Active',
        count: 0,
        dataKey: ACTIVE_TODOS_API
    },
    {
        key: 3,
        path: '/completed',
        label: 'Completed',
        count: 0,
        dataKey: COMPLETE_TODOS_API
    },
];