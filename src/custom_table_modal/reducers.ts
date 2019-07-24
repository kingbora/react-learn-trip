import { combineReducers } from "redux";
import { customModalReducer } from "./containers/custom_modal/reducer";

const allReducer: any = {
    customModalReducer: customModalReducer
};

const rootReducer = combineReducers(allReducer);

export default rootReducer;