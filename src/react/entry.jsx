import React from "react";
import ReactDOM from "react-dom";
import DemoContainer from "./DemoContainer";


const rootElm = document.getElementById("root");

const render = () => ReactDOM.render(
    <DemoContainer />,
    rootElm
);

render();