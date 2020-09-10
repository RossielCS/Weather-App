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
  false: '&units=metric',
  true: '&units=imperial',
};

const addCBToToggle = (button) => {
  button.addEventListener('click', () => {
    button.children[0].checked = !button.children[0].checked;
  });
};

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

  const toggleContainer = creator(form, 'div', 'append');
  toggleContainer.setAttribute('class', 'toggle-container');
  addCBToToggle(toggleContainer);

  const toggle = creator(toggleContainer, 'input', 'append');
  toggle.setAttribute('id', 'switch');
  toggle.setAttribute('class', 'checkbox weather-input');
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
  return form;
};

export { formSearch, units };