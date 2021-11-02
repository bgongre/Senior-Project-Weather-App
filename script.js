//Get elementByID loca so we can add text to it "Xiaodong Huang".
var x = document.getElementById("lat");
var y = document.getElementById("long");

// forecast display elements
let cityName = document.getElementsByClassName("cityName");
let forecastCity = document.getElementsByClassName("forecity");
let weatherIcon = document.getElementsByClassName("icon");
let weatherDescription = document.getElementsByClassName("description");
let weatherTemp = document.getElementsByClassName("temp");
let weatherFeelsLike = document.getElementsByClassName("feels-like");
let weatherHumidity = document.getElementsByClassName("humidity");
let windSpeed = document.getElementsByClassName("wind");
let weatherVisibility = document.getElementsByClassName("visibility");
let citySunrise = document.getElementsByClassName("sunrise");
let citySunset = document.getElementsByClassName("sunset");

// variables created for use with the Add and Remove button functionality. -Brittani Gongre-
let searchFieldNum = 1;
let attributeName = "cityLoc";
let citySearchInput = document.getElementsByClassName("city-search-input");
let cityTextInput = document.querySelector(".form-control");
let searchFunctionContainer = document.getElementById("search-field-container");
let weatherInformationContainer = document.getElementById("weather-information-container");
let weatherInformationDiv = document.getElementById("weather-information");
let addBtn = document.getElementById("add-btn");
let removeBtn = document.getElementById("remove-btn");
let cardRow = document.getElementById("card-row");

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
  console.log(data);
  let {name} = data;

  let {
    icon,
    description
  } = data.weather[0];

  let {
    temp,
    humidity, 
    feels_like
  } = data.main;

  let {speed} = data.wind;
  let {visibility} = data;
  let {sunrise} = data.sys;
  let {sunset} = data.sys;
  let {lon} = data.coord;
  let {lat} = data.coord;
  cityName[0].innerText = "Weather in " + name;
  forecastCity[0].innerText = "Forecast in " + name;
  weatherIcon[0].src = "https://openweathermap.org/img/wn/" + icon + ".png";
  weatherDescription[0].innerText = description;
  weatherTemp[0].innerText = Math.round(temp) + "°F";
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
}

// broke these out of the above code block to make it reusable later on when creating new cards
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

// copy the current search field and append it to the weather-information-container div when the
// method is called. -Brittani Gongre-
let createNewSearchField = () => {
  let addSearchField = searchFunctionContainer.cloneNode(true);
  weatherInformationContainer.appendChild(addSearchField);
  addSearchField.setAttribute("id", "removeable-search-field");
  cityTextInput.setAttribute("class", `form-control cityLoc${searchFieldNum}`);
  cityTextInput.classList.remove("cityLoc");
  attributeName = `cityLoc${searchFieldNum}`;
  searchFieldNum++;
}

// function will make the Remove button visible once a new weather option is added
// a new weather option will be copied from the original and appended to the end of the 
// 'weather-information-container' div. Also, added the 'removeable-weather' id to identify
// the copies. -Brittani Gongre-

// WIP **check here for remove button issue**
let createNewWeather = () => {
  let addWeather = weatherInformationDiv.cloneNode(true);
  weatherInformationContainer.appendChild(addWeather);
  addWeather.setAttribute("id", "removeable-weather");
  clearWeatherAttributes();
  removeSearchField();

  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Remove";
  removeBtn.classList.add("btn", "btn-default");
  removeBtn.setAttribute("id", "removeBtn");
  removeBtn.style.marginTop = "30px";
  removeBtn.style.paddingLeft = "20px";
  removeBtn.style.paddingRight = "20px";
  addWeather.appendChild(removeBtn);
  removeBtn.addEventListener("click", removeWeather);
}

// removes previous weather attributes from the card -Brittani Gongre-
let clearWeatherAttributes = () => {
  cityName[0].innerText = " ";
  weatherIcon[0].innerText = " ";
  weatherDescription[0].innerText = " ";
  weatherTemp[0].innerText = " ";
  weatherFeelsLike[0].innerText = "Feels like: ";
  weatherHumidity[0].innerText = "Humidity: ";
  windSpeed[0].innerText = "Wind speed: ";
  weatherVisibility[0].innerText = "visibility: ";
  citySunrise[0].innerText = "sunrise: ";
  citySunset[0].innerText = "sunset: ";
}

// WIP **break out the remove button**
// let createRemoveButton = () => {
//   let removeBtn = document.createElement("button");
//   removeBtn.innerHTML = "Remove";
//   removeBtn.classList.add("btn", "btn-default");
//   removeBtn.setAttribute("id", "removeBtn");
//   removeBtn.style.marginTop = "30px";
//   removeBtn.style.paddingLeft = "20px";
//   removeBtn.style.paddingRight = "20px";
//   addWeather.appendChild(createRemoveButton());
//   removeBtn.addEventListener("click", removeWeather);
// }

// let appendRemoveButton = (parentElementId, childElementId) => {
//   document.getElementById(parentElementId).appendChild(childElementId);
// }

// function checks to see if 'weather-information-container' and if it does it will remove them
// one by one. If all the 'removable-weather' copies are gone, the 'weather-information-container' 
// child node length will be 3. It will leave one single weather search on the page. -Brittani Gongre-
let removeWeather = () => {
  let removableWeatherInformationDiv = document.getElementById("removeable-weather");
  if (weatherInformationContainer.hasChildNodes() && weatherInformationContainer.childNodes.length > 3) {
    removableWeatherInformationDiv.parentNode.removeChild(removableWeatherInformationDiv);
  }
}

// removes the previous search field when a new card is added. -Brittani Gongre-
let removeSearchField = () => {
  let removeableSearchField = document.querySelectorAll("#removeable-search-field");
  removeableSearchField.forEach(element => element.innerHTML = "");
}

// event listener for the add button that creates a new search field and a new weather card. -Brittani Gongre-
addBtn.addEventListener("click", () => {
  createNewSearchField();
  createNewWeather();
});
// removeBtn.addEventListener("click", removeWeather);

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
  var fday = "";
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
      let description = value.weather[0].description;
      let humidity = value.humidity;
      let wind = value.wind_speed;
      // let visibility = value. **can't find this in the json**
      let fday = `<div id="days" class="col">
      <div class="card">
        <div class="weekday-name">${dayname}</div>
        <div class="description card-subtitle">${description}</div>
        <div class="pics">
          <img src=${disCon} alt="weather icon" class="${icon} icon card-img-top" />
        </div>
        <div class="card-body">
          <div class="temp card-title">${temp}°F</div>
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





  
  tileNEX = new google.maps.ImageMapType({
            getTileUrl: function(tile, zoom) {
                return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
            },
            tileSize: new google.maps.Size(256, 256),
            opacity:0.60,
            name : 'NEXRAD',
            isPng: true
        });
        map.overlayMapTypes.setAt("1",tileNEX);

        goes = new google.maps.ImageMapType({
            getTileUrl: function(tile, zoom) {
                return "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes-east-vis-1km-900913/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
            },
            tileSize: new google.maps.Size(256, 256),
            opacity:0.60,
            name : 'GOES East Vis',
            isPng: true
        });
        

     
        
  //Making radar move
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
        map.overlayMapTypes.push(null);
        map.overlayMapTypes.setAt("0", tileNEX);
      } else{
        map.overlayMapTypes.clear();
      }
      