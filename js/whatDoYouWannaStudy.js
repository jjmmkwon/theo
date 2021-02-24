//Prepare data
let queryString = location.search.substring(1);
let data = queryString.split("|");

var uuid;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const btn1 = document.getElementById("btn-section1");
const btn2 = document.getElementById("btn-section2");
const btn3 = document.getElementById("btn-section3");

$(".btn-section1")[0].addEventListener("click", writeToFirebaseAndMoveOnToFoundation);
$(".btn-section2")[0].addEventListener("click", writeToFirebaseAndMoveOnToSingleVarEquation);
$(".btn-section3")[0].addEventListener("click", writeToFirebaseAndMoveOnToTwoVarEquation);

getUUID()


function getUUID() {
  if (localStorage.getItem("uuid") === null) {
    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
  } else {
    uuid = localStorage.getItem("uuid")
  }
}

function writeToFirebaseAndMoveOnToFoundation() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  var now = new Date().toLocaleString();

  firebase.database().ref('mvp_1_1/' + 'users/' + uuid + '/whatDoYouWannaStudy/').update({
    timeSpent: timeSpentOnPage,
    at: now,
    wannaStudy : btn1.innerHTML,
  }, function(error) {
    if (error) {
      moveOnTo('foundation')
    } else {
      moveOnTo('foundation')
    }
  });
}

function writeToFirebaseAndMoveOnToSingleVarEquation() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  var now = new Date().toLocaleString();

  firebase.database().ref('mvp_1_1/' + 'users/' + uuid + '/whatDoYouWannaStudy/').update({
    timeSpent: timeSpentOnPage,
    at: now,
    wannaStudy : btn2.innerHTML,
  }, function(error) {
    if (error) {
      moveOnTo('singleVarEquation')
    } else {
      moveOnTo('singleVarEquation')
    }
  });
}

function writeToFirebaseAndMoveOnToTwoVarEquation() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  var now = new Date().toLocaleString();

  firebase.database().ref('mvp_1_1/' + 'users/' + uuid + '/whatDoYouWannaStudy/').update({
    timeSpent: timeSpentOnPage,
    at: now,
    wannaStudy : btn3.innerHTML,
  }, function(error) {
    if (error) {
      moveOnTo('twoVarEquation')
    } else {
      moveOnTo('twoVarEquation')
    }
  });
}

function moveOnTo(next) {
  console.log("next is", next)
}
