export type Todo = {
    id: any;
    name: string;
    complete: boolean;
}

export type Filter = {
    key: number;
    path: string;
    label: string;
    count?: number;
}