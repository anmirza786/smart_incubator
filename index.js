firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_para").innerHTML =
        "Welcome User : " + email_id;
    }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});
let updates;
function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorCode);
    });
}

function logout() {
  firebase.auth().signOut();
}

var Temp, Hum;

// function ready() {
//   Temp = document.getElementById("temp").value;
//   Hum = document.getElementById("hum").value;
// }

function getData() {
  // ready();
  console.log(123);
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      document.getElementById("temp").innerHTML = snapshot.val().temperature;
      document.getElementById("hum").innerHTML = snapshot.val().humidity;
      document.getElementById("tmax").innerHTML = snapshot.val().Tmax;
      document.getElementById("tmin").innerHTML = snapshot.val().Tmin;
      document.getElementById("hmin").innerHTML = snapshot.val().Hmin;
      document.getElementById("hmax").innerHTML = snapshot.val().Hmax;
    });
}
function getTmin() {
  document.getElementById("tmin").style.display = "none";
  document.getElementById("btntmin").style.display = "none";
  document.getElementById("settmin").style.display = "block";
  document.getElementById("tminsave").style.display = "block";
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      document.getElementById("settmin").value = snapshot.val().Tmin;
    });
}
function TminSave() {
  document.getElementById("tmin").style.display = "block";
  document.getElementById("btntmin").style.display = "block";
  document.getElementById("settmin").style.display = "none";
  document.getElementById("tminsave").style.display = "none";
  let tmin = document.getElementById("settmin").value;
  let Tmin;
  updates = {
    Tmin: tmin,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
  alert("TMin Updated");
}
function getTmax() {
  document.getElementById("tmax").style.display = "none";
  document.getElementById("btntmax").style.display = "none";
  document.getElementById("settmax").style.display = "block";
  document.getElementById("tmaxsave").style.display = "block";
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      document.getElementById("settmax").value = snapshot.val().Tmax;
    });
}
function TmaxSave() {
  document.getElementById("tmax").style.display = "block";
  document.getElementById("btntmax").style.display = "block";
  document.getElementById("settmax").style.display = "none";
  document.getElementById("tmaxsave").style.display = "none";
  let settmax = document.getElementById("settmax").value;
  let Tmax;
  updates = {
    Tmax: settmax,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
  console.log(document.getElementById("settmax").value);
  alert("TMax Updated");
}
function getHmax() {
  document.getElementById("hmax").style.display = "none";
  document.getElementById("btnhmax").style.display = "none";
  document.getElementById("sethmax").style.display = "block";
  document.getElementById("hmaxsave").style.display = "block";
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      document.getElementById("sethmax").value = snapshot.val().Hmax;
    });
}
function HmaxSave() {
  document.getElementById("hmax").style.display = "block";
  document.getElementById("btnhmax").style.display = "block";
  document.getElementById("sethmax").style.display = "none";
  document.getElementById("hmaxsave").style.display = "none";
  let hmax = document.getElementById("sethmax").value;
  let Hmax;
  updates = {
    Hmax: hmax,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
  alert("HMax Updated");
}
function getHmin() {
  document.getElementById("hmin").style.display = "none";
  document.getElementById("btnhmin").style.display = "none";
  document.getElementById("sethmin").style.display = "block";
  document.getElementById("hminsave").style.display = "block";
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      document.getElementById("sethmin").value = snapshot.val().Hmin;
    });
}
function HminSave() {
  document.getElementById("hmin").style.display = "block";
  document.getElementById("btnhmin").style.display = "block";
  document.getElementById("sethmin").style.display = "none";
  document.getElementById("hminsave").style.display = "none";
  let hmin = document.getElementById("sethmin").value;
  let Hmin;
  updates = {
    Hmin: hmin,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
  alert("HMin Updated");
}
function toTable(temp, hum, date, time) {
  let ul = document.getElementById("data");
  let _temp = document.createElement("li");
  let _hum = document.createElement("li");
  let _date = document.createElement("li");
  let _time = document.createElement("li");
  _temp.innerHTML = "Temprature: " + temp;
  _hum.innerHTML = "Humidity: " + hum;
  _date.innerHTML = "Date: " + date;
  _time.innerHTML = "Time: " + time;
  ul.appendChild(_temp);
  ul.appendChild(_hum);
  ul.appendChild(_date);
  ul.appendChild(_time);
}

function getHistory() {
  console.log(1);
  firebase
    .database()
    .ref("History")
    .once("value", function (snapshot) {
      snapshot.forEach(function (ChildSnapshot) {
        let temp = ChildSnapshot.val().Temperature;
        let hum = ChildSnapshot.val().Humidity;
        let time = ChildSnapshot.val().Time;
        let date = ChildSnapshot.val().Date;

        toTable(temp, hum, date, time);
      });
    });
}
function timedRefresh(time) {
  setTimeout(() => {
    document.getElementById("temp").reload(true);
    document.getElementById("tmax").reload(true);
    document.getElementById("tmin").reload(true);
    document.getElementById("hmax").reload(true);
    document.getElementById("hmin").reload(true);
    document.getElementById("hum").reload(true);
  }, time);
}
(() => {
  timedRefresh(10000);
})();

setTimeout(function () {
  getData();
}, 0);
