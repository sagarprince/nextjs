
import { headers } from 'next/headers';

export function customFetch(endpoint: any, params?: any, init?: RequestInit): Promise<Response> {   
    const host = headers().get('host');
    const url = new URL(`http://${host}/api/${endpoint}`);
    Object.keys(params).length > 0 && Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return fetch(url, init);
}