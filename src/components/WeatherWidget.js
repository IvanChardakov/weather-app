import React from 'react';

const WeatherWidget = ({ currentWeather, compactView }) => {
  return (
    <div>
      <div className="weather-information">
        <span className="weather-temp" style={compactView ? { fontSize: '72px' } : null}>
          {currentWeather?.main?.temp.toFixed(0)}
        </span>
        <div className="weather-icon-wrapper">
          <span className="celsius" style={compactView ? { fontSize: '28px' } : null}>
            &#8451;
          </span>
          {currentWeather.weather && currentWeather.weather.length > 0 && (
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
              alt="weather-icon"
            />
          )}
        </div>
      </div>
      <div className="weather-type">
        {currentWeather.weather &&
          currentWeather.weather.length > 0 &&
          currentWeather.weather[0].main}
      </div>
    </div>
  );
};

export default WeatherWidget;
