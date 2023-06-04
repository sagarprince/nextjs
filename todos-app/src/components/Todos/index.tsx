import styles from './Todos.module.scss';
import { Todo } from '@/types';
import TodoCard from '@/components/TodoCard';

const Todos: React.FC<{
    todos: Todo[],
    isLoading?: boolean,
    toggleTodo?: (id: string, complete: boolean) => Promise<void>,
    updateTodo?: (id: string, name: string) => Promise<void>,
    deleteTodo?: (id: string) => Promise<void>
}> = ({ todos, isLoading, toggleTodo, updateTodo, deleteTodo }) => {
    return (
        <ul className={styles.todos}>
            {todos.map((todo) => {
                return <TodoCard
                    todo={todo}
                    isLoading={isLoading}
                    toggleTodo={toggleTodo}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo} />
            })}
        </ul>
    );
}

export default Todos;