import React, { Component } from "react";
import { increaseAction } from "./action";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CounterDemo extends Component {
    render() {
        const { value, onIncreaseClick } = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        );
    }
}

CounterDemo.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        value: state.count
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    };
}

const Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterDemo);

export default Counter;