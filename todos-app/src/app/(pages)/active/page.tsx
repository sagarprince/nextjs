import { fetchTodos } from '@/services';
import { toggleTodo, deleteTodo, updateTodoName } from '@/actions';
import Todos from '@/components/Todos';

export default async function ActiveTodos() {
    const { todos } = await fetchTodos({
        status: 'active'
    });
   
    return (
        <Todos 
        todos={todos} 
        toggleTodo={toggleTodo} 
        updateTodo={updateTodoName}
        deleteTodo={deleteTodo} />
    );
}
