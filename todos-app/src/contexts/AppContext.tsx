"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from 'react';
import { Todo } from '@/types';

export interface AppContextType {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);

    const value = useMemo(
        () => ({
            todos,
            setTodos,
        }),
        [todos, setTodos]
      );

    return (
        <AppContext.Provider value={value as unknown as AppContextType}>
            {children}
        </AppContext.Provider>
    );
}