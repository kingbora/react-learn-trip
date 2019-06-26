import { createSelector } from "reselect";
// import { TODOS_REDUCER } from "../constants";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "./constants";
import { Todo, TodosFilter } from "../model";

// const getTodosFilter = (state) => state[TODOS_REDUCER].todos;
// const getTodosTypeFilter = (state) => state[TODOS_REDUCER].filterType;
const getTodosFilter = (params: TodosFilter) => params.todos;
const getTodosTypeFilter = (params: TodosFilter) => params.filterType;

export const todosFilter = createSelector(
    [getTodosTypeFilter, getTodosFilter],
    (filterType: string, todos: Todo[]) => {
        switch (filterType) {
            case SHOW_ALL:
                return todos;
            case SHOW_COMPLETED:
                return todos.filter(t => t.completed);
            case SHOW_ACTIVE:
                return todos.filter(t => !t.completed)
        }
    }
);