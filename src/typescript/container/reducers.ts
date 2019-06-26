import { handleActions, Action } from 'redux-actions';

import { Todo, IState } from '../model';
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from './constants';

const initialState: IState = {
  todos: [
    {
      text: 'Use Redux with TypeScript',
      completed: false,
      id: 0
    }
  ]
};

export const todosReducer = handleActions<IState, Todo>({
  [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
    return Object.assign({}, state, {
      todos: [{
        id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: action.payload.completed,
        text: action.payload.text
      }, ...state.todos]
    });
  },

  [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return Object.assign({}, state, {
      todos: state.todos.filter(todo =>
        todo.id !== action.payload.id
      )
    });
  },

  [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
    return Object.assign({}, state, {
      todos: state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      )
    });
  },

  [COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
    return Object.assign({}, state, {
      todos: state.todos.map(todo =>
        todo.id === action.payload.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )
    });
  },

  [COMPLETE_ALL]: (state: IState, action: Action<Todo>): IState => {
    const areAllMarked = state.todos.every(todo => todo.completed);
    return Object.assign({}, state, {
      todos: state.todos.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    });
  },

  [CLEAR_COMPLETED]: (state: IState, action: Action<Todo>): IState => {
    return Object.assign({}, state, {
      todos: state.todos.filter(todo => todo.completed === false)
    });
  }
}, initialState);