import ErrorBoundary from '@/components/ErrorBoundry';
import FiltersNav from '@/components/FiltersNav';
import { fetchTodosCount } from '@/services';
import { Filter } from '@/types';
import { Suspense } from 'react';

export default function FiltersNavigation() {
    const filters: Filter[] = [
        {
            key: 1,
            path: '/',
            label: 'All',
            count: 0
        },
        {
            key: 2,
            path: '/active',
            label: 'Active',
            count: 0
        },
        {
            key: 3,
            path: '/completed',
            label: 'Completed',
            count: 0
        },
    ];

    return (
        <ErrorBoundary fallback={<FiltersNav filters={filters} />}>
            <Suspense fallback={<FiltersNav filters={filters} />}>
                {/* @ts-expect-error Async Server Component */}
                <AsyncFiltersNav filters={filters} />
            </Suspense>
        </ErrorBoundary>
    );
}

async function AsyncFiltersNav({ filters }: { filters: Filter[] }) {
    const { allCount, activeCount, completedCount } = await fetchTodosCount();

    const countMap: Record<number, any> = {
        1: allCount,
        2: activeCount,
        3: completedCount
    };

    return (
        <FiltersNav filters={[...filters].map((filter) => {
            filter.count = countMap[filter.key];
            return filter;
        })} />
    );
}