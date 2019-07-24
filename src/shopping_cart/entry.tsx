import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store, createStore } from "redux";
import { Provider } from "react-redux";
import "./app.scss";

import Shopping from "./containers/Shopping";
import rootReducer from "./reducers";

const initialState = {};

const store: Store<any> = createStore(
    rootReducer,
    initialState
);

ReactDOM.render(
    <Provider store={store}>
        <Shopping />
    </Provider>,
    document.getElementById("root")
);