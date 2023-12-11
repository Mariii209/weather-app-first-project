function searching(event) {
  event.preventDefault();
  let searchingBar = document.querySelector("#search-bar");
  searchCity(searchingBar.value);
  forecastSearch(searchingBar.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searching);

function searchCity(city) {
  let apiKey = "7f30420fc505ct92a4f1o960ab77843b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(weatherInfo);
}

function weatherInfo(response) {
  let cityNameElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temp-number");
  let humidityElement = document.querySelector("#humidty");
  let windElement = document.querySelector("#wind");
  let conditionElement = document.querySelector("#condition");
  let currentDateElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-icon");

  cityNameElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  conditionElement.innerHTML = response.data.condition.description;
  currentDateElement.innerHTML = currentTimeInfo(date);
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-img" />`;
  console.log(response.data);
}

function currentTimeInfo(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

searchCity("Modesto");

function weekdays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function forecastSearch(city) {
  let apiKey = "7f30420fc505ct92a4f1o960ab77843b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="forecast-container">
                        <div class="forecast-days">${weekdays(day.time)}</div>
                        <img src="${
                          day.condition.icon_url
                        }" class="icon-imagine" />
                        <div class="forecast-temperature">
                          <span class="max-tem-forecast">${Math.round(
                            day.temperature.maximum
                          )}°</span>
                          <span class="mini-forecast">${Math.round(
                            day.temperature.minimum
                          )}°</span>
                        </div>
                      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

forecastSearch("Modesto");
