// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDbDPVmyCGWItkyTIsDSS9hvYvUrSIPG8Y",
//   authDomain: "senior-project-weather-a-2f0e4.firebaseapp.com",
//   databaseURL: "https://senior-project-weather-a-2f0e4-default-rtdb.firebaseio.com/",
//   projectId: "senior-project-weather-a-2f0e4",
//   storageBucket: "senior-project-weather-a-2f0e4.appspot.com",
//   messagingSenderId: "619155365766",
//   appId: "1:619155365766:web:d1f57996d24196cc521607"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase();

var fname = document.getElementById('FirstName');
var lname = document.getElementById('LastName');
var uname = document.getElementById('Username');
var birth = document.getElementById('DateOfBirth');

let uid = getauth().currentUser.uid
console.log(uid);

document.getElementById("update").addEventListener("click", function writeUserData() {
  set(ref(db, "users/" + uid), {
      premium: false,
      fname: fname.value,
      lname: lname.value,
      uname: uname.value,
      birth: birth.value,
    })
    .then(() => {
      alert("data save")
    })
    .catch((error) => {
      alert("fail " + error)
    });
});