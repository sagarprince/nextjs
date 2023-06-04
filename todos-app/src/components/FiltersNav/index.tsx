"use client"

import React, { Fragment } from 'react';
import styles from './FiltersNav.module.scss';
import { classNames } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Filter } from '@/types';

const FiltersNav: React.FC<{ filters: Filter[] }> = ({ filters }) => {
    const pathName = usePathname();

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