var config = {
  //firebase API Key  "Xiaodong Huang"
    apiKey: "AIzaSyDbDPVmyCGWItkyTIsDSS9hvYvUrSIPG8Y",
    authDomain: "senior-project-weather-a-2f0e4.firebaseapp.com",
    projectId: "senior-project-weather-a-2f0e4",
    storageBucket: "senior-project-weather-a-2f0e4.appspot.com",
    messagingSenderId: "619155365766",
    appId: "1:619155365766:web:d1f57996d24196cc521607"
  };

    firebase.initializeApp(config);

function signUpMonthly(){
var billAddress = document.getElementById("billAddress").value;
 var fname = document.getElementById("FirstName").value;
 var lname = document.getElementById("LastName").value;
 var cardNum = document.getElementById("CardNum").value;
 var cardDate = document.getElementById("CardDate").value;
 var cvv = document.getElementById("CVV").value;

 database.ref('users/').set({
   billingAdd: billAddress,
   firstName: fname,
   lastName: lname,
   cardNamber: cardNum,
   cardDate: cardDate,
   cvv: cvv
 })

alert("Payment complete");
}

function signUpAnnually(){
  var billAddress = document.getElementById("billAddress").value;
  var fname = document.getElementById("FirstName").value;
  var lname = document.getElementById("LastName").value;
  var cardNum = document.getElementById("CardNum").value;
  var cardDate = document.getElementById("CardDate").value;
  var cvv = document.getElementById("CVV").value;

  database.ref('users/').set({
    billingAdd: billAddress,
    firstName: fname,
    lastName: lname,
    cardNamber: cardNum,
    cardDate: cardDate,
    cvv: cvv
  })

  alert("Payment complete");
}
