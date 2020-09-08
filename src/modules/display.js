import { creator } from './helpers';

function addTemperature(parent, tempData) {
  const container = creator(parent, 'section', 'append');
  container.setAttribute('id', 'weather-temperature');

  const temp = creator(container, 'div', 'append');
  const tempMain = creator(temp, 'h2', 'append');
  tempMain.innerHTML = `${tempData[0]}`;

  const minMax = creator(temp, 'div', 'append');
  const tempMin = creator(minMax, 'p', 'append');
  tempMin.innerHTML = `${tempData[1]}`;
  const tempMax = creator(minMax, 'p', 'append');
  tempMax.innerHTML = `${tempData[2]}`;

  const feelsLike = creator(container, 'p', 'append');
  feelsLike.innerHTML = `RealFeel ${tempData[3]}`;

  return container;
}

function addDescription(parent, descrData) {
  const description = creator(parent, 'div', 'append');
  const iconDescr = creator(description, 'img', 'append');
  iconDescr.setAttribute('id', 'weather-icon-descr');
  iconDescr.style.backgroundImage = `url("http://openweathermap.org/img/wn/${descrData[1]}.png")`;
  const textDescr = creator(description, 'h3', 'append');
  textDescr.setAttribute('id', 'weather-text-descr');
  textDescr.innerHTML = `${descrData[0]}`
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
}

function addWindAndHumidity(parent, weatherData, tempData) {
  const otherData = creator(parent, 'div', 'append');

  const wind = creator(otherData, 'div', 'append');
  const iconWind = creator(wind, 'i', 'append');
  iconWind.setAttribute('id', 'weather-icon-wind');
  const textWind = creator(wind, 'p', 'append');
  textWind.setAttribute('id', 'weather-text-wind');
  textWind.innerHTML = `${weatherData.wind.speed} m/s`;

  const humidity = creator(otherData, 'div', 'append');
  const iconHum = creator(humidity, 'i', 'append');
  iconHum.setAttribute('id', 'weather-icon-hum');
  const textHum = creator(humidity, 'p', 'append');
  textHum.setAttribute('id', 'weather-text-hum');
  textHum.innerHTML = `${tempData[4]} %`;
}

function createWeatherDisplay(parent, weatherData, tempData, descrData) {
  const weather = creator(parent, 'article', 'append');
  weather.setAttribute('id', 'weather-container');

  const cityName = creator(weather, 'h1', 'append');
  cityName.setAttribute('id', 'city-name');
  cityName.innerHTML = `${weatherData.name}`;

  addTemperature(weather, tempData);
  addDescription(weather, descrData);
  addWindAndHumidity(weather, weatherData, tempData);

  return weather;
}

export default createWeatherDisplay;