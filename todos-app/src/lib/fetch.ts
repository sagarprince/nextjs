
// import { headers } from 'next/headers';

export function customFetch(input: RequestInfo | URL, options?: RequestInit, params?: Record<string, any>): Promise<Response> {
    // const host = headers().get('host');
    const url = new URL(`http://localhost:3000${input}`);
    params 
        && Object.keys(params).length > 0 
        && Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url, options);
}

export type CustomFetchParams = Parameters<typeof customFetch>;