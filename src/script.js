let searchInput = document.querySelector("#search-input");

function citySearch(event) {
  event.preventDefault();
  searchInput.innerHTML = `Currently in ${searchInput}`;

  console.log(searchInput.value);
  let citySearch = document.querySelector("#city-searched");

  if (searchInput.value) {
    citySearch.innerHTML = searchInput.value;
    let apiKey = "af7487e3933154444dd5365e550b34dc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  } else {
    citySearch.innerHTML = null;
    alert("Please enter a city");
  }
}

function showTemperature(response) {
  console.log(response.data);
  let showTemp = document.querySelector("#temperature-id");
  let temperature = Math.round(response.data.main.temp);
  showTemp.innerHTML = `${temperature}°F`;

  let showHumidity = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  showHumidity.innerHTML = `Humidty: ${humidity} %`;

  let showPrecip = document.querySelector("#precip");
  let precipitation = Math.round(response.data.main.pressure);
  showPrecip.innerHTML = `Precipitation: ${precipitation} %`;

  let showWind = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  showWind.innerHTML = `Wind: ${wind} mph`;
}

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

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", citySearch);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-id");
  temperatureElement.innerHTML = "66°F";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-id");
  temperatureElement.innerHTML = "19°C";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

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
