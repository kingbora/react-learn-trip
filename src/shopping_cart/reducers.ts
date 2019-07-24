import { combineReducers } from "redux";
import { shoppingReducer } from "./containers/Shopping/reducers";

const allReducer: any = {
    shoppingReducer: shoppingReducer
};

const rootReducer = combineReducers(allReducer);

export default rootReducer;