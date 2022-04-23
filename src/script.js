let now = new Date();
function liveDate(globalDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  let currentDate = `${day}, ${month} ${date}, ${year}`;

  let pageDate = document.querySelector(".liveDate");
  pageDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

  return currentDate;
}

function liveTime() {
  let hours = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  let hour = hours[now.getHours()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = `${hour}:${minutes}`;

  let pageTime = document.querySelector(".liveTime");
  pageTime.innerHTML = `${hour}:${minutes}`;

  return currentTime;
}

console.log(liveDate(now));
console.log(liveTime(now));

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//city search engine
let searchInput = document.querySelector("#search-input");

function citySearch(event) {
  event.preventDefault();

  if (searchInput.value) {
    cityNameSearch(searchInput.value);
  } else {
    searchInput.innerHTML = null;
    alert("Please enter a city");
  }
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", citySearch);

function cityNameSearch(cityName) {
  let apiKey = "af7487e3933154444dd5365e550b34dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

cityNameSearch("Oklahoma City");

//= `Currently in ${searchInput}`;

//forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2" style="width: 16rem;"
  <div class="card-body">
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" 
    alt=""
    id="weatherIcon"
    </>
    <h6 class="forecast-weather">${Math.round(forecastDay.temp.day)}°F</h6>
    <p class="forecast-day">${formatDay(forecastDay.dt)}</p>
</div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//temperature

function getForecast(coordinates) {
  let apiKey = "af7487e3933154444dd5365e550b34dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let citySearch = document.querySelector("#city-searched");
  citySearch.innerHTML = response.data.name;

  console.log(response.data);
  fahrenheitTemp = Math.round(response.data.main.temp);

  let temperature = Math.round(fahrenheitTemp);
  let humidity = Math.round(response.data.main.humidity);
  let description = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;

  let showWind = document.querySelector("#wind");
  let showTemp = document.querySelector("#temperature-id");
  let showHumidity = document.querySelector("#humidity");
  let showDescription = document.querySelector("#description");
  let showIcon = document.querySelector("#weatherIcon");

  showHumidity.innerHTML = `Humidty: ${humidity} %`;
  showTemp.innerHTML = `${temperature}°F`;
  showDescription.innerHTML = `${description}`;
  showWind.innerHTML = `Wind: ${wind} mph`;
  showIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

//no location button yet
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

//function getCurrentPosition() {
//navigator.geolocation.getCurrentPosition(showPosition);
//console.log = showPosition; }

//let button = document.querySelector("button");
//button.addEventListener("click", getCurrentPosition);

//<div class="col-2">
//<button> Current Location</button>
//</div>
