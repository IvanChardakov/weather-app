import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
const api = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '11180e762873f17713a0cd96aea3d47d';

const initialState = { city: 'plovdiv', currentWeather: {}, fiveDayWeather: [], loading: false };

const CHANGE_CITY = 'CHANGE_CITY';
const GET_WEATHER_ERROR = 'GET_WEATHER_ERROR';
const START_FETCHING_WEATHER = 'START_FETCHING_WEATHER';
const END_FETCHING_CURRENT_WEATHER = 'END_FETCHING_CURRENT_WEATHER';
const END_FETCHING_FIVE_DAY_WEATHER = 'END_FETCHING_FIVE_DAY_WEATHER';

const changeCurrentCity = createAction(CHANGE_CITY);
const getWeatherError = createAction(GET_WEATHER_ERROR);
const startFetchingWeather = createAction(START_FETCHING_WEATHER);
const endFetchingCurrentWeather = createAction(END_FETCHING_CURRENT_WEATHER);
const endFetchingFiveDayWeather = createAction(END_FETCHING_FIVE_DAY_WEATHER);

export const loadCurrentWeather = (city) => {
  return async (dispatch) => {
    dispatch(startFetchingWeather());
    try {
      const response = await axios.get(`${api}weather?appid=${API_KEY}&q=${city}&units=metric`);
      dispatch(endFetchingCurrentWeather(response));
    } catch (error) {
      dispatch(getWeatherError(error?.response?.data?.message || 'Something happend'));
    }
  };
};

export const loadFiveDayWeather = (city) => {
  return async (dispatch) => {
    dispatch(startFetchingWeather());
    try {
      const response = await axios.get(`${api}forecast?appid=${API_KEY}&q=${city}&units=metric`);
      dispatch(endFetchingFiveDayWeather(response));
    } catch (error) {
      dispatch(getWeatherError(error?.response?.data?.message || 'Something happend'));
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
    [START_FETCHING_WEATHER]: (state, { payload }) => ({
      ...state,
      loading: true,
      error: null,
      ...payload,
    }),
    [END_FETCHING_CURRENT_WEATHER]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: null,
      currentWeather: payload.data,
    }),
    [END_FETCHING_FIVE_DAY_WEATHER]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: null,
      fiveDayWeather: payload.data.list,
    }),
    [GET_WEATHER_ERROR]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  },
  { ...initialState }
);
