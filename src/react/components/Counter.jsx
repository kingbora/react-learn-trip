import React from "react";

class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0
        };
    }

    onIncrement = () => {
        this.setState({
            value: this.state.value + 1
        });
    };

    onDecrement = () => {
        this.setState({
            value: this.state.value - 1
        });
    }

    incrementAsync = () => {
        setTimeout(this.onIncrement, 1000);
    }

    render() {
        const { value } = this.state;
        return (
            <p>
                Clicked: {value} times<br/>
                <button onClick={this.onIncrement}>+</button>
                <button onClick={this.onDecrement}>-</button>
                <button onClick={this.incrementAsync}>Increment async</button>
            </p>
        )
    }
}

export default Counter;