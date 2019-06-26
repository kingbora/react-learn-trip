import React from "react";

export default class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timeId = setInterval(
            this.tick,
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    tick = () => {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const { date } = this.state;
        return (
            <span>现在是 {date.toLocaleTimeString()}</span>
        )
    }
}