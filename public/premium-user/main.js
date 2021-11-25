var mainApp = {};
(function(){
var mainContainer = document.getElementById("main_container");

    var logout =  function(){
      //logout function, once log out then go to login.html  "Xiaodong Huang"
        firebase.auth().signOut().then(function(){
            window.location.replace("../index.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //User is signed in. then it will stay sign in  "Xiaodong Huang"
          mainContainer.style.display = "";
        } else {
          // No user is signed in. can't see the index page  "Xiaodong Huang"
          mainContainer.style.display = "none";
          window.location.replace("../index.html");
        }
      });
}
    
init();

mainApp.logout = logout;
})();