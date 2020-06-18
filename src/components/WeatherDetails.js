import React, { useMemo } from 'react';
import { LineChart, Line, XAxis } from 'recharts';
import { APP_STATES } from '../constants';

import Clouds from '../img/clouds.png';
import Humidity from '../img/humidity.png';
import Pressure from '../img/pressure.png';
import WindSpeed from '../img/wind-speed.png';

const CustomizedLabel = ({ x, y, value }) => {
  return (
    <text x={x} y={y} dy={-4} fill="#fff" fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = ({ x, y, payload, data }) => {
  const { icon, wind, hour } = data[payload.value];
  return (
    <g transform={`translate(${x},${y})`}>
      <image
        y={-65}
        x={-20}
        href={`http://openweathermap.org/img/wn/${icon}.png`}
        alt="Weather icon"
      />
      <text x={5} y={-25} dy={16} textAnchor="middle" fontSize={12} fill="#fff">
        {wind?.toFixed(1)} km/h
      </text>
      <text x={0} y={0} dy={16} textAnchor="middle" fontSize={14} fill="#fff">
        {payload.value === 0 ? 'Now' : hour?.substring(0, 5)}
      </text>
    </g>
  );
};

const WeatherDetails = ({ currentWeather, fiveDayWeather, setAppState }) => {
  const { wind, main, clouds } = currentWeather;

  const hourlyWeather = useMemo(() => {
    const data = fiveDayWeather.slice(0, 8).map((weather) => ({
      temp: weather?.main?.temp?.toFixed(0),
      icon: weather?.weather[0]?.icon,
      wind: weather?.wind?.speed,
      hour: weather?.dt_txt?.split(' ')[1],
    }));
    return data;
  }, [fiveDayWeather]);

  return (
    <div className="weather-details">
      <div className="weather-details-block">
        <p>Details</p>
        <div className="row">
          <div className="row-item">
            <span>{wind?.speed} km/h</span> <img src={WindSpeed} alt="weather-icon" />
          </div>
          <div className="row-item">
            <span>{main?.pressure} Pa</span> <img src={Pressure} alt="weather-icon" />
          </div>
          <div className="row-item">
            <span>{clouds?.all} %</span> <img src={Clouds} alt="weather-icon" />
          </div>
          <div className="row-item">
            <span>{main?.humidity} %</span> <img src={Humidity} alt="weather-icon" />
          </div>
        </div>
      </div>
      <div className="weather-details-block">
        <p>24-hours forecast</p>
        <div
          style={{
            overflowX: 'scroll',
          }}
        >
          <LineChart
            width={600}
            height={150}
            data={hourlyWeather}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis tick={<CustomizedAxisTick data={hourlyWeather} />} tickSize={0} stroke="#fff" />
            <Line type="monotone" dataKey="temp" stroke="#fff" label={<CustomizedLabel />} />
          </LineChart>
        </div>
      </div>
      <div className="weather-details-block">
        <button onClick={() => setAppState(APP_STATES.nextDaysWeather)}>Next days</button>
      </div>
    </div>
  );
};

export default WeatherDetails;
