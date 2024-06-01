const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "549265f18d8c49afd8cc23e98f3a2c20";
// API key for OpenWeatherMap API

let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

savedCities.forEach(city => {
document.getElementById('savedCities').innerHTML+=
`<li>${city}</li>`
});

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?${cityName}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        console.log(data);
        let weatherItem = data.list[0]
        console.log(weatherItem);

        document.getElementById('current-weather').innerHTML =

        `<div class="details">
        <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
        <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
        <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
    </div>
    <div class="icon">
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
        <h6>${weatherItem.weather[0].description}</h6>
    </div>`;

for ( let i = 7; i< data.list.length; i+=8){

    let weatherItem = data.list[i]
    document.getElementById('forecast-weather').innerHTML +=
    `<div class="details">
    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
</div>
<div class="icon">
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
    <h6>${weatherItem.weather[0].description}</h6>
</div>`;
}
        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

const getCityCoordinates = () => {

document.getElementById('current-weather').innerHTML=''
document.getElementById('forecast-weather').innerHTML=''

    const cityName = cityInput.value.trim();
    
    savedCities.push(cityName)
    localStorage.setItem('savedCities', JSON.stringify(savedCities))

    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);

          // Save the city name to localStorage
          let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
          if (!savedCities.includes(name)) {
              savedCities.push(name);
              localStorage.setItem("savedCities", JSON.stringify(savedCities));
          }
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });

}

// Call this function when the app loads
//displaySavedCities(savedCitiesList);



  




searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());