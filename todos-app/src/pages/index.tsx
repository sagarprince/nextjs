import Todos from '@/components/Todos';
import { ALL_TODOS_API, fetcher, useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types';
import useSWR, { SWRConfig } from 'swr';

export async function getStaticProps() {
    const response = await fetcher(ALL_TODOS_API);
    return {
        props: {
            fallback: {
                [ALL_TODOS_API]: response
            }
        }
    };
}

const TodosList: React.FC = () => {
    // const { data, error, isLoading } = useSWR(API);
    const { data, error, isLoading } = useTodos(ALL_TODOS_API);
    const { todos } = data;

    const dummyTodos: Todo[] = Array(6).fill(1).map((_, i) => {
        return {
            id: i + 1,
            name: '',
            complete: false
        };
    })

    if (error) return <>An error has occurred.</>;
    if (isLoading) return <Todos todos={dummyTodos} isLoading={true} />;

    return <Todos todos={todos} />
}

export default function({ fallback }: any) {
    return (
        <SWRConfig value={{ fallback }}>
            <TodosList />
        </SWRConfig>
    );
}