import FiltersNav from '@/components/FiltersNav';
import { fetchTodosCount } from '@/services';
import { Filter } from '@/types';
import { Suspense } from 'react';

export default async function() {
    const todosStatus = ['', 'active', 'completed'];

    const promises = Promise.all(todosStatus.map((status) => {
        return fetchTodosCount({
            status
        });
    }));

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
        <Suspense fallback={<><FiltersNav filters={filters} /></>}>
            {/* @ts-expect-error Async Server Component */}
            <AsyncFiltersNav promises={promises} filters={filters} />
        </Suspense>
    );
}

// Albums Component
async function AsyncFiltersNav({ promises, filters }: { promises: Promise<any[]>, filters: Filter[] }) {
    const counts = await promises;
 
    counts.forEach(({ count }, i) => {
        filters[i].count = count;
    });
   
    return (
        <FiltersNav filters={filters} />
    );
}