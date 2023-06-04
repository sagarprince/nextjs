"use client"

import Todos from '@/components/Todos';
import { Todo } from '@/types';

export default function Loading() {
    const todos: Todo[] = [
        {
            id: new Date().getTime(),
            name: '',
            complete: false
        },
        {
            id: new Date().getTime(),
            name: '',
            complete: false
        },
        {
            id: new Date().getTime(),
            name: '',
            complete: false
        },
        {
            id: new Date().getTime(),
            name: '',
            complete: false
        },
        {
            id: new Date().getTime(),
            name: '',
            complete: false
        },
        {
            id: new Date().getTime(),
            name: '',
            complete: false
        },
        {
            id: new Date().getTime(),
            name: '',
            complete: false
        }
    ]

    return (
        <Todos todos={todos} isLoading={true} />
    );
}