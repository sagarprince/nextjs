
import { headers } from 'next/headers';

export function customFetch(input: RequestInfo | URL, options?: RequestInit, params?: Record<string, any>): Promise<Response> {   
    const host = headers().get('host');
    const url = new URL(`http://${host}/api/${input}`);

    params && Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    return fetch(url, options);
}