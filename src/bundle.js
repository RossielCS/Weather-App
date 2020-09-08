import './assets/stylesheets/style.scss';
import { creator } from './modules/helpers';
import { filterWeather, filterMain, getWeather } from './modules/data';
import createWeatherDisplay from './modules/display';
import { formSearch, units } from './modules/form';

const content = document.getElementById('content');
const main = creator(content, 'main', 'append');
formSearch(main, units);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

async function success(pos) {
  const crd = pos.coords;
  const weatherData = await getWeather(crd);
  const tempData = filterMain(weatherData);
  const descrData = filterWeather(weatherData);

  createWeatherDisplay(main, weatherData, tempData, descrData);
}

async function error(err) {
  const weatherData = await getWeather('London');
  const tempData = filterMain(weatherData);
  const descrData = filterWeather(weatherData);
  createWeatherDisplay(main, weatherData, tempData, descrData);
  return err;
}


navigator.geolocation.getCurrentPosition(success, error, options);
