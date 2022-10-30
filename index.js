let h2 = document.querySelector("h2");
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h2.innerHTML = `${date} ${month} ${year} ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `Weather in <strong>${searchInput.value}</strong>`;
  } else {
    alert("Please, enter city name");
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=017d56650cd168d68067850318775d43`;

  function showCurrentTemp(response) {
    let humidity = Math.round(response.data.main.humidity);
    currentHumidity = document.querySelector(".humidity");
    currentHumidity.innerHTML = `Humidity: ${humidity}%`;
    let currentTemperature = Math.round(response.data.main.temp);
    currentTemp = document.querySelector(".temp");
    currentTemp.innerHTML = `${currentTemperature}°`;
    let windSpeed = response.data.wind.speed;
    currentWindSpeed = document.querySelector(".wind");
    currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed} km/s`;
  }
  axios.get(`${apiUrl}`).then(showCurrentTemp);
}
let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("click", searchCity);

function showWeather(response) {
  let cityName = response.data.name;
  h1 = document.querySelector("h1");
  h1.innerHTML = `Weather in <strong>${cityName}</strong>`;
  let humidity = Math.round(response.data.main.humidity);
  currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentTemperature = Math.round(response.data.main.temp);
  currentTemp = document.querySelector(".temp");
  currentTemp.innerHTML = `${currentTemperature}°`;
  let windSpeed = response.data.wind.speed;
  currentWindSpeed = document.querySelector(".wind");
  currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed} km/s`;
  let currentMainIcon = document.querySelector(".mainicon");
  currentMainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector(".description");
  descriptionElement = response.data.weather[0].description;
}
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=017d56650cd168d68067850318775d43`;
  axios.get(url).then(showWeather);
}

function getCurrentTempData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentTempData);
