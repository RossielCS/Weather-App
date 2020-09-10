import {
  creator, createModal, setModalDisplay, message,
} from './helpers';
import { setValues, symbols } from './display';
import {
  getInputsValues, modifyInput, getWeather, filterData,
} from './data';
import { setBGImage, iconList } from './background';

/*
const radioButtons = [
  ['kelvin', '01'], ['celsius', '02'], ['fahrenheit', '03'],
];
*/

const units = {
  '01': '&units=metric',
  '03': '&units=imperial',
};
/*
const createRadioBtn = (radioContainer, radioButtons, i) => {
  const radioBox = creator(radioContainer, 'div', 'append');

  const radio = creator(radioBox, 'input', 'append');
  radio.setAttribute('type', 'radio');
  radio.setAttribute('value', `${radioButtons[i][1]}`);
  radio.setAttribute('id', `${radioButtons[i][0]}`);
  radio.setAttribute('class', 'weather-input radio-input');
  radio.setAttribute('name', 'units');
  const label = creator(radioBox, 'label', 'append');
  label.setAttribute('for', `${radioButtons[i][0]}`);
  label.innerHTML = `${radioButtons[i][0].charAt(0)
    .toUpperCase()
    .concat(radioButtons[i][0]
      .slice(1))}`;
  if (i === 1) radio.checked = true;
};
*/
const addCBToSearchBtn = (button, main, units) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputs = document.getElementsByClassName('weather-input');
    const values = getInputsValues(inputs);
    if (values) {
      const cityName = modifyInput(values[0], units[values[1]]);
      const data = await getWeather(cityName);
      if (data) {
        const allData = filterData(data);
        setBGImage(iconList, allData[6]);
        setValues(symbols, ...allData);
      } else {
        setModalDisplay(createModal(main, '02', message));
      }
    } else {
      setModalDisplay(createModal(main, '01', message));
    }
  });
};

const formSearch = (parent, units) => {
  const form = creator(parent, 'form', 'append');

  const searchContainer = creator(form, 'div', 'append');
  searchContainer.setAttribute('id', 'search-container');

  const input = creator(searchContainer, 'input', 'append');
  input.setAttribute('name', 'search');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search...');
  input.setAttribute('class', 'weather-input');
  input.required = true;

  const button = creator(searchContainer, 'button', 'append');
  button.setAttribute('type', 'submit');
  button.setAttribute('id', 'search-btn');
  addCBToSearchBtn(button, parent, units);

  const icon = creator(button, 'span', 'append');
  icon.setAttribute('class', 'material-icons');
  icon.innerHTML = 'search';

  /* const priorityTitle = creator(form, 'p', 'append');
  priorityTitle.innerHTML = 'Select Unit Format:'; */
  const toggleContainer = creator(form, 'div', 'append');
  toggleContainer.setAttribute('class', 'radio-container');
  const toggle = creator(toggleContainer, 'input', 'append');
  toggle.setAttribute('id', 'switch');
  toggle.setAttribute('class', 'checkbox');
  toggle.setAttribute('type', 'checkbox');
  const toggleLabel = creator(toggleContainer, 'label', 'append');
  toggleLabel.setAttribute('for', 'switch');
  toggleLabel.setAttribute('class', 'toggle');
  const celsius = creator(toggleLabel, 'p', 'append');
  celsius.setAttribute('id', 'toggle-celsius');
  celsius.innerHTML = '°C';
  const fahrenheit = creator(toggleLabel, 'p', 'append');
  fahrenheit.innerHTML = '°F';
  fahrenheit.setAttribute('id', 'toggle-fahrenheit');
  /*
  for (let i = 0; i < radioButtons.length; i += 1) {
    createRadioBtn(radioContainer, radioButtons, i);
  }
  */
  return form;
};

export { formSearch, units };