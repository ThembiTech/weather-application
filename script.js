function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind_speed");
  let currentDateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  let date = new Date(response.data.time * 1000);
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let formattedDate = formatDate(date);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" alt="${response.data.condition.description}" />`;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  currentDateElement.innerHTML = `${formattedDate} ${hours}:${minutes}`;

  // Call the forecast display function with the city name
  displayForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "oa92f8d05b19ft14f011594cb18331bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
}

function displayForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`; 
  axios.get(apiUrl).then(function (response) {
    let forecastHtml = "";
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

    response.data.daily.forEach(function (forecastDay, index) {
      if (index < 5) {
        forecastHtml += `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${days[index]}</div>
            <div class="weather-forecast-icon">
              <img src="${forecastDay.condition.icon_url}" alt="${forecastDay.condition.description}" />
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(forecastDay.temperature.maximum)}º</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(forecastDay.temperature.minimum)}º</div>
            </div>
          </div>
        `;
      }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


displayForecast("Paris");