"use client"

import React, { ChangeEvent, useCallback, useState, useTransition } from "react";
import styles from './AddTodoForm.module.scss';
import { useRouter } from 'next/navigation';
import { showErrorToast, showSuccessToast } from "@/utils";


const AddTodoForm: React.FC<{ addTodo: (data: FormData) => Promise<void> }> = ({ addTodo }) => {
    const [todoName, setTodoName] = useState('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTodoName(event.target.value);
    }, []);

    const onAddTodo = useCallback(async (data: FormData) => {
        try {
            await addTodo(data);
            setTodoName('');
            startTransition(() => {
                router.refresh();
                showSuccessToast('New todo added successfully.');
            });
        } catch (e: any) {
            showErrorToast('Failed to add the new todo.');
        }
    }, [addTodo, router]);

    return (
        <form action={onAddTodo} className={styles.add_todo_form}>
            <input
                type="text"
                name='name'
                value={todoName}
                placeholder="What need to be done?"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={handleChange}
                autoComplete='off'
            />
            <button type="submit" disabled={!todoName || isPending}
                className="btn btn-active btn-accent w-64 rounded-full">Add</button>
        </form>
    );
}

export default AddTodoForm;