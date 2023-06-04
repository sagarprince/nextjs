import { ReactNode } from 'react';
import HeaderComponent from '@/components/Header';

export default function Header(props : { children: ReactNode}) {
    return (
        <HeaderComponent>
            {props.children}
        </HeaderComponent>
    );
}