function displayTemperature(response){
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    temperatureElement.innerHTML = temperature;

    let cityElement = document.querySelector("#current-city");
    console.log(response.data);
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind_speed");
    let currentDateELement = document.querySelector("#current-date");
    let iconElement=document.querySelector("#icon");

    let date= new Date(response.data.time*1000);
    let hours= date.getHours().toString().padStart(2,'0');
    let minutes= date.getMinutes().toString().padStart(2,'0');
    let formattedDate=formatDate(date);
   

    iconElement.innerHTML= `<img src= "${response.data.condition.icon_url}" class="current-tempererature-icon" alt="${response.data.condition.description}"/>`;
   
    cityElement.innerHTML=response.data.city;
    descriptionElement.innerHTML= response.data.condition.description;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML= `${response.data.wind.speed}km/h`;
    currentDateELement.innerHTML= `${formattedDate} ${hours}:${minutes}`;

}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
 // let cityElement = document.querySelector("#current-city");
  
  let city = searchInputElement.value;

  let apiKey="oa92f8d05b19ft14f011594cb18331bb";
  let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`; 

  axios.get(apiUrl).then(displayTemperature);
//   cityElement.innerHTML = city;
}

function formatDate(date) {
    
//   let minutes = date.getMinutes();
//   let hours = date.getHours();
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let formattedDay = days[day];
   
  return formattedDay;

}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
let currentHours=currentDate.getHours.toString().padStart(2,'0');
let currentMinutes=currentDate.getMinutes.toString().padStart(2,'0');
currentDateELement.innerHTML = `${formatDate(currentDate)}, ${currentHours}:${currentMinutes}`;

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}


  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();