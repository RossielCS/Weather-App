import './assets/stylesheets/style.scss';
import { creator } from './modules/helpers';
import { filterData, getWeather } from './modules/data';
import { createWeatherDisplay, setValues, symbols } from './modules/display';
import { formSearch, units } from './modules/form';

const content = document.getElementById('content');
const main = creator(content, 'main', 'append');
formSearch(main, units);
createWeatherDisplay(main);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

async function success(pos) {
  const crd = pos.coords;
  const weatherData = await getWeather(crd);
  const allData = filterData(weatherData);
  setValues(symbols, ...allData);
}

async function error(err) {
  const weatherData = await getWeather('London');
  const allData = filterData(weatherData);
  setValues(symbols, ...allData);
  return err;
}


navigator.geolocation.getCurrentPosition(success, error, options);
