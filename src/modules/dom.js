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

  

  return weather;
}

function createWeatherDisplay(content, weatherData, tempData, descrData) {
  const main = creator(content, 'main', 'append');
  formSearch(main);
  table(main, weatherData, tempData, descrData);
}

export default createWeatherDisplay;