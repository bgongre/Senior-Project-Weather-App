var mainApp = {};
(function(){
var mainContainer = document.getElementById("main_container");

    var logtout =  function(){
      //logout function, once log out then go to login.html  "Xiaodong Huang"
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("login.html");
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
          console.log("redirect");
          window.location.replace("login.html");
        }
      });
}
    
init();

mainApp.logout = logtout;
})();