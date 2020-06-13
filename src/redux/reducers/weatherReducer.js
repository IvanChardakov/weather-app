import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
const api = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '11180e762873f17713a0cd96aea3d47d';

const initialState = { city: 'plovdiv', currentWeather: {}, loading: false };

const CHANGE_CITY = 'CHANGE_CITY';
const START_GET_CURRENT_WEATHER = 'START_GET_CURRENT_WEATHER';
const END_GET_CURRENT_WEATHER = 'END_GET_CURRENT_WEATHER';
const ERROR_GET_CURRENT_WEATHER = 'ERROR_GET_CURRENT_WEATHER';

const changeCurrentCity = createAction(CHANGE_CITY);
const startGetCurrentWeather = createAction(START_GET_CURRENT_WEATHER);
const endGetCurrentWeather = createAction(END_GET_CURRENT_WEATHER);
const errorGetCurrentWeather = createAction(ERROR_GET_CURRENT_WEATHER);

export const loadCurrentWeather = (city) => {
  return async (dispatch) => {
    dispatch(startGetCurrentWeather());
    try {
      const response = await axios.get(`${api}weather?appid=${API_KEY}&q=${city}&units=metric`);
      dispatch(endGetCurrentWeather(response));
    } catch (error) {
      dispatch(errorGetCurrentWeather(error?.response?.data?.message || 'Something happend'));
    }
  };
};

export const changeCity = (city) => {
  return (dispatch) => {
    dispatch(changeCurrentCity(city));
  };
};

export const weatherReducer = handleActions(
  {
    [CHANGE_CITY]: (state, { payload }) => ({
      ...state,
      loading: false,
      city: payload,
    }),
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
