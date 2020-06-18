import SunnyImage from './img/sunny.png';
import RainyImage from './img/rainy.png';

export const WEATHER_TYPE_STYLES = {
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

export const APP_STATES = {
  initial: 'initial',
  detailedWeather: 'detailed-weather',
  nextDaysWeather: 'next-days-weather',
};
