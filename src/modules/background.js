import { creator } from './helpers';
import humLight from '../assets/images/humidity_light.png';
import windSLight from '../assets/images/wind_speed_light.png';
import humDark from '../assets/images/humidity_dark.png';
import windSDark from '../assets/images/wind_speed_dark.png';
import img1D from '../assets/images/01d.png';
import img1N from '../assets/images/01n.png';
import img2D from '../assets/images/02d.png';
import img2N from '../assets/images/02n.png';
import img3D from '../assets/images/03d.png';
import img3N from '../assets/images/03n.png';
import img4D from '../assets/images/04d.png';
import img4N from '../assets/images/04n.png';
import img9D from '../assets/images/09d.png';
import img9N from '../assets/images/09n.png';
import img10D from '../assets/images/10d.png';
import img10N from '../assets/images/10n.png';
import img11D from '../assets/images/11d.png';
import img11N from '../assets/images/11n.png';
import img13D from '../assets/images/13d.png';
import img13N from '../assets/images/13n.png';
import img50D from '../assets/images/50d.png';
import img50N from '../assets/images/50n.png';

const iconList = {
  '01d': img1D,
  '01n': img1N,
  '02d': img2D,
  '02n': img2N,
  '03d': img3D,
  '03n': img3N,
  '04d': img4D,
  '04n': img4N,
  '09d': img9D,
  '09n': img9N,
  '10d': img10D,
  '10n': img10N,
  '11d': img11D,
  '11n': img11N,
  '13d': img13D,
  '13n': img13N,
  '50d': img50D,
  '50n': img50N,
};

const createBGContainer = main => creator(main, 'img', 'append').setAttribute('id', 'bg-image');

const setBGImage = (iconList, iconIndex) => {
  document.getElementById('bg-image').setAttribute('src', `${iconList[iconIndex]}`);

  const bgColor = document.getElementById('content');
  const weatherCont = document.getElementById('weather-container');
  const weatherTempMain = document.getElementById('weather-temp-main');
  const searchCont = document.getElementById('search-container');
  const toggle = document.getElementsByClassName('toggle')[0];

  const iconWind = document.getElementById('weather-icon-wind');
  const iconHum = document.getElementById('weather-icon-hum');
  if (iconIndex.includes('d')) {
    [bgColor, weatherCont, weatherTempMain, searchCont, toggle].forEach(x => {
      x.setAttribute('class', 'light-version');
    });
    iconWind.setAttribute('src', `${windSDark}`);
    iconHum.setAttribute('src', `${humDark}`);
  } else {
    [bgColor, weatherCont, weatherTempMain, searchCont].forEach(x => {
      x.setAttribute('class', 'dark-version');
    });
    iconWind.setAttribute('src', `${windSLight}`);
    iconHum.setAttribute('src', `${humLight}`);
  }
};

export { createBGContainer, setBGImage, iconList };