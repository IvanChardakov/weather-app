import { createStore } from 'redux';
import { weatherReducer } from './reducers/weatherReducer';

export const store = createStore(weatherReducer);
