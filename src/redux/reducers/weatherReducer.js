import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
const api = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '11180e762873f17713a0cd96aea3d47d';

const initialState = { city: 'plovdiv', currentWeather: {}, loading: false };

const START_GET_CURRENT_WEATHER = 'START_GET_CURRENT_WEATHER';
const END_GET_CURRENT_WEATHER = 'END_GET_CURRENT_WEATHER';
const ERROR_GET_CURRENT_WEATHER = 'ERROR_GET_CURRENT_WEATHER';

const startGetCurrentWeather = createAction(START_GET_CURRENT_WEATHER);
const endGetCurrentWeather = createAction(END_GET_CURRENT_WEATHER);
const errorGetCurrentWeather = createAction(ERROR_GET_CURRENT_WEATHER);

export const loadCurrentWeather = () => {
  return async (dispatch) => {
    dispatch(startGetCurrentWeather());
    try {
      const response = await axios.get(`${api}weather?appid=${API_KEY}&q=plovdiv&units=metric`);
      dispatch(endGetCurrentWeather(response));
    } catch (error) {
      dispatch(errorGetCurrentWeather(error));
    }
  };
};

export const weatherReducer = handleActions(
  {
    [START_GET_CURRENT_WEATHER]: (state, { payload }) => ({
      ...state,
      loading: true,
      error: null,
      ...payload,
    }),
    [END_GET_CURRENT_WEATHER]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: null,
      currentWeather: payload.data,
    }),
    [ERROR_GET_CURRENT_WEATHER]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  },
  { ...initialState }
);
