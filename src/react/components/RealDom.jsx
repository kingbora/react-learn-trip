import React from "react";

export default class RealDom extends React.Component {
    componentDidMount() {
        this.focus();
    }

    focus = () => {
        this.textInput.focus();
    }

    render() {
        return (
            <div>
                <p>autofocus:</p>
                <input type="text" ref={(input) => this.textInput = input} />
                <button onClick={this.focus}>Focus the text input</button>
            </div>
        )
    }
}