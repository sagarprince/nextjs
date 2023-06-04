import { AppProvider } from '@/contexts/AppContext'
import './globals.css'
import { Poppins } from 'next/font/google'
import React from 'react'
import Header from './header'

const poppins = Poppins({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin-ext']
})

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
            <body className={poppins.className} suppressHydrationWarning={true}>
                <section className='App'>
                    <Header>
                        {props.add_todo_form}
                        {props.filters_nav}
                    </Header>
                    <main>
                        {props.children}
                    </main>
                </section>
            </body>
        </html>
    )
}
