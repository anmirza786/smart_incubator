var loginuser;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "flex";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_para").innerHTML =
        "Welcome User : " + email_id;
      loginuser = "Welcome User : " + email_id;
      document.getElementById("user_para").style.margin = "0";
    }
  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "flex";
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
  location.replace = "states.html";
}

var Temp, Hum;

// function ready() {
//   Temp = document.getElementById("temp").value;
//   Hum = document.getElementById("hum").value;
// }
function setprogressbar() {
  let progresstempdiv = parseInt(maxtemp) - parseInt(mintemp);
  let progresstemp =
    (parseInt(temprature) - parseInt(mintemp)) / progresstempdiv;
  let protemp = progresstemp * 100;
  let div = protemp + "px";
  document.getElementById("tempprogress").style.width = div;
  document.getElementById("tempprogress").style.height = div;
  let progresshumdiv = parseInt(maxhum) - parseInt(minhum);
  let progresshum = (parseInt(humidity) - parseInt(minhum)) / progresshumdiv;
  let prohum = progresshum * 100;
  let divhum = prohum + "px";
  document.getElementById("humprogress").style.width = divhum;
  // console.log(progresshum, progresstemp);
  document.getElementById("humprogress").style.height = divhum;
}
var temprature;
var humidity;
var maxtemp;
var mintemp;
var maxhum;
var minhum;

function getData() {
  // ready();
  console.log(123);
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      document.getElementById("temp").innerHTML = snapshot.val().temperature;
      temprature = snapshot.val().temperature;
      document.getElementById("hum").innerHTML = snapshot.val().humidity;
      humidity = snapshot.val().humidity;
      document.getElementById("tmax").innerHTML = snapshot.val().Tmax;
      maxtemp = snapshot.val().Tmax;
      document.getElementById("tmin").innerHTML = snapshot.val().Tmin;
      mintemp = snapshot.val().Tmin;
      document.getElementById("hmin").innerHTML = snapshot.val().Hmin;
      minhum = snapshot.val().Hmin;
      document.getElementById("hmax").innerHTML = snapshot.val().Hmax;
      maxhum = snapshot.val().Hmax;
      document.getElementById("temp").style.marginBottom = "0";
      document.getElementById("hum").style.marginBottom = "0";
      document.getElementById("tmax").style.marginBottom = "0";
      document.getElementById("tmin").style.marginBottom = "0";
      document.getElementById("hmin").style.marginBottom = "0";
      document.getElementById("hmax").style.marginBottom = "0";
      setprogressbar();
    });
}

var tempmin;
function getTmin() {
  document.getElementById("tmin").style.display = "block";
  document.getElementById("tminsave").style.display = "block";
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      tempmin = snapshot.val().Tmin;
    });
}
function TminIncSave() {
  getTmin();
  tempmin = parseInt(tempmin);
  let tmin = tempmin + 1;
  let Tmin;
  updates = {
    Tmin: tmin,
  };
  firebase.database().ref("FirebaseIOT").update(updates);

  getTmin();
}
function TminDecSave() {
  getTmin();
  tempmin = parseInt(tempmin);
  let tmin = tempmin - 1;
  let Tmin;
  updates = {
    Tmin: tmin,
  };
  firebase.database().ref("FirebaseIOT").update(updates);

  getTmin();
}
var tempmax;
function getTmax() {
  document.getElementById("tmax").style.display = "block";
  document.getElementById("tmaxsave").style.display = "block";
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      tempmax = snapshot.val().Tmax;
    });
}
function TmaxIncSave() {
  getTmax();
  tempmax = parseInt(tempmax);
  let settmax = tempmax + 1;
  let Tmax;
  updates = {
    Tmax: settmax,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
}
function TmaxDecSave() {
  getTmax();
  tempmax = parseInt(tempmax);
  let settmax = tempmax - 1;
  let Tmax;
  updates = {
    Tmax: settmax,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
}
var hummax;
function getHmax() {
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      hummax = snapshot.val().Hmax;
    });
}
function HmaxIncSave() {
  getHmax();
  let hmax = parseInt(hummax) + 1;
  let Hmax;
  updates = {
    Hmax: hmax,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
}
function HmaxDecSave() {
  getHmax();
  let hmax = parseInt(hummax) - 1;
  let Hmax;
  updates = {
    Hmax: hmax,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
}
var hummin;
function getHmin() {
  firebase
    .database()
    .ref("FirebaseIOT")
    .on("value", function (snapshot) {
      hummin = snapshot.val().Hmin;
    });
}
function HminIncSave() {
  getHmin();
  let hmin = parseInt(hummin) + 1;
  let Hmin;
  updates = {
    Hmin: hmin,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
}
function HminDecSave() {
  getHmin();
  let hmin = parseInt(hummin) - 1;
  let Hmin;
  updates = {
    Hmin: hmin,
  };
  firebase.database().ref("FirebaseIOT").update(updates);
}
var tbody = document.getElementById("data");
function toTable(temp, hum, date, time) {
  let tr = document.createElement("tr");
  let _temp = document.createElement("td");
  let _hum = document.createElement("td");
  let _date = document.createElement("td");
  let _time = document.createElement("td");
  _temp.innerHTML = temp;
  _hum.innerHTML = hum;
  _date.innerHTML = date;
  _time.innerHTML = time;
  tbody.appendChild(tr);
  tr.appendChild(_temp);
  tr.appendChild(_hum);
  tr.appendChild(_date);
  tr.appendChild(_time);
}
function toHistoryArray(History) {
  tbody.innerHTML = "";
  History.forEach((element) => {
    toTable(element.Temperature, element.Humidity, element.Date, element.Time);
  });
}
function toDataTable() {
  let table = new DataTable("#history_data", {
    dom: "Bfrtip",
    buttons: ["copy", "csv", "excel"],
  });
}
function getHistory() {
  var history = [];
  console.log(1);
  firebase
    .database()
    .ref("History")
    .on("value", function (snapshot) {
      snapshot.forEach(function (ChildSnapshot) {
        history.push(ChildSnapshot.val());
      });
      toHistoryArray(history);
      toDataTable();
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
