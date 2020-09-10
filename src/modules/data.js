const getInputsValues = (inputs) => {
  const allInputs = [...inputs];
  const values = [];
  for (let i = 0; i < allInputs.length; i += 1) {
    if (allInputs[i].type === 'text' && allInputs[i].value === '') return false;

    if (allInputs[i].type === 'checkbox') {
      console.log(allInputs[i].checked);
      values.push(allInputs[i].checked);
    } else {
      values.push(allInputs[i].value);
    }
  }
  return values;
};

const modifyInput = (input, units) => input.replace(/\W{1,}/g, ' ')
  .toLowerCase()
  .split(' ')
  .map(x => x.charAt(0).toUpperCase() + x.slice(1))
  .join('+')
  .concat(units);

const errHandler = () => new Response(JSON.stringify({ message: 'City not found.' }));

const getWeather = async (locationInfo) => {
  let response = '';
  if (locationInfo.latitude) {
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationInfo.latitude}&lon=${locationInfo.longitude}&units=metric&APPID=7a075fa45323323813d5c357e54b030e`, { mode: 'cors' }).catch(errHandler);
  } else {
    response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInfo}&APPID=7a075fa45323323813d5c357e54b030e`, { mode: 'cors' }).catch(errHandler);
  }
  const weatherData = await response.json();
  if (weatherData && response.ok) {
    return weatherData;
  }
  return false;
};

const filterData = (weatherData) => {
  const { name } = weatherData;
  const { description, icon } = weatherData.weather[0];
  const allTemp = [weatherData.main.temp, weatherData.main.feels_like,
    weatherData.main.temp_min, weatherData.main.temp_max];
  const [temp, feelsLike, tempMin, tempMax] = allTemp.map(x => Math.round(x));
  const { humidity } = weatherData.main;
  const windSpeed = weatherData.wind.speed;
  return [name, temp, feelsLike, tempMin, tempMax,
    description, icon, windSpeed, humidity];
};

export {
  getInputsValues, modifyInput, getWeather, filterData,
};