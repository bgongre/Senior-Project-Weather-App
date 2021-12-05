//Get elementByID loca so we can add text to it "Xiaodong Huang".
var x = document.getElementById("lat");
var y = document.getElementById("long");

// forecast display elements -Brittani Gongre-
let cityName = document.getElementsByClassName("cityName");
let weatherIcon = document.getElementsByClassName("icon");
let weatherDescription = document.getElementsByClassName("description");
let weatherTemp = document.getElementsByClassName("temp");
let weatherFeelsLike = document.getElementsByClassName("feels-like");
let weatherTempMin = document.getElementsByClassName("temp-min");
let weatherHumidity = document.getElementsByClassName("humidity");
let windSpeed = document.getElementsByClassName("wind");
let weatherVisibility = document.getElementsByClassName("visibility");
let citySunrise = document.getElementsByClassName("sunrise");
let citySunset = document.getElementsByClassName("sunset");

// variables created for use with the Add and Remove button functionality. -Brittani Gongre-
let searchFieldNum = 1;
let removeBtnNum = 1;
let attributeName = "cityLoc";
let citySearchInput = document.getElementsByClassName("city-search-input");
let cityTextInput = document.querySelector(".form-control");
let searchFunctionContainer = document.getElementById("search-field-container");
let weatherInformationContainer = document.getElementById("weather-information-container");
let weatherInformationDiv = document.getElementById("weather-information");
let addBtn = document.getElementById("add-btn");
let removeBtn = document.getElementById("remove-btn");
let cardRow = document.getElementById("card-row");
let singleDayForecastRadioBtn = document.getElementById("clear");

//get user's location and display "Xiaodong Huang"
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Refactored so that when the geolocation gets the current position the 
// latitude and longitude can be retrieved and displayed in the console. -Brittani Gongre-
function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  Geoweather.fetchWeather(lat, long);
  console.log('This is your latitude: ', lat);
  console.log('This is your longitude: ', long);
}

window.onload = function () {
  getLocation();
}

//getting the value user search "Xiaodong Huang"
// added 'attributeName' to help make this function dynamic.
// 'attributeName' is updated when a new weather location is added and allows for 
// a new location to be searched -Brittani Gongre-
function search() {
  weather.fetchWeather(document.getElementsByClassName(attributeName)[0].value);
}

//add eventlistener, onclick to the button get the value user input. "Xiaodong Huang"
// same as above, edited this function to be dynamic for when new weather 
// information is added -Brittani Gongre-
document.querySelector(".search").addEventListener("click", function () {
  search(attributeName);
  removefore();
});

//when user press enter call the search function.  "Xiaodong Huang"
// same as above, edited this function to be dynamic for when new weather information is 
// added -Brittani Gongre-
document.querySelector(`.${attributeName}`).addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    search(attributeName);
    removefore();
  }
});

//Connect to the api, and get the data to json "Xiaodong Huang"
let weather = {
  apiKey: "a4ba445616b05d69a1302b0cad41b887",
  //function take a city name, then fetch it from api "Xiaodong Huang"
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Imperial&appid=" + this.apiKey)
      //once fetch data from api return it to json data "Xiaodong Huang"
      .then((response) => {
        if (!response.ok) {
          alert("City name error");
          throw new Error("City name error");
        }
        return response.json();
      })
      //once we have the data, get the data to displace function. "Xiaodong Huang"
      .then((data) => displayWeather(data));
  },
};

//api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
//Second function, this time it take user's lat and long and get weather
//upon login user will get current location weather
let Geoweather = {
  apiKey: "a4ba445616b05d69a1302b0cad41b887",
  //function take a city name, then fetch it from api "Xiaodong Huang"
  fetchWeather: function (lat, long) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=Imperial&appid=" + this.apiKey)
      //once fetch data from api return it to json data "Xiaodong Huang"
      .then((response) => {
        if (!response.ok) {
          alert("City name error");
          throw new Error("City name error");
        }
        return response.json();
      })
      //once we have the data, get the data to displace function. "Xiaodong Huang"
      .then((data) => displayWeather(data));
  },
};

//once we have the data from api, get the data and put it in html  "Xiaodong Huang"
// refactored below to have all DOM selectors appear at top of the 
// page for easy readability and reuse -Brittani Gongre-
let flat;
let flon;
let cname;

