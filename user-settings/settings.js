let fname = document.getElementById('FirstName');
let lname = document.getElementById('LastName');
let uname = document.getElementById('Username');
let pword = document.getElementById('Password');
let birth = document.getElementById('DateOfBirth');
let updateBtn = document.getElementById('update');

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

function update(){
  writeNewPost(1, lemondrop, something.gif, something, whatever);
  // userInfo.firstName = fname.value;
  // userInfo.lastName = lname.value;
  // userInfo.email = uname.value;
  // userInfo.password = pword.value;

  // database.ref('users/' +uname).update({
  //   firstName: fname,
  //   lastName: lname,
  //   userName: uname,
  //   password: pword,
  //   dateOfBirth: birth
  // });
}
  
  function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
      author: username,
      uid: uid,
      body: body,
      title: title,
      starCount: 0,
      authorPic: picture
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }

  updateBtn.addEventListener("click", update);
