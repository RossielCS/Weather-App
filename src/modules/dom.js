function creator(parent, newElement, position) {
  const child = document.createElement(`${newElement}`);
  if (position === 'append') {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, position);
  }
  return child;
}

function formSearch(parent) {
  const form = creator(parent, 'form', 'append');

  const input = creator(form, 'input', 'append');
  input.setAttribute('name', 'search');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Write the city name here');

  const button = creator(form, 'button', 'append');
  button.setAttribute('type', 'submit');

  const icon = creator(button, 'span', 'append');
  icon.setAttribute('class', 'material-icons');
  icon.innerHTML = 'search';

  return form;
}

function temperature(parent, tempData) {
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

function table(parent, weatherData, tempData, descrData) {
  const weather = creator(parent, 'article', 'append');
  weather.setAttribute('id', 'weather-container');

  const cityName = creator(weather, 'h1', 'append');
  cityName.setAttribute('id', 'city-name');
  cityName.innerHTML = `${weatherData.name}`;

  temperature(weather, tempData);

  const description = creator(weather, 'div', 'append');
  description.innerHTML = `${descrData[0]}`;
  const iconDescr = creator(description, 'img', 'append');
  iconDescr.setAttribute('id', 'weather-icon-descr');
  iconDescr.style.backgroundImage = `url("http://openweathermap.org/img/wn/${descrData[1]}.png")`;
  const textDescr = creator(description, 'h3', 'append');
  textDescr.setAttribute('id', 'weather-text-descr');

  const otherData = creator(weather, 'div', 'append');

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

  return weather;
}

function createWeatherDisplay(content, weatherData, tempData, descrData) {
  const main = creator(content, 'main', 'append');
  formSearch(main);
  table(main, weatherData, tempData, descrData);
}

export default createWeatherDisplay;