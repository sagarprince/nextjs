import { useCallback } from 'react';
import styles from './Todos.module.scss';
import { Todo } from '@/types';
import { filters } from '@/constants';
import { usePathname } from 'next/navigation';
import { API, fetcher, useTodos } from '@/hooks/useTodos';
import TodoCard from '@/components/TodoCard';

const Todos: React.FC<{
    todos: Todo[],
    isLoading?: boolean
}> = ({ todos, isLoading }) => {
    const pathName = usePathname();
    const filter = filters.find((filter) => filter.path === pathName);
    const key = filter && filter.dataKey || API;
    const { mutate } = useTodos(key, fetcher);

    const updateTodo = useCallback(async ({ id, ...rest }: { id: string, [key: string]: any; }) => {
        const response = await fetcher(API, {
            method: 'PUT',
            body: JSON.stringify({
                id,
                ...rest
            })
        });
        const todo = await response;
        return todo;
    }, [fetcher]);


    const toggleTodo = useCallback(async ({ id, complete }: { id: string, complete: boolean }) => {
        const todo = await updateTodo({ id, complete });
        return todo;
    }, [fetcher]);

    const onToggleTodo = useCallback(async (id: string, complete: boolean) => {
        try {
            await mutate(toggleTodo({ id, complete }), {
                optimisticData: (currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    return {
                        todos: pathName === '/' ? [...todos.map((todo) => {
                            if (todo.id === id) return { ...todo, complete };
                            return todo;
                        })] : [...todos.filter((todo) => todo.id !== id)]
                    }
                },
                rollbackOnError: true,
                populateCache: (updatedTodo: Todo, currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    return {
                        todos: pathName === '/' ? [...todos.map((todo) => {
                            if (todo.id === updatedTodo.id) return { ...updatedTodo };
                            return todo;
                        })] : [...todos.filter((todo) => todo.id !== id)]
                    }
                },
                revalidate: false
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    const updateTodoName = useCallback(async ({ id, name }: { id: string, name: string }) => {
        const todo = await updateTodo({ id, name });
        return todo;
    }, [fetcher]);

    const onUpdateTodoName = useCallback(async (id: string, name: string, callback?: () => void) => {
        try {
            await mutate(updateTodoName({ id, name }), {
                optimisticData: (currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    callback && callback();
                    return {
                        todos: [...todos.map((todo) => {
                            if (todo.id === id) return { ...todo, name };
                            return todo;
                        })]
                    }
                },
                rollbackOnError: true,
                populateCache: (updatedTodo: Todo, currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    return {
                        todos: [...todos.map((todo) => {
                            if (todo.id === updatedTodo.id) return { ...updatedTodo };
                            return todo;
                        })]
                    }
                },
                revalidate: false
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    const deleteTodo = useCallback(async ({ id }: { id: string }) => {
        const response = await fetcher(API, {
            method: 'DELETE',
        }, { id });
        return await response;
    }, [fetcher]);

    const onDeleteTodo = useCallback(async (id: string) => {
        try {
            await mutate(deleteTodo({ id }), {
                optimisticData: (currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    return {
                        todos: [...todos.filter((todo) => todo.id !== id)]
                    }
                },
                rollbackOnError: true,
                populateCache: (_, currentData: any) => {
                    const { todos } = currentData as { todos: Todo[] };
                    return {
                        todos: [...todos.filter((todo) => todo.id !== id)]
                    }
                },
                revalidate: false
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <>
            {todos.length > 0 && <ul className={styles.todos}>
                {todos.map((todo) => {
                    return <li key={todo.id}>
                        <TodoCard
                            todo={todo}
                            isLoading={isLoading}
                            onToggleTodo={onToggleTodo}
                            onUpdateTodoName={onUpdateTodoName}
                            onDeleteTodo={onDeleteTodo}
                        />
                    </li>
                })}
            </ul> || <>No Todos Found...</>}
        </>
    );
}

export default Todos;