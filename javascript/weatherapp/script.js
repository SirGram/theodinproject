const $searchInput = document.getElementById('search-input');
const $searchButton = document.getElementById('search-submit');
const $message = document.getElementById('message');
const $changeUnitButton = document.getElementById('change-units');

let changeUnits = false;

const fetchData = async (cityName) => {
  const APIKEY = 'dd7b21e300374d04b3d160508241902';
  const url = 'http://api.weatherapi.com/v1/current.json?key=';
  try {
    const response = await fetch(`${url + APIKEY}&q=${cityName}`);
    const currentWeather = await response.json();
    return currentWeather;
  } catch (error) {
    console.log('error');
    return [];
  }
};

const updateWeather = (data) => {
  console.log(data);
  const $weather = document.getElementById('weather');
  if (data.error) {
    $weather.style.visibility = 'hidden';
    $message.textContent = data.error.message;
  } else {
    $weather.style.visibility = 'visible';
    const $city = document.getElementById('city');
    const $country = document.getElementById('country');
    const $icon = document.getElementById('icon');
    const $temperature = document.getElementById('temperature');
    const $wind = document.getElementById('wind');
    const $precip = document.getElementById('precip');
    const $humidity = document.getElementById('humidity');
    $city.textContent = '';
    $country.textContent = '';
    $icon.src = '';
    $temperature.textContent = '';
    $wind.textContent = '';
    $precip.textContent = '';
    $humidity.textContent = '';

    $city.textContent = data.location.name;
    $country.textContent = data.location.country;
    $icon.src = `https:${data.current.condition.icon}`;
    $temperature.textContent = `${data.current.temp_c} ºC`;
    $wind.textContent = `${data.current.wind_kph} kmph`;
    $precip.textContent = `${data.current.precip_mm} mm`;
    $humidity.textContent = `${data.current.humidity} %`;
    console.log(data.current.is_day);
    if (data.current.is_day === 1) {
      $weather.style.filter = 'invert(100%)';
    } else {
      $weather.style.filter = '';
    }
    if (changeUnits === true) {
      $temperature.textContent = `${data.current.temp_f} ºF`;
      $wind.textContent = `${data.current.wind_mph} mph`;
    }
  }
};
let weatherData = [];
const fetchAndDisplayInitialWeather = async (initialCityName) => {
  weatherData = await fetchData(initialCityName);
  updateWeather(weatherData);
};
fetchAndDisplayInitialWeather('Greenland');

$searchButton.addEventListener('click', async () => {
  const cityName = $searchInput.value.toLowerCase();
  $message.textContent = 'Searching location. Please wait...';

  weatherData = await fetchData(cityName);

  setTimeout(() => {
    $message.textContent = '';
    updateWeather(weatherData);
  }, 1000);
});

$changeUnitButton.addEventListener('click', () => {
  changeUnits = !changeUnits;
  if (changeUnits) {
    $changeUnitButton.textContent = 'ºF / MPH';
  } else {
    $changeUnitButton.textContent = 'ºC / KPH';
  }

  updateWeather(weatherData);
});
