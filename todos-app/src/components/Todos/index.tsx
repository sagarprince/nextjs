import styles from './Todos.module.scss';
import { Todo } from '@/types';
import TodoCard from '@/components/TodoCard';

const Todos: React.FC<{
    todos: Todo[],
    isFetching?: boolean,
    toggleTodo?: (id: string, complete: boolean) => Promise<void>,
    updateTodo?: (id: string, name: string) => Promise<void>,
    deleteTodo?: (id: string) => Promise<void>
}> = ({ todos, isFetching, toggleTodo, updateTodo, deleteTodo }) => {
    return (
        <>
            <ul className={styles.todos}>
                {todos.map((todo) => {
                    return <li key={todo.id}>
                        <TodoCard
                            todo={todo}
                            isFetching={isFetching}
                            toggleTodo={toggleTodo}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo} />
                    </li>
                })}
            </ul>
        </>
    );
}

export default Todos;