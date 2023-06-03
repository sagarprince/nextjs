import styles from './Todos.module.scss';
import { Todo } from '@/types';
import TodoCard from '@/components/TodoCard';

const Todos: React.FC<{ 
        todos: Todo[], 
        toggleTodo?: (id: string, complete: boolean) => void,
        updateTodo?: (id: string, name: string) => void,
        deleteTodo?: (id: string) => void
    }> = ({ todos, toggleTodo, updateTodo, deleteTodo }) => {
    return (
        <ul className={styles.todos}>
            {todos.map((todo) => {
                return <TodoCard 
                    todo={todo} 
                    toggleTodo={toggleTodo} 
                    updateTodo={updateTodo} 
                    deleteTodo={deleteTodo} />
            })}
        </ul>
    );
}

export default Todos;