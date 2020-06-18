import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import { connect } from 'react-redux';
import { loadCurrentWeather, loadFiveDayWeather } from './redux/reducers/weatherReducer';
import WeatherWidget from './components/WeatherWidget';
import WeatherDetails from './components/WeatherDetails';

import SunnyImage from './img/sunny.png';
import RainyImage from './img/rainy.png';

const WEATHER_TYPE_STYLES = {
  Rainy: {
    img: RainyImage,
    color: '#61A9A6',
  },
  Sunny: {
    img: SunnyImage,
    color: '#EEB625',
  },
  Cloudy: {
    img: SunnyImage,
    color: '#EEB625',
  },
};

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
  const [showDetailedWeather, setShowDetailedWeather] = useState(false);

  useEffect(() => {
    loadCurrentWeather(city);
  }, [city, loadCurrentWeather]);

  useEffect(() => {
    if (showDetailedWeather) {
      loadFiveDayWeather(city);
    }
  }, [city, showDetailedWeather, loadFiveDayWeather]);

  return (
    <div
      className="app"
      style={{
        backgroundColor: getBackgroundColor(currentWeather, showDetailedWeather),
      }}
    >
      <div
        onClick={() => (showDetailedWeather ? setShowDetailedWeather(false) : null)}
        className="content-wrapper"
        style={showDetailedWeather ? { paddingTop: '20px' } : null}
      >
        <Search city={city} />
        {city && !error && !loading && (
          <>
            {currentWeather && (
              <WeatherWidget currentWeather={currentWeather} compactView={showDetailedWeather} />
            )}
            {!showDetailedWeather && (
              <button
                type="button"
                className="more-details"
                onClick={() => setShowDetailedWeather(!showDetailedWeather)}
              >
                More details
              </button>
            )}
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        {!showDetailedWeather &&
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
        {showDetailedWeather && (
          <WeatherDetails currentWeather={currentWeather} fiveDayWeather={fiveDayWeather} />
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
    loadCurrentWeather: (city) => dispatch(loadCurrentWeather(city)),
    loadFiveDayWeather: (city) => dispatch(loadFiveDayWeather(city)),
  })
)(App);
