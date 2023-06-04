import { prisma } from '@/lib/prisma';
import AddTodoForm from '@/components/AddTodoForm';
import { addNewTodo } from '@/services';
import { revalidateTag } from 'next/cache';

async function addTodo(data: FormData) {
    'use server';

    const todoName = data.get('name') ?.valueOf()
    if (typeof todoName !== "string" || todoName.length === 0) {
        throw new Error('Please enter a todo name.');
    }

    await addNewTodo({
        todoName
    });
}

export default function() {
    return (
        <AddTodoForm addTodo={addTodo} />
    );
}