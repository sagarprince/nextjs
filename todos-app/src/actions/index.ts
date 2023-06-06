import { addNewTodo, updateTodo, deleteTodoById } from "@/services";

export async function addTodo(data: FormData) {
    'use server';

    const todoName = data.get('name') ?.valueOf()
    if (typeof todoName !== "string" || todoName.length === 0) {
        throw new Error('Please enter a todo name.');
    }

    await addNewTodo({ todoName });
}

export async function toggleTodo(id: string, complete: boolean): Promise<any> {
    "use server";

    return await updateTodo({ id, complete });
}

export async function updateTodoName(id: string, name: string): Promise<any> {
    "use server";

    return await updateTodo({ id, name });
}

export async function deleteTodo(id: string): Promise<any> {
    "use server";

    return deleteTodoById(id);
}