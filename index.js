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

function showCurrentTemp(response) {
  let humidity = Math.round(response.data.main.humidity);
  currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let currentTemperature = Math.round(response.data.main.temp);
  currentTemp = document.querySelector(".temp");
  currentTemp.innerHTML = `${currentTemperature}`;
  let windSpeed = response.data.wind.speed;
  currentWindSpeed = document.querySelector(".wind");
  currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed} km/s`;
  let currentMainIcon = document.querySelector(".mainicon");
  currentMainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let cityName = response.data.name;
  let currentCityName = document.querySelector("h1");
  currentCityName.innerHTML = `Weather in <strong>${cityName}</strong>`;

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=017d56650cd168d68067850318775d43`;
  axios.get(`${apiUrl}`).then(showCurrentTemp);
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  search(searchInput.value);
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `Weather in <strong>${searchInput.value}</strong>`;
  } else {
    alert("Please, enter city name");
  }
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
  currentTemp.innerHTML = `${currentTemperature}`;
  let windSpeed = response.data.wind.speed;
  currentWindSpeed = document.querySelector(".wind");
  currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed} km/s`;
  let currentMainIcon = document.querySelector(".mainicon");
  currentMainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  celsiusTemp = response.data.main.temp;
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

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrTempElement = document.querySelector(".temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  fahrTempElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheitUnitLink.classList.add("active");
  celsiusUnitLink.classList.remove("active");
}

let fahrenheitUnitLink = document.querySelector("#fahrenheit");
fahrenheitUnitLink.addEventListener("click", displayFahrenheitTemp);

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsTempElement = document.querySelector(".temp");
  celsTempElement.innerHTML = Math.round(celsiusTemp);
  celsiusUnitLink.classList.add("active");
  fahrenheitUnitLink.classList.remove("active");
}

let celsiusUnitLink = document.querySelector("#celsius");
celsiusUnitLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemp = null;

search("Kyiv");

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `          <div class="col-sm-2">
                  <div class="card" id="day-card">
                    <div class="card-body">
                      <h5 class="card-title">${day}</h5>
                      <img class="icon" src="images/rainy.JPG" alt="" />
                      <div class="forecast-temperature-day">
                        13° </div>
                        <div class="forecast-temperature-night">
                        8° </div>
                    </div>
                  </div>
                </div>
                `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=743bee57fddbfaf52447193a87d5dd25`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
