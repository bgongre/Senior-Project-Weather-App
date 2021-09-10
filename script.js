//Get elementByID loca so we can add text to it "Xiaodong Huang".
var x = document.getElementById("loca");
//get user's location and display "Xiaodong Huang"
function getLocation() { 
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    x.innerHTML = "Your location is: " + position.coords.latitude  + "  ,   "+ position.coords.longitude;
  }
  window.onload = function() {
    getLocation();
  }

//getting the value user search "Xiaodong Huang"
function search() {
    weather.fetchWeather(document.getElementsByClassName("cityLoc")[0].value);
  }

//add eventlistener, onclick to the button get the value user input. "Xiaodong Huang"
  document.querySelector(".search button").addEventListener("click", function () {
        search();
  });
//when user press enter call the search function.  "Xiaodong Huang"
  document.querySelector(".cityLoc").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
            search();
      }
    });

//Connect to the api, and get the data to json "Xiaodong Huang"
  let weather = {
    apiKey: "a4ba445616b05d69a1302b0cad41b887",
    //function take a city name, then fetch it from api "Xiaodong Huang"
    fetchWeather: function (city) { 
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" +city +"&units=Imperial&appid=" +this.apiKey)
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
    function displayWeather(data) {
        let { name } = data;
        let { icon, description } = data.weather[0];
        let { temp,  humidity } = data.main;
        let { speed } = data.wind;
        let { visibility } = data;
        let { sunrise } = data.sys;
        let { sunset } = data.sys;
        document.getElementsByClassName("cityName")[0].innerText = "Weather in " + name;
        document.getElementsByClassName("icon")[0].src ="https://openweathermap.org/img/wn/" + icon + ".png";
        document.getElementsByClassName("description")[0].innerText = description;
        document.getElementsByClassName("temp")[0].innerText = temp + "°F";
        document.getElementsByClassName("humidity")[0].innerText ="Humidity: " + humidity + "%";
        document.getElementsByClassName("wind")[0].innerText ="Wind speed: " + speed + " km/h";
        document.getElementsByClassName("visibility")[0].innerText ="visibility: " + visibility;
        var date = new Date(sunrise * 1000);
        var timestr = date.toLocaleTimeString();
        document.getElementsByClassName("sunrise")[0].innerText ="sunrise: " +  timestr;
        var date = new Date(sunset * 1000);
        var timestr = date.toLocaleTimeString();
        document.getElementsByClassName("sunset")[0].innerText ="sunset: " + timestr;
      }



  
  
 