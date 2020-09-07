import './assets/stylesheets/style.scss';

function creator(parent, newElement, position) {
  const child = document.createElement(`${newElement}`);
  if (position === 'append') {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, position);
  }
  return child;
}

const weatherInfo = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    {
      id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n',
    },
  ],
  base: 'stations',
  main: {
    temp: 286.47,
    feels_like: 285.55,
    temp_min: 284.26,
    temp_max: 289.26,
    pressure: 1022,
    humidity: 82,
  },
  visibility: 10000,
  wind: { speed: 1.5, deg: 220 },
  clouds: { all: 98 },
  dt: 1599446702,
  sys: {
    type: 1,
    id: 1414,
    country: 'GB',
    sunrise: 1599456201,
    sunset: 1599503634,
  },
  timezone: 3600,
  id: 2643743,
  name: 'London',
  cod: 200,
};
/*
function getWeather(cityName) {
  cityName = cityName
    .replace(/\W{1,}/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join('+');

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
*/
// getWeather('Buenos  Aires');

// style.backgroundImage = `url("http://openweathermap.org/img/w/${icon}.png")`;

function getWeather(cityName) {
  return weatherInfo;
}

function filterData(weatherInfo) {
  const container = creator(document.getElementById('content'), 'img', 'append');
  const { icon } = weatherInfo.weather[0];
  container.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
} filterData(getWeather('Buenos Aires'));


function filterWeather(weatherInfo) {
  const { description, icon } = weatherInfo.weather[0];
  return [description, icon];
}

function filterMain(weatherInfo) {
  const { temp, humidity } = weatherInfo.main;
  const feelsLike = weatherInfo.main.feels_like;
  const tempMin = weatherInfo.main.temp_min;
  const tempMax = weatherInfo.main.temp_max;
  console.log([temp, feelsLike, tempMin, tempMax, humidity]);
  return [temp, feelsLike, tempMin, tempMax, humidity];
}

filterWeather(weatherInfo);
filterMain(weatherInfo);