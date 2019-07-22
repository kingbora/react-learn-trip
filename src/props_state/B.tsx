import * as React from "react";

interface BProps {
    changeState?: (e: any) => void;
    counter: number;
}

interface BState {
    counter: number;
}

export default class B extends React.Component<BProps, BState> {
    constructor(props: BProps) {
        super(props);

        this.state = {
            counter: props.counter
        }
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    shouldComponentUpdate(nextProps: BProps, nextState: BState) {
        console.log(this.props.changeState !== nextProps.changeState);
        return nextProps.counter !== this.props.counter;
    }

    componentWillUpdate() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        console.log("BBB");
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.props.changeState}>change</button>
            </div>
        );
    }
}