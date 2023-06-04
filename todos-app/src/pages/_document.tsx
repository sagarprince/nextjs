import { Html, Head, Main, NextScript } from 'next/document';

export const metadata = {
    title: 'Todos App',
    description: '',
}

export default function Document() {
    return (
        <Html lang="en" data-theme="light">
            <Head>
                <title>Todos App</title>
                <meta name="description" content="Create todos application." />
                <link rel="icon" href="favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}