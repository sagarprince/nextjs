"use client"

import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from './AddTodoForm.module.scss';
import { Todo } from '@/types';
import { filters } from '@/constants';
import { usePathname } from 'next/navigation';
import { API, fetcher, useTodos } from '@/hooks/useTodos';

const AddTodoForm: React.FC = () => {
    const [todoName, setTodoName] = useState('');
    const pathName = usePathname();
    const filter = filters.find((filter) => filter.path === pathName);
    const key = filter && filter.path !== '/completed' && filter.dataKey || API;
    const { mutate } = useTodos(key, fetcher);

    const addTodo = useCallback(async (data: any) => {
        const response = await fetcher(API, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const todo = await response;
        return todo;
    }, [fetcher]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTodoName(event.target.value);
    }, []);

    const onAddTodo = useCallback(async (ev: FormEvent) => {
        ev.preventDefault();
        try {
            const newTodo: Todo = {
                id: new Date().getTime(),
                name: todoName,
                complete: false
            }
            await mutate(addTodo({ todoName }), {
                optimisticData: (currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    setTodoName('');
                    return {
                        todos: [...todos, newTodo]
                    };
                },
                rollbackOnError: true,
                populateCache: (addedTodo: Todo, currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    const updatedTodos = [...todos, newTodo];
                    return {
                        todos: [...updatedTodos.map((todo) => {
                            if (todo.id === newTodo.id) {
                                todo = { ...addedTodo };
                            }
                            return todo;
                        })]
                    };
                },
                revalidate: false
            });
        } catch (e) {
            console.log(e);
        }
    }, [todoName]);

    return (
        <form onSubmit={onAddTodo} className={styles.add_todo_form}>
            <input
                type="text"
                name='name'
                value={todoName}
                placeholder="What need to be done?"
                className="input input-bordered input-accent w-full max-w-xs"
                onChange={handleChange}
                autoComplete='off'
            />
            <button type="submit" disabled={!todoName}
                className="btn btn-active btn-accent w-64 rounded-full">Add</button>
        </form>
    );
}

export default AddTodoForm;