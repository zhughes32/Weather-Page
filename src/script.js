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

//city search engine
let searchInput = document.querySelector("#search-input");

function citySearch(event) {
  event.preventDefault();
  searchInput.innerHTML = `Currently in ${searchInput}`;

  console.log(searchInput.value);

  let citySearch = document.querySelector("#city-searched");

  citySearch("Oklahoma City");

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

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", citySearch);

//temperature
let fahrenheitTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  console.log(response.data);

  let temperature = Math.round(fahrenheitTemp);
  let humidity = Math.round(response.data.main.humidity);
  let description = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;

  fahrenheitTemp = Math.round(response.data.main.temp);

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
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-id");
  temperatureElement.innerHTML = `${fahrenheitTemp}°F`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-id");
  let celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}°C`;
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
