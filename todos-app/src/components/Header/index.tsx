"use client"

import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import styles from './Header.module.scss';

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
    }, [headerRef, handleScroll, handleHeader])

    return (
        <header className={styles.header} ref={headerRef}>
            {children}
        </header>
    );
}

export default Header;