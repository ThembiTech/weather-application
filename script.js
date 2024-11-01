function displayTemperature(response){
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    temperatureElement.innerHTML = temperature;
    let cityElement = document.querySelector("#current-city");
    
    console.log(response.data);
    let descriptionElement = document.querySelector("#description");
    
    cityElement.innerHTML=response.data.city;
    descriptionElement.innerHTML= response.data.condition.description;

    

}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
 // let cityElement = document.querySelector("#current-city");
  
  let city = searchInputElement.value;

  let apiKey="oa92f8d05b19ft14f011594cb18331bb";
  let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`; 

  axios.get(apiUrl).then(displayTemperature);
  cityElement.innerHTML = city;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
