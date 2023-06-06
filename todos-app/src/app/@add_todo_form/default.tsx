import AddTodoForm from '@/components/AddTodoForm';
import { addTodo } from '@/actions';

export default function AddTodo() {
    return (
        <AddTodoForm addTodo={addTodo} />
    );
}