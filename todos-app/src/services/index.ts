import { customFetch } from '@/lib/fetch';
import { Todo } from '@/types';
import { revalidateTag } from 'next/cache';

export async function fetchTodos({ status = '' }: { status?: string }): Promise<any> {
    const params: any = {};
    if (status) {
        params['status'] = status;
    }

    const response = await customFetch('todos', {
        next: {
            tags: ['todos'],
            revalidate: 0
        },
    }, params);

    if (!response.ok) {
        throw new Error('Failed to fetch todos.');
    }

    return await response.json();
}

export async function fetchTodosCount(): Promise<any> {
    const response = await customFetch('todos/count', {
        cache: "no-cache",
    });

    if (!response.ok) {
        throw new Error('Failed to fetch todos count.');
    }
    
    return await response.json();
}

export async function addNewTodo({ todoName }: { todoName: string }): Promise<any> {
    const response = await customFetch('todos', {
        method: 'POST',
        body: JSON.stringify({
            todoName
        })
    });

    if (!response.ok) {
        throw new Error('Error while adding todo.');
    }

    return await response.json();
}

export async function updateTodo({ id, ...rest }: { id: string, [key: string]: any }) {
    const response = await customFetch('todos', {
        method: 'PUT',
        body: JSON.stringify({
            id,
            ...rest
        }),
    });

    if (!response.ok) {
        throw new Error('Error while updating todo.');
    }

    return await response.json();
}

export async function deleteTodoById(id: string): Promise<any> {
    const response = await customFetch('todos', {
        method: 'DELETE'
    }, { id });

    if (!response.ok) {
        throw new Error('Error while deleting todo.');
    }

    return await response.json();
}