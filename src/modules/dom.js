import {
  getInputsValues, modifyInput, getWeather,
  filterWeather, filterMain,
} from './data';

const radioButtons = [
  ['standar', '01'], ['metric', '02'], ['imperial', '03'],
];

const units = {
  '01': '',
  '02': '&units=metric',
  '03': '&units=imperial',
};

function creator(parent, newElement, position) {
  const child = document.createElement(`${newElement}`);
  if (position === 'append') {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, position);
  }
  return child;
}

function createRadioBtn(radioContainer, radioButtons, i) {
  const radioBox = creator(radioContainer, 'div', 'append');

  const radio = creator(radioBox, 'input', 'append');
  radio.setAttribute('type', 'radio');
  radio.setAttribute('value', `${radioButtons[i][1]}`);
  radio.setAttribute('class', 'weather-input');
  const label = creator(radioBox, 'label', 'append');
  label.setAttribute('for', `${radioButtons[i][0]}`);
  label.innerHTML = `${radioButtons[i][0]}`;
  if (i === 0) radio.checked = true;
}

function addCBToSearchBtn(button, content) {
  button.addEventListener('click', () => {
    const inputs = document.getElementsByClassName('weather-input');
    const values = getInputsValues(inputs);
    const cityName = modifyInput(values[0], values[1]);
    const data = getWeather(cityName);

    const descrData = filterWeather(data);
    const tempData = filterMain(data);

    // eslint-disable-next-line no-use-before-define
    createWeatherDisplay(content, data, tempData, descrData);
  });
}

function formSearch(parent) {
  const form = creator(parent, 'form', 'append');

  const input = creator(form, 'input', 'append');
  input.setAttribute('name', 'search');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Write the city name here');
  input.setAttribute('class', 'weather-input');

  const button = creator(form, 'button', 'append');
  button.setAttribute('type', 'submit');
  button.setAttribute('id', 'search-btn');
  addCBToSearchBtn(button);

  const icon = creator(button, 'span', 'append');
  icon.setAttribute('class', 'material-icons');
  icon.innerHTML = 'search';

  const priorityTitle = creator(form, 'p', 'append');
  priorityTitle.innerHTML = 'Priority:';
  const radioContainer = creator(form, 'div', 'append');
  radioContainer.setAttribute('class', 'radio-container');

  for (let i = 0; i < radioButtons.length; i += 1) {
    createRadioBtn(radioContainer, radioButtons, i);
  }

  return form;
}

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

function table(parent, weatherData, tempData, descrData) {
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

function createWeatherDisplay(content, weatherData, tempData, descrData) {
  const main = creator(content, 'main', 'append');
  formSearch(main);
  table(main, weatherData, tempData, descrData);
}

export default createWeatherDisplay;