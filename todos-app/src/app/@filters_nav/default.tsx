import FiltersNav from '@/components/FiltersNav';
import { fetchTodosCount } from '@/services';
import { Filter } from '@/types';

export default async function() {
    const { count: allCount } = await fetchTodosCount({
        status: ''
    });
    const { count: activeCount } = await fetchTodosCount({
        status: 'active'
    });
    const { count: completedCount } = await fetchTodosCount({
        status: 'completed'
    });
    console.log(allCount, activeCount, completedCount);

    const filters: Filter[] = [
        {
            key: 1,
            path: '/',
            label: 'All',
            count: allCount
        },
        {
            key: 2,
            path: '/active',
            label: 'Active',
            count: activeCount
        },
        {
            key: 3,
            path: '/completed',
            label: 'Completed',
            count: completedCount
        },
    ];

    return (
        <FiltersNav filters={filters} />
    );
}