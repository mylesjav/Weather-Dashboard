var tempContainer = document.getElementById("temp");
var fetchbutton = document.getElementById("fetch-button");

//A name of city is typed in the search box
//
//event listener for click
//
//contact weather api for current weather
var apiID = "549265f18d8c49afd8cc23e98f3a2c20";
var latitude = "";
var longitude = "";

// fetch("https://api.openweathermap.org/data/2.5/weather?lat=38.8951&lon=-77.0364&appid=549265f18d8c49afd8cc23e98f3a2c20")

//     .then(function(response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=38.8951&lon=-77.0364&exclude=minutely,hourly,daily,alerts&appid=549265f18d8c49afd8cc23e98f3a2c20"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.main.humidity);
    var temp = document.createElement("p");
    var wind = document.createElement("h3");
    var humidity = document.createElement("a");

    temp.textContent = "Temperature:" + data.main.temp;
    wind.textContent = "Wind Speed:" + data.wind.speed;
    humidity.textContent = "Humidity:" + data.main.humidity;

    tempContainer.appendChild(temp);
    tempContainer.appendChild(wind);
    tempContainer.appendChild(humidity);
  });

// fetchButton.addEventListener("click", getApi);
