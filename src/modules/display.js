import { creator } from './helpers';

const symbols = {
  '01': 'K',
  '02': '°C',
  '03': '°F',
};

function setValues(symbols, ...params) {
  const [cityName, temp, feelsLike, tempMin, tempMax,
    description, icon, windSpeed, humidity] = [...params];

  document.getElementById('city-name').innerHTML = `${cityName}`;
  const tempMain = document.getElementById('weather-temp-main');
  const radioInputs = document.getElementsByClassName('radio-input');
  [...radioInputs].forEach(x => {
    if (x.checked) {
      tempMain.innerHTML = `${temp} ${symbols[x.value]}`;
    }
  });

  const tempMinMax = document.getElementById('weather-minmax').children;
  tempMinMax[0].innerHTML = `${tempMin}`;
  tempMinMax[1].innerHTML = `${tempMax}`;

  document.getElementById('weather-feels-like').innerHTML = `RealFeel ${feelsLike}`;
  document.getElementById('weather-icon-descr').setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
  document.getElementById('weather-text-descr').innerHTML = `${description}`
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
  document.getElementById('weather-text-wind').innerHTML = `${windSpeed} m/s`;
  document.getElementById('weather-text-hum').innerHTML = `${humidity} %`;
}

function addTemperature(parent) {
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
}

function addDescription(parent) {
  const description = creator(parent, 'div', 'append');
  const iconDescr = creator(description, 'img', 'append');
  iconDescr.setAttribute('id', 'weather-icon-descr');

  const textDescr = creator(description, 'h3', 'append');
  textDescr.setAttribute('id', 'weather-text-descr');
}

function addWindAndHumidity(parent) {
  const otherData = creator(parent, 'div', 'append');

  const wind = creator(otherData, 'div', 'append');
  const iconWind = creator(wind, 'i', 'append');
  iconWind.setAttribute('id', 'weather-icon-wind');
  const textWind = creator(wind, 'p', 'append');
  textWind.setAttribute('id', 'weather-text-wind');

  const humidity = creator(otherData, 'div', 'append');
  const iconHum = creator(humidity, 'i', 'append');
  iconHum.setAttribute('id', 'weather-icon-hum');
  const textHum = creator(humidity, 'p', 'append');
  textHum.setAttribute('id', 'weather-text-hum');
}

function createWeatherDisplay(main) {
  const weather = creator(main, 'article', 'append');
  weather.setAttribute('id', 'weather-container');

  const cityName = creator(weather, 'h1', 'append');
  cityName.setAttribute('id', 'city-name');

  addTemperature(weather);
  addDescription(weather);
  addWindAndHumidity(weather);
  return weather;
}

export { createWeatherDisplay, setValues, symbols };