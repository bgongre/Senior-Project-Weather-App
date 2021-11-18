
var config = {
  //firebase API Key  "Xiaodong Huang"
    apiKey: "AIzaSyDbDPVmyCGWItkyTIsDSS9hvYvUrSIPG8Y",
    authDomain: "senior-project-weather-a-2f0e4.firebaseapp.com",
    projectId: "senior-project-weather-a-2f0e4",
    storageBucket: "senior-project-weather-a-2f0e4.appspot.com",
    messagingSenderId: "619155365766",
    appId: "1:619155365766:web:d1f57996d24196cc521607"
  };
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
}

var database = firebase.database();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  Geoweather.fetchWeather(lat, long);
  alert('This is your latitude: ', lat);
  alert('This is your longitude: ', long);
}


function update(){
  var fname = document.getElementById('FirstName').value;
  var lname = document.getElementById('LastName').value;
  var uname = document.getElementById('Username').value;
  var pword = document.getElementById('Password').value;
  var birth = document.getElementById('DateOfBirth').value;

  database.ref('users/' +uname).update({
    firstName: fname,
    lastName: lname,
    userName: uname,
    password: pword,
    dateOfBirth: birth
  })

  alert("Your changes have been updated");
}

  updateBtn.addEventListener("click", update());
