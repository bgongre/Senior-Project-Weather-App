  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
  import { getDatabase, ref, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  /* Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDbDPVmyCGWItkyTIsDSS9hvYvUrSIPG8Y",
      authDomain: "senior-project-weather-a-2f0e4.firebaseapp.com",
  databaseURL: "https://senior-project-weather-a-2f0e4-default-rtdb.firebaseio.com/",
      projectId: "senior-project-weather-a-2f0e4",
      storageBucket: "senior-project-weather-a-2f0e4.appspot.com",
      messagingSenderId: "619155365766",
      appId: "1:619155365766:web:d1f57996d24196cc521607"
    };

  // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();*/


var billAddress = document.getElementById("billAddress").value;
 var fname = document.getElementById("firstName").value;
 var lname = document.getElementById("lastName").value;
 var cardNum = document.getElementById("cardNumber").value;
 var cardDate = document.getElementById("cardDate").value;
 var cvv = document.getElementById("CVV").value;

 let uid = firebase.auth().currentUser.uid
 console.log(uid);


 document.getElementById("completePaymentMonthly").addEventListener("click",  function premiumSignUp() {
      set(ref(db, "users/" + uid), {
   billingAdd: billAddress.value,
   firstName: fname.value,
   lastName: lname.value,
   cardNamber: cardNum.value,
   cardDate: cardDate.value,
   cvv: cvv.value,
 })
     .then(()=>{
        alert("Payment Complete")
     })
     .catch((error) =>{
        alert("fail " + error)
     });
   })


   document.getElementById("completePaymentAnnually").addEventListener("click",  function premiumSignUp() {
         set(ref(db, "users/" + uid), {
      billingAdd: billAddress.value,
      firstName: fname.value,
      lastName: lname.value,
      cardNamber: cardNum.value,
      cardDate: cardDate.value,
      cvv: cvv.value,
    })
        .then(()=>{
           alert("Payment Complete")
        })
        .catch((error) =>{
           alert("fail " + error)
        });
      })
