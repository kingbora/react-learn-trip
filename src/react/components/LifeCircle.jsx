import React from "react";

export default class LifeCircle extends React.Component {
    static defaultProps = { // getDefaultProps

    };

    constructor(props) {
        super(props);
        this.state = { // getInitialState

        };
    }

    componentWillMount() {

    }

    // DOM真正挂载
    componentDidMount() {

    }

    // 组件挂载之后，每次调用setState后都会调用shouldComponentUpdate判断是否需要重新渲染组件。
    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    render() {
        return <p></p>;
    }
}