'use client'

import styles from './TodoCard.module.scss';
import { Todo } from '@/types'
import { classNames } from '@/utils';
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';

const TodoCard: React.FC<{
    todo: Todo,
    toggleTodo?: (id: string, complete: boolean) => Promise<void>,
    updateTodo?: (id: string, name: string) => Promise<void>,
    deleteTodo?: (id: string) => Promise<void>
}> = ({ todo, toggleTodo, updateTodo, deleteTodo }) => {
    const [isCompleted, setCompleted] = useState(false);
    const [todoName, setTodoName] = useState('');
    const [isEditable, setEditable] = useState(false);

    const inputRef: any = useRef(null);

    useEffect(() => {
        setTodoName(todo.name);
    }, [todo]);

    const handleClickOutside = useCallback((event: any) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setEditable(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    const onToggleTodo = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            setCompleted(e.target.checked);
            toggleTodo && await toggleTodo(todo.id, e.target.checked);
        } catch (e) {
            console.log(e);
        }
    }, [toggleTodo]);

    const onUpdateTodo = useCallback(async (data: FormData) => {
        try {
            const todoName: any = data.get('name') ?.valueOf();
            if (todoName) {
                updateTodo && await updateTodo(todo.id, todoName);
            } else {
                setEditable(false);
                setTodoName(todo.name);
            }
        } catch (e) {
            console.log(e);
        }
    }, [updateTodo]);

    const onDeleteTodo = useCallback(async () => {
        try {
            deleteTodo && await deleteTodo(todo.id);
        } catch (e) {
            console.log(e);
        }
    }, [deleteTodo]);

    return (
        <div className={styles.todo_card}>
            <div className={styles.todo_card__item}>
                <input
                    type="checkbox"
                    defaultChecked={todo.complete}
                    className={classNames('checkbox')}
                    onChange={(e) => onToggleTodo(e)}
                />
                {!isEditable && <span
                    className={classNames(styles.todo_card__item__text, (todo.complete || isCompleted) && styles.completed)}
                    onDoubleClick={() => setEditable(!isEditable)}>
                    {todo.name}
                </span>}
                {isEditable && <form action={onUpdateTodo}><input
                    ref={inputRef}
                    type="text"
                    value={todoName}
                    name='name'
                    className={styles.editable_input}
                    onChange={(e) => {
                        setTodoName(e.target.value)
                    }} /></form>}
            </div>
            <button type="button" className={classNames('btn btn-error btn-circle')}
                onClick={onDeleteTodo}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
                    <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                </svg>
            </button>
        </div>
    )
}

export default memo(TodoCard);