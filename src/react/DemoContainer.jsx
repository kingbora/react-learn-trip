import React from "react";
import Counter from "./components/Counter";
import Clock from "./components/Clock";
import ChangeableComponent from "./components/ChangebleComponent";
import InputControl from "./components/InputControl";
import RealDom from "./components/RealDom";

export default class DemoContainer extends React.Component {
    // demo container
    components = [
        <Counter />,
        <Clock />,
        <ChangeableComponent />,
        <InputControl color="red" />,
        <RealDom />
    ];
    render() {
        return (
            <div>
                {
                    this.components.map((item, index) => (
                        <div key={index}>
                            <h3>Demo {index + 1}</h3>
                            {item}
                        </div>
                    ))
                }
            </div>
        );
    }
}