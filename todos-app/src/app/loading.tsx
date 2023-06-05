"use client"

import Todos from '@/components/Todos';
import { Todo } from '@/types';

export default function Loading() {
    const todos: Todo[] = Array(6).fill(1).map((_, i) => {
        return  {
            id: new Date().getTime() + i,
            name: '',
            complete: false
        };
    })

    return (
        <Todos todos={todos} isFetching={true} />
    );
}