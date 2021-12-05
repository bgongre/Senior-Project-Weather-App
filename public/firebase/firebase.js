var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
  //firebase API Key  "Xiaodong Huang"
  // Added databaseURL information -Brittani Gongre
    apiKey: "AIzaSyDbDPVmyCGWItkyTIsDSS9hvYvUrSIPG8Y",
    authDomain: "senior-project-weather-a-2f0e4.firebaseapp.com",
    databaseURL: "https://senior-project-weather-a-2f0e4-default-rtdb.firebaseio.com/",
    projectId: "senior-project-weather-a-2f0e4",
    storageBucket: "senior-project-weather-a-2f0e4.appspot.com",
    messagingSenderId: "619155365766",
    appId: "1:619155365766:web:d1f57996d24196cc521607"
  };
  
  // Added database reference -Brittani Gongre
if(!hasInit){
    firebase.initializeApp(config);
    database = firebase.database();
    hasInit = true; 
}
