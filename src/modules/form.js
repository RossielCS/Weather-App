import { creator, createModal } from './helpers';
import { createWeatherDisplay, symbols } from './display';
import {
  getInputsValues, modifyInput, getWeather,
  filterDescr, filterTemp,
} from './data';

const radioButtons = [
  ['standar', '01'], ['metric', '02'], ['imperial', '03'],
];

const units = {
  '01': '',
  '02': '&units=metric',
  '03': '&units=imperial',
};

function createRadioBtn(radioContainer, radioButtons, i) {
  const radioBox = creator(radioContainer, 'div', 'append');

  const radio = creator(radioBox, 'input', 'append');
  radio.setAttribute('type', 'radio');
  radio.setAttribute('value', `${radioButtons[i][1]}`);
  radio.setAttribute('id', `${radioButtons[i][0]}`);
  radio.setAttribute('class', 'weather-input radio-input');
  radio.setAttribute('name', 'units');
  const label = creator(radioBox, 'label', 'append');
  label.setAttribute('for', `${radioButtons[i][0]}`);
  label.innerHTML = `${radioButtons[i][0]}`;
  if (i === 0) radio.checked = true;
}

function addCBToSearchBtn(button, main, units) {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputs = document.getElementsByClassName('weather-input');
    const values = getInputsValues(inputs);
    const weatherCont = document.getElementById('weather-container');
    if (weatherCont) weatherCont.remove();
    if (values) {
      const cityName = modifyInput(values[0], units[values[1]]);
      const data = await getWeather(cityName);
      if (data) {
        const descrData = filterDescr(data);
        const tempData = filterTemp(data);

        // eslint-disable-next-line no-use-before-define
        createWeatherDisplay(main, data, tempData, descrData, symbols);
      } else {
        createModal(main);
      }
    }
  });
}

function formSearch(parent, units) {
  const form = creator(parent, 'form', 'append');

  const input = creator(form, 'input', 'append');
  input.setAttribute('name', 'search');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Write the city name here');
  input.setAttribute('class', 'weather-input');
  input.required = true;

  const button = creator(form, 'button', 'append');
  button.setAttribute('type', 'submit');
  button.setAttribute('id', 'search-btn');
  addCBToSearchBtn(button, parent, units);

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

export { formSearch, units };