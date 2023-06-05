import { customFetch } from '@/lib/fetch';
import { Todo } from '@/types';
import { revalidateTag } from 'next/cache';

export async function fetchTodos({ status = '' }: { status?: string }): Promise<any> {
    const params: any = {};
    if (status) {
        params['status'] = status;
    }

    const response = await customFetch('todos', params, {
        next: {
            tags: ['todos'],
            revalidate: 0
        }
    });

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch todos.');
    }

    return await response.json();
}

export async function fetchTodosCount(): Promise<any> {
    const response = await customFetch('todos/count', {}, {
        cache: "no-cache",
    });

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch todos count.');
    }
    
    return await response.json();
}

export async function addNewTodo({ todoName }: { todoName: string }): Promise<any> {
    const response = await customFetch('todos', {}, {
        method: 'POST',
        body: JSON.stringify({
            todoName
        })
    });

    if (!response.ok) {
        throw new Error('Error while adding todo.');
    }

    // revalidateTag('todos');

    return await response.json();
}

export async function updateTodo({ id, ...rest }: { id: string, [key: string]: any }) {
    const response = await customFetch('todos', {}, {
        method: 'PUT',
        body: JSON.stringify({
            id,
            ...rest
        }),
    });

    if (!response.ok) {
        throw new Error('Error while updating todo.');
    }

    // revalidateTag('todos');

    return await response.json();
}

export async function toggleTodo(id: string, complete: boolean): Promise<any> {
    "use server"

    return await updateTodo({
        id,
        complete
    });
}

export async function updateTodoName(id: string, name: string): Promise<any> {
    "use server"

    return await updateTodo({
        id,
        name
    });
}

export async function deleteTodo(id: string): Promise<any> {
    "use server"

    const response = await customFetch('todos', { id }, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Error while deleting todo.');
    }

    // revalidateTag('todos');

    return await response.json();
}