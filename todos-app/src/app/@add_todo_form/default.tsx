import { prisma } from '@/lib/prisma';
import AddTodoForm from '@/components/AddTodoForm';
import { addNewTodo } from '@/services';

async function addTodo(data: FormData) {
    'use server';

    const todoName = data.get('name') ?.valueOf()
    if (typeof todoName !== "string" || todoName.length === 0) {
        throw new Error('Please enter a todo name.');
    }

    // await prisma.todo.create({ data: { name: todoName, complete: false } });
    await addNewTodo({
        todoName
    });
}

export default function() {
    return (
        <AddTodoForm addTodo={addTodo} />
    );
}