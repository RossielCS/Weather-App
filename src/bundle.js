
import './assets/stylesheets/style.scss';

function getWeather(cityName) {
  cityName = cityName.replace(/ /g, '+');
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=7a075fa45323323813d5c357e54b030e`, { mode: 'cors' })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.getElementById('content').innerHTML = `${JSON.stringify(response)}`;
    })
    .catch((err) => {
      console.log(err);
    });
}

getWeather('Buenos Aires');
