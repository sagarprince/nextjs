import { fetchTodos, toggleTodo, deleteTodo, updateTodoName } from '@/services';
import Todos from '@/components/Todos';

export default async function Home() {
    const { todos } = await fetchTodos({});

    return (
        <Todos 
            todos={todos} 
            toggleTodo={toggleTodo} 
            updateTodo={updateTodoName}
            deleteTodo={deleteTodo} />
    );
}
