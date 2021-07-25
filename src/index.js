function formatDate(timestamp) {
    let now = new Date();
    let hours = now.getHours();
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];
    let day = days[now.getDay()];
    return `${day} ${hours}:${minutes}`;
}

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
    "Saturday"];
    return days[day];
}

function updateWeather(response) {
    console.log(response);
    let town = document.querySelector(".town");
    let temp = document.querySelector(".currentTemp");
    let descriptionElement = document.querySelector(".current-conditions");
    let humidityElement = document.querySelector(".humidity");
    let windElement = document.querySelector(".wind");
    let dateElement = document.querySelector(".last-updated");
    let iconElement = document.querySelector("#icon");

    fahrenheitTemperature = response.data.main.temp;

    town.innerHTML = response.data.name;
    temp.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(town) {
    let apiKey = "3cbb8093ae84642397f726acc0edb894";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${apiKey}&units=imperial`;
      axios.get(`${apiUrl}`).then(updateWeather);
}

function getWeather(event) {
  event.preventDefault();
  let town = document.querySelector("#search-input");
  search(town.value);
}

let citySearch = document.querySelector("#search");
citySearch.addEventListener("submit", getWeather);


function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
   let celsiusTemperature = (5 / 9) * (fahrenheitTemperature - 32);
   let temperatureElement = document.querySelector(".currentTemp");
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
   let temperatureElement = document.querySelector(".currentTemp");
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("Reykjavik");