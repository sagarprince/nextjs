import './globals.css';
// import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import React from 'react';
import Header from '@/components/Header';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from 'react-hot-toast';

// const poppins = Poppins({
//     weight: ['300', '400', '500', '600'],
//     subsets: ['latin-ext']
// });

// Font files can be colocated inside of `app`
const myFont = localFont({
    src: [
        {
            path: '../../public/fonts/Poppins-Regular.ttf',
            weight: '400'
        },
        {
            path: '../../public/fonts/Poppins-Medium.ttf',
            weight: '500'
        },
        {
            path: '../../public/fonts/Poppins-Bold.ttf',
            weight: '600'
        }
    ],
    display: 'swap',
});

export const metadata = {
    title: 'Todos App',
    description: '',
}

export default function RootLayout(props: {
    add_todo_form: React.ReactNode,
    filters_nav: React.ReactNode,
    children: React.ReactNode
}) {
    return (
        <html lang="en" data-theme="light">
            <body className={myFont.className} suppressHydrationWarning={true}>
                <AppProvider>
                    <section className='App'>
                        <Header>
                            {props.add_todo_form}
                            {props.filters_nav}
                        </Header>
                        <main>
                            {props.children}
                        </main>
                    </section>
                    <Toaster toastOptions={{ position: "bottom-right" }} />
                </AppProvider>
            </body>
        </html>
    )
}
