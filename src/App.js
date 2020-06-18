import React, { useState, useEffect } from 'react';
import { usePosition } from './utils/usePosition';
import Search from './components/Search';
import { connect } from 'react-redux';
import { loadCurrentWeather, loadFiveDayWeather } from './redux/reducers/weatherReducer';
import WeatherWidget from './components/WeatherWidget';
import WeatherDetails from './components/WeatherDetails';
import NextDaysWeather from './components/NextDaysWeather';
import { WEATHER_TYPE_STYLES, APP_STATES } from './constants';

function getBackgroundColor(currentWeather, showDetailedWeather) {
  if (showDetailedWeather) {
    return '#EEA594';
  }

  return (
    WEATHER_TYPE_STYLES[currentWeather?.weather && currentWeather.weather[0]?.main]?.color ||
    WEATHER_TYPE_STYLES['Rainy'].color
  );
}

function App({
  city,
  loading,
  loadCurrentWeather,
  loadFiveDayWeather,
  fiveDayWeather,
  currentWeather,
  error,
}) {
  const [appState, setAppState] = useState(APP_STATES.initial);
  const [initialLoad, setInitialLoad] = useState(true);
  const userPosition = usePosition();

  useEffect(() => {
    if (initialLoad) {
      if (!city && userPosition?.latitude && userPosition?.longitude) {
        loadCurrentWeather(city, userPosition.latitude, userPosition.longitude);
        setInitialLoad(false);
      }
    }
  }, [initialLoad, userPosition, city, loadCurrentWeather]);

  useEffect(() => {
    loadCurrentWeather(city);
  }, [city, loadCurrentWeather]);

  useEffect(() => {
    if (appState !== APP_STATES.initial) {
      loadFiveDayWeather(city);
    }
  }, [city, loadFiveDayWeather, appState]);

  return (
    <div
      className="app"
      style={{
        backgroundColor: getBackgroundColor(currentWeather, appState !== APP_STATES.initial),
      }}
    >
      <div
        onClick={() => (appState !== APP_STATES.initial ? setAppState(APP_STATES.initial) : null)}
        className="content-wrapper"
        style={appState !== APP_STATES.initial ? { paddingTop: '20px' } : null}
      >
        <Search />
        {city && !error && !loading && (
          <>
            {currentWeather && (
              <WeatherWidget
                currentWeather={currentWeather}
                compactView={appState !== APP_STATES.initial}
              />
            )}
            {appState === APP_STATES.initial && (
              <button
                type="button"
                className="more-details"
                onClick={() => setAppState(APP_STATES.detailedWeather)}
              >
                More details
              </button>
            )}
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        {appState === APP_STATES.initial &&
          currentWeather?.weather &&
          currentWeather.weather.length > 0 &&
          currentWeather.weather[0].main && (
            <img
              src={
                WEATHER_TYPE_STYLES[currentWeather.weather[0].main]?.img ||
                WEATHER_TYPE_STYLES['Rainy'].img
              }
              alt="weather"
              style={{ height: '100%', objectFit: 'contain' }}
            />
          )}
        {appState === APP_STATES.detailedWeather && (
          <>
            <WeatherDetails
              currentWeather={currentWeather}
              fiveDayWeather={fiveDayWeather}
              setAppState={setAppState}
            />
          </>
        )}
        {appState === APP_STATES.nextDaysWeather && (
          <NextDaysWeather fiveDayWeather={fiveDayWeather} />
        )}
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    city: state.city,
    currentWeather: state.currentWeather,
    fiveDayWeather: state.fiveDayWeather,
    loading: state.loading,
    error: state.error,
  }),
  (dispatch) => ({
    loadCurrentWeather: (city, lat, lon) => dispatch(loadCurrentWeather(city, lat, lon)),
    loadFiveDayWeather: (city) => dispatch(loadFiveDayWeather(city)),
  })
)(App);
