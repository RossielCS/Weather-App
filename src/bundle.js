import './assets/stylesheets/style.scss';
import { filterWeather, filterMain } from './modules/data';
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

createWeatherDisplay(content, weatherData, tempData, descrData);

function getWeather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=7a075fa45323323813d5c357e54b030e`,
    { mode: 'cors' },
  )
    .then((response) => {
      if (!response.ok) throw Error('City not Found.');
      return response.json();
    })
    .catch(() => 'Error');
}

getWeather('Buenos  Aires');

/*
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  return [crd.latitude, crd.longitude];
}

function error(err) {
  return `${err.message}`;
}

navigator.geolocation.getCurrentPosition(success, error, options);

function getLocalWeather(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=7a075fa45323323813d5c357e54b030e`,
    { mode: 'cors' },
  )
    .then((response) => {
      if (!response.ok) throw Error('City not Found.');
      return response.json();
    })
    .catch(() => 'Error');
}

async function getLocation(success, error, options) {
  const location = await navigator.geolocation.getCurrentPosition(success, error, options);
  const defaultLoc = [-0.13, 51.51];
  return typeof location === 'object' ? getLocalWeather(location) : getLocalWeather(defaultLoc);
}

async function displayLocation(locationData) {
  const weatherData = await locationData;
  const data = weatherData;
  console.log(data);
  /* const descrData = filterWeather(weatherData);
  const tempData = filterMain(weatherData);
  createWeatherDisplay(content, weatherData, tempData, descrData);
}

displayLocation(getLocation(success, error, options));
*/