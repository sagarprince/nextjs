"use client"

import React, { Fragment, useMemo } from 'react';
import styles from './FiltersNav.module.scss';
import { classNames } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Filter {
    key: number;
    path: string;
    label: string;
}

const FiltersNav: React.FC = () => {
    const pathName = usePathname();

    const filters: Filter[] = useMemo(() => {
        return [
            {
                key: 1,
                path: '/',
                label: 'All',
            },
            {
                key: 2,
                path: '/active',
                label: 'Active',
            },
            {
                key: 3,
                path: '/completed',
                label: 'Completed',
            },
        ];
    }, []);

    return (
        <div className={classNames('tabs tabs-boxed', styles.filters)}>
            {filters.map((filter: any) => {
                return (
                    <Fragment key={filter.key}>
                        <Link className={`tab${(pathName == filter.path ? ' tab-active' : '')}`} href={filter.path}>
                            {filter.label} (0)
                        </Link>
                    </Fragment>
                )
            })}
        </div>
    );
}

export default FiltersNav;