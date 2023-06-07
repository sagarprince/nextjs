"use client"

import React, { Fragment, useCallback, useEffect, useRef, useTransition } from 'react';
import styles from './FiltersNav.module.scss';
import { classNames, dismissToast, showToast } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Filter } from '@/types';
import useNetworkSpeed from '@/hooks/useNetworkSpeed';

const FiltersNav: React.FC<{ filters: Filter[] }> = ({ filters }) => {
    const pathName = usePathname();
    const router = useRouter();
    const networkSpeed = useNetworkSpeed();
    const [isPending, startTransition] = useTransition();

    let loadingToastId: React.MutableRefObject<number | string | undefined> = useRef();

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
        e.preventDefault();
        if (!isPending) {
            if (networkSpeed === 0) {
                showToast('Please check your internet connection.');
            } else {
                startTransition(() => {
                    router.push(path);
                });
            }
        }
    }, [router, networkSpeed, isPending]);

    useEffect(() => {
        console.log('isPending ', isPending);
        if (isPending) {
            loadingToastId.current = showToast('Loading...', {
                duration: Infinity,
            });
        } else {
            loadingToastId.current && dismissToast(loadingToastId.current);
        }
    }, [isPending, loadingToastId]);

    return (
        <div className={classNames('tabs tabs-boxed', styles.filters)} style={{ opacity: isPending ? 0.75 : 1 }}>
            {filters.map((filter) => {
                const isActive = pathName.endsWith(filter.path);
                return (
                    <Fragment key={filter.key}>
                        <Link
                            href={filter.path}
                            prefetch={true}
                            className={`tab${(isActive ? ' tab-active' : '')}`}
                            onClick={(e) => handleClick(e, filter.path)}>
                            {filter.label} ({filter.count || 0})
                        </Link>
                    </Fragment>
                )
            })}
        </div>
    );
}

export default FiltersNav;