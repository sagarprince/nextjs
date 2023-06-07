"use client"

import React, { ChangeEvent, useCallback, useEffect, useState, useTransition } from "react";
import styles from './AddTodoForm.module.scss';
import { useRouter } from 'next/navigation';
import { showErrorToast } from "@/utils/helpers";
import { SET_TOAST_MESSAGE, UPDATE_TOAST_PENDING_STATUS } from '@/contexts/AppContext';
import { useAppDispatch } from '@/hooks/useApp';
import { Todo } from "@/types";

const AddTodoForm: React.FC<{ addTodo: (data: FormData) => Promise<any> }> = ({ addTodo }) => {
    const router = useRouter();

    const [todoName, setTodoName] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [_, startDispatchTransition] = useTransition();

    const dispatch = useAppDispatch();

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTodoName(event.target.value);
    }, []);

    const onAddTodo = useCallback(async (data: FormData) => {
        try {
            const { todo }: { todo: Todo } = await addTodo(data);
            dispatch({
                type: SET_TOAST_MESSAGE, toastMessage: {
                    id: todo.id,
                    message: 'New todo added successfully.',
                    isPending: true
                }
            });
            startTransition(() => {
                router.refresh();
                startDispatchTransition(() => {
                    setTodoName('');
                    dispatch({ type: UPDATE_TOAST_PENDING_STATUS, id: todo.id, isPending: false });
                });
            });
        } catch (e: any) {
            showErrorToast('Failed to add the new todo.');
        } finally {
            setLoading(false);
        }
    }, [addTodo, setLoading, router]);

    const onSubmit = useCallback(() => {
        setLoading(true);
    }, [setLoading]);

    return (
        <form action={onAddTodo} onSubmit={onSubmit} className={styles.add_todo_form}>
            <input
                type="text"
                name='name'
                value={todoName}
                placeholder="What need to be done?"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={handleChange}
                autoComplete='off'
            />
            <button type="submit" disabled={!todoName || isLoading || isPending}
                className="btn btn-active btn-accent w-64 rounded-full">Add</button>
        </form>
    );
}

export default AddTodoForm;