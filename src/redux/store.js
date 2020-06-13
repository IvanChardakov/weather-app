import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { weatherReducer } from './reducers/weatherReducer';

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action);
    const returnValue = next(action);

    console.log('state after dispatch', getState());
    return returnValue;
  };
}

const middlewares = [thunkMiddleware, promiseMiddleware, logger];

export const store = createStore(weatherReducer, applyMiddleware(...middlewares));
