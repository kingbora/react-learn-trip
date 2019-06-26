import { combineReducers } from "redux";
import { todosReducer } from "./container/reducers";
import { RootState } from "./model";
import { TODOS_REDUCER } from "./constants";

const allReducer: RootState = {
    [TODOS_REDUCER]: todosReducer
};

const rootReducer = combineReducers(allReducer);

export default rootReducer;