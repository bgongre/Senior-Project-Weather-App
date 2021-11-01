var fireBase = fireBase || firebase;
var hasInit = false;
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

function goPremium(){
  
}
function Ready(){
  var userFname = document.getElementById('FirstName').value;
  var userLname = document.getElementById('LastName').value;
  var userPass = document.getElementById('Password').value;
  var userDoB = document.getElementById('Date of Birth').value;
}

document.getElementById("update").onclick = function(){
  Ready();
  firebase.database().ref('user/').update({
    FirstName: userFname,
    LastName: userLastName,
    Pass: userPass,
    DateOfBirth: userDoB
  });
}
