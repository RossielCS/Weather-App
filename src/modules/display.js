import { creator } from './helpers';
import { changeToF } from './data';

const symbols = {
  false: '°C',
  true: '°F',
};

const setTempValues = (toggle, savedTempValues) => {
  const valuesF = changeToF(savedTempValues);
  let [temp, feelsLike, tempMin, tempMax] = '';
  if (toggle) {
    [temp, feelsLike, tempMin, tempMax] = [...valuesF];
  } else {
    [temp, feelsLike, tempMin, tempMax] = [...Object.values(savedTempValues)];
  }
  document.getElementById('weather-temp-main').innerHTML = `${temp} ${symbols[toggle]}`;

  const tempMinMax = document.getElementById('weather-minmax').children;
  tempMinMax[0].innerHTML = `${tempMin}`;
  tempMinMax[1].innerHTML = `${tempMax}`;

  document.getElementById('weather-feels-like').innerHTML = `Real Feel ${feelsLike}`;
};

const setOtherValues = (...params) => {
  const [cityName, description, icon, windSpeed, humidity] = [...params];

  document.getElementById('city-name').innerHTML = `${cityName}`;
  document.getElementById('weather-icon-descr').setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
  document.getElementById('weather-text-descr').innerHTML = `${description}`
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
  document.getElementById('weather-text-wind').innerHTML = `${windSpeed} m/s`;
  document.getElementById('weather-text-hum').innerHTML = `${humidity} %`;
};

const addTemperature = (parent) => {
  const container = creator(parent, 'section', 'append');
  container.setAttribute('id', 'weather-temperature');

  const temp = creator(container, 'div', 'append');
  const tempMain = creator(temp, 'h2', 'append');
  tempMain.setAttribute('id', 'weather-temp-main');

  const minMax = creator(temp, 'div', 'append');
  minMax.setAttribute('id', 'weather-minmax');
  creator(minMax, 'p', 'append');
  creator(minMax, 'p', 'append');

  const feelsLike = creator(container, 'p', 'append');
  feelsLike.setAttribute('id', 'weather-feels-like');

  return container;
};

const addDescription = (parent) => {
  const description = creator(parent, 'div', 'append');
  const iconDescr = creator(description, 'img', 'append');
  iconDescr.setAttribute('id', 'weather-icon-descr');

  const textDescr = creator(description, 'h3', 'append');
  textDescr.setAttribute('id', 'weather-text-descr');
};

const addWindAndHumidity = (parent) => {
  const wind = creator(parent, 'div', 'append');
  const iconWind = creator(wind, 'img', 'append');
  iconWind.setAttribute('id', 'weather-icon-wind');

  const textWind = creator(wind, 'p', 'append');
  textWind.setAttribute('id', 'weather-text-wind');

  const humidity = creator(parent, 'div', 'append');
  const iconHum = creator(humidity, 'img', 'append');
  iconHum.setAttribute('id', 'weather-icon-hum');

  const textHum = creator(humidity, 'p', 'append');
  textHum.setAttribute('id', 'weather-text-hum');
};

const createWeatherDisplay = (main) => {
  const weather = creator(main, 'article', 'append');
  weather.setAttribute('id', 'weather-container');

  const cityName = creator(weather, 'h1', 'append');
  cityName.setAttribute('id', 'city-name');

  addTemperature(weather);

  const otherInfo = creator(weather, 'div', 'append');
  otherInfo.setAttribute('id', 'weather-other-container');
  addDescription(otherInfo);
  addWindAndHumidity(otherInfo);
  return weather;
};

export {
  createWeatherDisplay, setTempValues, setOtherValues, symbols,
};