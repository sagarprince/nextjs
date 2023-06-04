"use client"

import React, { Fragment, useEffect } from 'react';
import styles from './FiltersNav.module.scss';
import { classNames } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Filter } from '@/types';
import { TODOS_COUNT_API, fetcher } from '@/hooks/useTodos';

const FiltersNav: React.FC<{ filters: Filter[] }> = ({ filters }) => {
    const pathName = usePathname();

    // const fetchTodosCount = async () => {
    //     const { count } = await fetcher(TODOS_COUNT_API);
    //     console.log(count);
    // }

    // useEffect(() => {
    //     fetchTodosCount();
    // }, [fetchTodosCount]);

    return (
        <div className={classNames('tabs tabs-boxed', styles.filters)}>
            {filters.map((filter) => {
                return (
                    <Fragment key={filter.key}>
                        <Link className={`tab${(pathName == filter.path ? ' tab-active' : '')}`} href={filter.path}>
                            {filter.label} ({filter.count || 0})
                        </Link>
                    </Fragment>
                )
            })}
        </div>
    );
}

export default FiltersNav;