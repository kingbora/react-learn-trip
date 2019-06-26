import { createAction } from "redux-actions";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from "./constants";
import { Todo } from "../model";

export const addTodo = createAction<Todo, string>(
    ADD_TODO,
    (text: string) => ({ text, completed: false })
);
export const deleteTodo = createAction<Todo, Todo>(
    DELETE_TODO,
    (todo: Todo) => todo
);
export const editTodo = createAction<Todo, Todo, string>(
    EDIT_TODO,
    (todo: Todo, newText: string) => ({ ...todo, text: newText })
);
export const completeTodo = createAction<Todo, Todo>(
    COMPLETE_TODO,
    (todo: Todo) => todo
);
export const completeAll = createAction<void>(
    COMPLETE_ALL,
    () => { }
);
export const clearCompleted = createAction<void>(
    CLEAR_COMPLETED,
    () => { }
);