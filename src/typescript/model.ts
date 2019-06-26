import { ReduxCompatibleReducer } from "redux-actions";
import { TODOS_REDUCER } from "./constants";
export type Todo = {
    id?: number;
    text: string;
    completed: boolean;
};

export type IState = {
    todos: Todo[]
};

export type RootState = {
    [TODOS_REDUCER]: any
};

export type TodosFilter = {
    todos: Todo[],
    filterType: string
};