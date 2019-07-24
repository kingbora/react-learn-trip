import { connect } from "react-redux";
import * as React from "react";
import { Todo, RootState } from "../model";
import { addTodo, editTodo, deleteTodo, completeTodo, completeAll, clearCompleted } from "./actions";
import MainSection from "../component/MainSection";
import Header from "../component/Header";
import { TODOS_REDUCER } from "../constants";

interface AppStateProps {
    todos: Todo[];
}

interface AppDispatchProps {
    addTodo: (text: string) => void;
    editTodo: (todo: Todo, text: string) => void;
    deleteTodo: (todo: Todo) => void;
    completeTodo: (todo: Todo) => void;
    clearCompleted: () => void;
    completeAll: () => void;
}

interface AppState { }

class App extends React.Component<AppStateProps & AppDispatchProps, AppState> {
    render() {
        const { todos, addTodo, editTodo, deleteTodo, completeTodo, clearCompleted, completeAll } = this.props;

        return (
            <div className="todoapp">
                <Header addTodo={addTodo} />
                <MainSection
                    todos={todos}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                    clearCompleted={clearCompleted}
                    completeAll={completeAll}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    todos: state[TODOS_REDUCER].todos
});

const mapDispatchToProps = (dispatch: any) => ({
    addTodo: (text: string) => dispatch(addTodo(text)),
    editTodo: (t: Todo, s: string) => dispatch(editTodo(t, s)),
    deleteTodo: (t: Todo) => dispatch(deleteTodo(t)),
    completeTodo: (t: Todo) => dispatch(completeTodo(t)),
    clearCompleted: () => dispatch(clearCompleted()),
    completeAll: () => dispatch(completeAll())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);