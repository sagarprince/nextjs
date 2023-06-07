"use client"

import { showSuccessToast } from '@/utils/helpers';
import { ReactNode, createContext, useEffect, useMemo, useReducer } from 'react';

export const SET_TOAST_MESSAGE = 'SET_TOAST_MESSAGE';
export const UPDATE_TOAST_PENDING_STATUS = 'UPDATE_TOAST_PENDING_STATUS';
export const REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE';

export interface AppContextType {
    toastMessages: Array<{
        id: any;
        message: string,
        isPending: boolean
    }>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const AppDispatchContext = createContext<any>(null);

const reducer = (state: AppContextType, action: any) => {
    switch (action.type) {
        case SET_TOAST_MESSAGE:
            return {
                ...state,
                toastMessages: [...state.toastMessages, action.toastMessage],
            };
        case UPDATE_TOAST_PENDING_STATUS:
            return {
                ...state,
                toastMessages: [...state.toastMessages].map((tm) => {
                    if (action.id === tm.id) {
                        tm.isPending = action.isPending;
                    }
                    return tm;
                }),
            };
        case REMOVE_TOAST_MESSAGE:
            return {
                ...state,
                toastMessages: [...state.toastMessages].filter((tm) => tm.id !== action.id),
            };
        default:
            return state;
    }
};

const initialState: AppContextType = {
    toastMessages: [],
};


export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { toastMessages } = state;

    useEffect(() => {
        console.log(toastMessages);
        toastMessages.forEach((tm) => {
            !tm.isPending && showSuccessToast(tm.message, {
                onDismiss: () => {
                    console.log('closed');
                    dispatch({ type: REMOVE_TOAST_MESSAGE, id: tm.id });
                },
                onAutoClose: () => {
                    console.log('closed');
                    dispatch({ type: REMOVE_TOAST_MESSAGE, id: tm.id });
                }
            });
        })
    }, [toastMessages]);

    const value = useMemo(
        () => ({
            ...state
        }),
        []
    );

    return (
        <AppContext.Provider value={value as unknown as AppContextType}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppContext.Provider>
    );
}