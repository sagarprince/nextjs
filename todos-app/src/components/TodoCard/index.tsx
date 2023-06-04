'use client'

import { ChangeEvent, FormEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './TodoCard.module.scss';
import { Todo } from '@/types'
import { classNames } from '@/utils';

const TodoCard: React.FC<{
    todo: Todo,
    isLoading?: boolean;
    onToggleTodo?: (id: string, complete: boolean) => Promise<void>,
    onUpdateTodoName?: (id: string, name: string, callback?: () => void) => Promise<void>,
    onDeleteTodo?: (id: string) => Promise<void>
}> = ({ todo, isLoading, onToggleTodo, onUpdateTodoName, onDeleteTodo }) => {
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

    const handleToggleTodo = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            setCompleted(e.target.checked);
            onToggleTodo && await onToggleTodo(todo.id, e.target.checked);
        } catch (e) {
            console.log(e);
        }
    }, [onToggleTodo]);

    const handleUpdateTodoName = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        try {
            if (todoName) {
                onUpdateTodoName && await onUpdateTodoName(todo.id, todoName, () => {
                    setEditable(false);
                });
            } else {
                setEditable(false);
                setTodoName(todo.name);
            }
        } catch (e) {
            console.log(e);
        }
    }, [onUpdateTodoName, todoName]);

    const handleDeleteTodo = useCallback(async () => {
        try {
            onDeleteTodo && await onDeleteTodo(todo.id);
        } catch (e) {
            console.log(e);
        }
    }, [onDeleteTodo]);

    // console.log('Todo Card ', todo.id);

    return (
        <div className={styles.todo_card}>
            <div className={styles.todo_card__item}>
                <input
                    type="checkbox"
                    checked={todo.complete}
                    className={classNames('checkbox', isLoading && 'shimmer-blur')}
                    onChange={(e) => handleToggleTodo(e)}
                />
                {!isEditable && <span
                    className={classNames(styles.todo_card__item__text, (todo.complete || isCompleted) && styles.completed)}
                    onDoubleClick={() => setEditable(!isEditable)}>
                    {todo.name}
                </span>}
                {isLoading && <span className={classNames('shimmer-bg', styles.todo_card__item__text_loading)}></span>}
                {isEditable && <form onSubmit={handleUpdateTodoName}><input
                    ref={inputRef}
                    type="text"
                    value={todoName}
                    name='name'
                    className={styles.editable_input}
                    onChange={(e) => {
                        setTodoName(e.target.value)
                    }} /></form>}
            </div>
            <button type="button" className={classNames('btn btn-error btn-circle', isLoading && 'shimmer-blur')}
                onClick={handleDeleteTodo}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32">
                    <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                </svg>
            </button>
        </div>
    )
}

export default memo(TodoCard);