import * as React from "react";
import B from "./B";
import { Input } from "antd";

interface AProps {}

interface AState {
    counter: number;
    inputType: string;
}

export default class A extends React.Component<AProps, AState> {
    constructor(props: AProps) {
        super(props);

        this.state = {
            counter: 8,
            inputType: "text"
        };
    }

    changeState = () => {
        // this.setState({
        //     counter: this.state.counter + 1
        // });
    };

    changeData = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    passwordFocus = (e: any) => {
        this.setState({
            inputType: "password"
        })
    };

    render() {
        console.log("AAA");
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <B counter={this.state.counter}/>
                <Input type={this.state.inputType} onFocus={this.passwordFocus} />
                <button onClick={this.changeData}>click</button>
            </div>
        )
    }
}