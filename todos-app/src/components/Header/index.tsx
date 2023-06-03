"use client"

import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import styles from './Header.module.scss';
import AddTodoForm from '../AddTodoForm';
import FiltersNav from '../FiltersNav';

const Header: React.FC<{ children: ReactNode}> = ({ children }) => {
    const headerRef = useRef<HTMLInputElement>(null);

    const handleHeader = useCallback(() => {
        const scrollY = window.scrollY;
        const header = headerRef && headerRef.current || null;
        if (scrollY > 30) {
            header ?.classList.add(styles['scrolling']);
        } else {
            header ?.classList.remove(styles['scrolling']);
        }
    }, []);

    const handleScroll = useCallback(() => {
        handleHeader();
    }, [handleHeader]);

    useEffect(() => {
        handleHeader();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [headerRef, handleScroll])

    return (
        <header className={styles.header} ref={headerRef}>
            {/* <AddTodoForm />
            <FiltersNav /> */}
            {children}
        </header>
    );
}

export default Header;