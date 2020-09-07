function getInputsValues(inputs) {
  const allInputs = [...inputs];
  const values = [];
  for (let i = 0; i < allInputs.length; i += 1) {
    if (allInputs[i].type === 'text' && allInputs[i].value === '') return false;

    if (allInputs[i].type === 'radio') {
      if (allInputs[i].checked) values.push(allInputs[i].value);
    } else {
      values.push(allInputs[i].value);
    }
  }
  return values;
}

function modifyInput(input, units) {
  console.log(input.replace(/\W{1,}/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join('+')
    .concat(units));

  return input.replace(/\W{1,}/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join('+')
    .concat(units);
}

function getWeather(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=7a075fa45323323813d5c357e54b030e`,
    { mode: 'cors' },
  )
    .then((response) => {
      if (!response.ok) throw Error('City not Found.');
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

function filterWeather(weatherData) {
  const { description, icon } = weatherData.weather[0];
  return [description, icon];
}

function filterMain(weatherData) {
  const { temp, humidity } = weatherData.main;
  const feelsLike = weatherData.main.feels_like;
  const tempMin = weatherData.main.temp_min;
  const tempMax = weatherData.main.temp_max;
  return [temp, feelsLike, tempMin, tempMax, humidity];
}

export {
  getInputsValues, modifyInput, getWeather, filterWeather, filterMain,
};