function getInputsValues(params) {
  
}

function modifyInput(input) {
  return input.replace(/\W{1,}/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join('+');
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
    .then((response) => {
      console.log(response);
      document.getElementById('content').innerHTML = `${JSON.stringify(
        response,
      )}`;
      // return response;
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

function filterWind(weatherData) {
  return weatherData.wind.speed;
}

export { filterWeather, filterMain, filterWind };