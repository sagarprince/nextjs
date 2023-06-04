import { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FiltersNav from '@/components/FiltersNav';
import { filters } from '@/constants';

const poppins = Poppins({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin-ext']
});

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='App'>
            <Header>
                <AddTodoForm />
                <FiltersNav filters={filters} />
            </Header>
            <main className={poppins.className}>
                <Component {...pageProps} />
            </main>
        </div>
    );
}