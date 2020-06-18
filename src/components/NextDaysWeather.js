import React, { useMemo } from 'react';
import moment from 'moment';

const NextDaysWeather = ({ fiveDayWeather }) => {
  const weeklyWeather = useMemo(() => {
    const data = fiveDayWeather
      .filter((weather) => weather.dt_txt.includes('12:00:00'))
      .map((weather) => ({
        date: weather?.dt_txt?.split(' ')[0],
        temp: weather?.main?.temp?.toFixed(0),
        type: weather?.weather[0]?.main,
      }));
    return data;
  }, [fiveDayWeather]);

  return (
    <div className="weekly-weather">
      {weeklyWeather.map((weather) => (
        <div className="row">
          <span>{moment(weather.date, 'YYYY-MM-DD', true).format('MMM Do')}</span>{' '}
          <span>{weather.temp}&#8451;</span> <span>{weather.type}</span>
        </div>
      ))}
    </div>
  );
};

export default NextDaysWeather;
