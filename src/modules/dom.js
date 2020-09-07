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

  return form;
}

function createWeatherTable(content) {
  const main = creator(content, 'main', 'append');
  const formSearch = creator(content, 'form');
}

export default creator;