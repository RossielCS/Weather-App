import './assets/stylesheets/style.scss';
import {
  creator, createModal, setModalDisplay, message,
} from './modules/helpers';
import { filterData, getWeather, savedTempValues } from './modules/data';
import {
  createWeatherDisplay, setTempValues, setOtherValues,
} from './modules/display';
import formSearch from './modules/form';
import { createBGContainer, setBGImage, iconList } from './modules/background';

const content = document.getElementById('content');
const main = creator(content, 'main', 'append');
formSearch(main);
createBGContainer(main);
createWeatherDisplay(main);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const manageResponse = (weatherData) => {
  if (weatherData) {
    const allData = filterData(weatherData);
    setBGImage(iconList, allData[2]);
    setTempValues(false, savedTempValues);
    setOtherValues(...allData);
  } else {
    setModalDisplay(createModal(main, '02', message));
  }
};

const success = async (pos) => manageResponse(await getWeather(pos.coords));
const error = async () => manageResponse(await getWeather('Tokyo'));

navigator.geolocation.getCurrentPosition(success, error, options);
