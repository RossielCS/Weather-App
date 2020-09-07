import './assets/stylesheets/style.scss';
import { filterWeather, filterMain, filterWind } from './modules/data';
import createWeatherDisplay from './modules/dom';

const weatherData = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    {
      id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n',
    },
  ],
  base: 'stations',
  main: {
    temp: 286.47,
    feels_like: 285.55,
    temp_min: 284.26,
    temp_max: 289.26,
    pressure: 1022,
    humidity: 82,
  },
  visibility: 10000,
  wind: { speed: 1.5, deg: 220 },
  clouds: { all: 98 },
  dt: 1599446702,
  sys: {
    type: 1,
    id: 1414,
    country: 'GB',
    sunrise: 1599456201,
    sunset: 1599503634,
  },
  timezone: 3600,
  id: 2643743,
  name: 'London',
  cod: 200,
};

const content = document.getElementById('content');

const descrData = filterWeather(weatherData);
const tempData = filterMain(weatherData);
filterWind(weatherData);


createWeatherDisplay(content, weatherData, tempData, descrData);