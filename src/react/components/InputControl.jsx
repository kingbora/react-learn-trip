import React from "react";

export default class InputControl extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            color: props.color
        };
    }

    handleColorChange = (e) => {
        this.setState({
            color: e.target.value
        });
    };

    render() {
        const { color } = this.state;
        const style = {
            color
        };
        return (
            <div>
                <input value={color} onChange={this.handleColorChange} />
                <p>Dynamically changing color values! now the value is <span style={style}>{color}</span></p>
            </div>
        )
    }
}