function displayWeather(data) {
  let {name} = data;

  let {
    icon,
    description
  } = data.weather[0];

  let {
    temp,
    temp_min,
    humidity, 
    feels_like
  } = data.main;

  let {speed} = data.wind;
  let {visibility} = data;
  let {sunrise} = data.sys;
  let {sunset} = data.sys;
  let {lon} = data.coord;
  let {lat} = data.coord;
  cityName[0].innerText = "Forecast for " + name;
  weatherIcon[0].src = "https://openweathermap.org/img/wn/" + icon + ".png";
  weatherDescription[0].innerText = description;
  weatherTemp[0].innerText = "High: " + Math.round(temp) + "°F";
  weatherTempMin[0].innerText = "Low: " + Math.round(temp_min) + "°F";
  weatherFeelsLike[0].innerText = "Feels like: " + Math.round(feels_like) + "°F";
  weatherHumidity[0].innerText = "Humidity: " + humidity + "%";
  windSpeed[0].innerText = "Wind speed: " + speed + " km/h";
  weatherVisibility[0].innerText = "visibility: " + visibility;
  citySunrise[0].innerText = "sunrise: " + sunriseTime(sunrise);
  citySunset[0].innerText = "sunset: " + sunsetTime(sunset);
  //set values for forecast function "Xiaodong Huang"
  flat = lat;
  flon = lon;
  cname = name;
  // Holds the city values so that they can be removed later -Brittani Gongre-
  savedForecastLocations[name] = name;
}

// broke sunriseTime and sunsetTime out of the above code block to make it reusable later on when creating new cards
// this will make it so the code does not have to be repeated. -Brittani Gongre-
let sunriseTime = (sunriseData) => {
  var date = new Date(sunriseData * 1000);
  var timestr = date.toLocaleTimeString();
  return timestr;
}

let sunsetTime = (sunsetData) => {
  var date = new Date(sunsetData * 1000);
  var timestr = date.toLocaleTimeString();
  return timestr;
}

//function to call the forecast function "Xiaodong Huang"
function foreDays(flat, flon, num) {
  Foreatherweek.fetchWeather(flat, flon, num);
}

//onclick to the button get the value user input, then call forecast function to display "Xiaodong Huang"
function threedis() {
  foreDays(flat, flon, document.getElementById("threeDay").value);
}

function sevendis() {
  foreDays(flat, flon, document.getElementById("sevenDay").value);
}

// clear the forecast **edited to leave the original single day forecast**
function removefore() {
  var removeForecast = document.getElementById("card-row");
  while (removeForecast.children.length > 1) {
    removeForecast.removeChild(removeForecast.lastChild);
  }
}

//clear the forecast **edited to leave the original single day forecast**
function clearfore() {
  var removeForecast = document.getElementById("card-row");
  while (removeForecast.children.length > 1) {
    removeForecast.removeChild(removeForecast.lastChild);
  }
}

//forecast object
let Foreatherweek = {
  apiKey: "a4ba445616b05d69a1302b0cad41b887",
  //function take lat and lon, then fetch it from api "Xiaodong Huang"
  fetchWeather: function (flat, flong, num) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + flat + "&lon=" + flong + "&exclude=current,hourly,minutely,alerts&cnt=3&units=Imperial&appid=" + this.apiKey)
      //once fetch data from api return it to json data "Xiaodong Huang"
      .then((response) => {
        if (!response.ok) {
          alert("City name error");
          throw new Error("City name error");
        }
        return response.json();
      })
      //once we have the data, get the data to displace function. "Xiaodong Huang"
      .then((data) => foreDisplay(data, num));
  },
};

// function to display the forecast "Xiaodong Huang"
function foreDisplay(data, num) {
  //Check if there are forecasat already, if there is remove it. "Xiaodong Huang"
  removefore();
  //display number of days depends on the user's selection "Xiaodong Huang"
  data.daily.forEach((value, index) => {
    if (index > 0 && index <= num) {
      //conver the day, from unix to readalbe 
      var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      var icon = value.weather[0].icon;
      var disCon = "https://openweathermap.org/img/wn/" + icon + ".png";
      var temp = value.temp.day.toFixed(0);
      let minTemp = value.temp.min.toFixed(0);
      let description = value.weather[0].description;
      let humidity = value.humidity;
      let wind = value.wind_speed;
      // let visibility = value. **can't find this in the json**
      // Added additional attributed in the "card-body" div such as minTemp, humidity, wind,
      // sunrise and sunset.  
      let fday = `<div id="days" class="col">
      <div class="card mx-auto">
        <div class="weekday-name">${dayname}</div>
        <div class="description card-subtitle">${description}</div>
        <div class="pics">
          <img src=${disCon} alt="weather icon" class="${icon} icon card-img-top" />
        </div>
        <div class="card-body">
          <h5 class="temp">High: ${temp}°F</h5>
          <h5 class="temp-min">Low: ${minTemp}°F</h5>
          <div class="humidity card-text">Humidity: ${humidity}%</div>
          <div class="wind card-text">Wind speed: ${wind} km/h</div>
          <div class="sunrise card-text">Sunrise ${sunriseTime(value.sunrise)}</div>
          <div class="sunset card-text">Sunset ${sunsetTime(value.sunset)}</div>
        </div>
      </div>`;
      cardRow.insertAdjacentHTML('beforeend', fday);
    }
  });
}