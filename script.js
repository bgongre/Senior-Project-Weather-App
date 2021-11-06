//Get elementByID loca so we can add text to it "Xiaodong Huang".
var x = document.getElementById("lat");
var y = document.getElementById("long");

// forecast display elements
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

// object that holds key value pairs of the searched locations. -Brittani Gongre-
let savedForecastLocations = {};

//get user's location and display "Xiaodong Huang"
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  x.innerHTML = lat;
  y.innerHTML = long;
  Geoweather.fetchWeather(lat, long);
}

window.onload = function () {
  var lat;
  var long;
  getLocation()
}

//getting the value user search "Xiaodong Huang"
// added 'attributeName' to help make this function dynamic.
// 'attributeName' is updated when a new weather location is added and allows for a new location to be searched -Brittani Gongre-
function search() {
  weather.fetchWeather(document.getElementsByClassName(attributeName)[0].value);
}

//add eventlistener, onclick to the button get the value user input. "Xiaodong Huang"
// same as above, edited this function to be dynamic for when new weather information is added -Brittani Gongre-
document.querySelector(".search").addEventListener("click", function () {
  search(attributeName);
  removefore();
});

//when user press enter call the search function.  "Xiaodong Huang"
// same as above, edited this function to be dynamic for when new weather information is added -Brittani Gongre-
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
// refactored below to have all DOM selectors appear at top of the page for easy readability and reuse -Brittani Gongre-
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

// clones the current weather information card (div) and appends it to the dashboard.
// Also, the attributes on the new card will be cleared. 
let createNewWeather = () => {
  let addWeather = weatherInformationDiv.cloneNode(true);
  document.getElementById("additional-weather-container").appendChild(addWeather);
  addWeather.setAttribute("id", "removeable-weather");
  clearWeatherAttributes();
}

// removes previous weather attributes from the card -Brittani Gongre-
let clearWeatherAttributes = () => {
  cityName[0].innerText = " ";
  weatherIcon[0].innerText = " ";
  weatherDescription[0].innerText = " ";
  weatherTemp[0].innerText = " ";
  weatherTempMin[0].innerText = " ";
  weatherFeelsLike[0].innerText = "Feels like: ";
  weatherHumidity[0].innerText = "Humidity: ";
  windSpeed[0].innerText = "Wind speed: ";
  weatherVisibility[0].innerText = "visibility: ";
  citySunrise[0].innerText = "sunrise: ";
  citySunset[0].innerText = "sunset: ";
}

// additional div that the remove button can be appended to -Brittani Gongre-
let createAdditionalWeatherContainer = () => {
  let addWeatherContainer = document.createElement("div");
  addWeatherContainer.classList.add("text-center");
  addWeatherContainer.setAttribute("id", "additional-weather-container");
  weatherInformationContainer.appendChild(addWeatherContainer);
}

// dynamically create a remove button that can be added to additional weather cards
let createRemoveButton = () => {
  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Remove";
  removeBtn.classList.add("btn", "btn-default", "remove-btn" + searchFieldNum);
  removeBtn.setAttribute("id", "remove-btn");
  removeBtn.style.marginTop = "30px";
  removeBtn.style.paddingLeft = "30px";
  removeBtn.style.paddingRight = "30px";
  document.getElementById("additional-weather-container").appendChild(removeBtn);
  searchFieldNum++;
}

let createEventListenerForRemoveButtons = () => {
  let removeBtn = document.querySelector(`.remove-btn1`);
  removeBtn.addEventListener("Click", () => {
    removeBtn.previousElementSibling = " ";
    console.log("clicked");
  });

// function checks to see if 'weather-information-container' and if it does it will remove them
// one by one. If all the 'removable-weather' copies are gone, the 'weather-information-container' 
// child node length will be 3. It will leave one single weather search on the page. -Brittani Gongre-
// let removeWeather = (event) => {
//   if(event.target === document.getElementById("remove-btn") && document.getElementById("remove-btn").hasClass("remove-btn")) {
//     console.log("True: ", document.getElementById("remove-btn").getAttribute("class"));
//   } else {
//     console.log("False: ", document.getElementById("remove-btn").getAttribute("class"));
//   }

  // let removableWeatherInformationDiv = document.getElementById("removeable-weather");
  // if (weatherInformationContainer.hasChildNodes() && weatherInformationContainer.childNodes.length > 3) {
  //   removableWeatherInformationDiv.parentNode.removeChild(removableWeatherInformationDiv);
  // }
}

// event listener for the add button that creates a new weather container div for the new weather card
// creates the new weather card
// and creates the remove button for the card. -Brittani Gongre-
addBtn.addEventListener("click", () => {
  createAdditionalWeatherContainer();
  createNewWeather();
  createRemoveButton();
  createEventListenerForRemoveButtons();
  clearfore();
});

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


var map;
var i = 0;
var radaranim;
//Set up the innit time
var timestamps = ['900913-m50m', '900913-m45m', '900913-m40m', '900913-m35m', '900913-m30m', '900913-m25m', 
    '900913-m20m', '900913-m15m', '900913-m10m', '900913-m05m', '900913'];

//first set up the google map for the radar "Xiaodong Huang" reference "https://developers.google.com/maps/documentation/javascript/overview"
function initMap() {
  //get user's location and set it to center "Xiaodong Huang"
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        centerUser = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(centerUser);

    });
  } 
    // Create map
    map = new google.maps.Map($('#map')[0], {
      zoom: 9,
    });
}

// Animate the Weather Radar, each time is call increase the timesteamps i "Xiaodong Huang" reference "http://mesonet.agron.iastate.edu/ogc/?fbclid=IwAR2oWMf9JWquzs9hRzRNY-9U7HN_z5GXcCszBsKXtKjtm-8H3GMIXOJJ1gQ"
function startAnimation(){
    tileNEX = new google.maps.ImageMapType({
      getTileUrl: function(tile, zoom) {
          return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-" + timestamps[i] + "/" + zoom + "/" + tile.x + "/" + tile.y +".png"; 
      },
      tileSize: new google.maps.Size(256, 256),
      opacity:0.60,
      name : 'NEXRAD',
      isPng: true
    });
    map.overlayMapTypes.setAt("0", tileNEX);
    i++;
    if (i > 10 ){
      i = 0;
    }
}
radaranim = setInterval(startAnimation, 500); //call the function "Xiaodong Huang"  
  //create empty overlay entery, if 0 set, if not 0 clear the tile "Xiaodong Huang" reference "http://mesonet.agron.iastate.edu/ogc/?fbclid=IwAR2oWMf9JWquzs9hRzRNY-9U7HN_z5GXcCszBsKXtKjtm-8H3GMIXOJJ1gQ"
  if(map.overlayMapTypes.length == 0){
        tileNEX = new google.maps.ImageMapType({
          getTileUrl: function(tile, zoom) {
            debugger;
              return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-" + timestamps[i] + "/" + zoom + "/" + tile.x + "/" + tile.y +".png"; 
          },
          tileSize: new google.maps.Size(256, 256),
          opacity:0.60,
          name : 'NEXRAD',
          isPng: true
        });
        map.overlayMapTypes.push(null); // create empty overlay entry
        map.overlayMapTypes.setAt("0", tileNEX);
      } else{
        map.overlayMapTypes.clear();
      }
    
