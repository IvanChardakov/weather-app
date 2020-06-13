import React, { useEffect } from 'react';
import Search from './components/Search';
import { connect } from 'react-redux';
import { loadCurrentWeather } from './redux/reducers/weatherReducer';
import WeatherWidget from './components/WeatherWidget';
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

function App({ city, loading, loadCurrentWeather, currentWeather, error }) {
  useEffect(() => {
    loadCurrentWeather(city);
  }, [city, loadCurrentWeather]);

  return (
    <div
      className="app"
      style={{
        backgroundColor:
          WEATHER_TYPE_STYLES[currentWeather?.weather && currentWeather.weather[0]?.main]?.color ||
          WEATHER_TYPE_STYLES['Rainy'].color,
      }}
    >
      <div className="content-wrapper">
        {loading && <p>loading</p>}
        <Search city={city} />
        {city && !error && (
          <>
            {currentWeather && <WeatherWidget currentWeather={currentWeather} />}
            <button type="button" className="moreDetails">
              More details
            </button>
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {currentWeather.weather &&
        currentWeather.weather.length > 0 &&
        currentWeather.weather[0].main && (
          <div>
            <img
              src={
                WEATHER_TYPE_STYLES[currentWeather.weather[0].main]?.img ||
                WEATHER_TYPE_STYLES['Rainy'].img
              }
              alt="weather"
              style={{ height: '100%', objectFit: 'contain' }}
            />
          </div>
        )}
    </div>
  );
}

export default connect(
  (state) => ({
    city: state.city,
    currentWeather: state.currentWeather,
    loading: state.loading,
    error: state.error,
  }),
  (dispatch) => ({
    loadCurrentWeather: (city) => dispatch(loadCurrentWeather(city)),
  })
)(App);
