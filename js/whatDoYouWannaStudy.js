//Prepare data
let queryString = location.search.substring(1);
let data = queryString.split("|");

var uuid;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const btn1 = document.getElementById("btn-section1");
const btn2 = document.getElementById("btn-section2");
const btn3 = document.getElementById("btn-section3");
const btnsDiv = document.getElementById("btn-div");

$(".btn-section1")[0].addEventListener("click", writeToFirebaseAndMoveOnToFoundation);
$(".btn-section2")[0].addEventListener("click", writeToFirebaseAndMoveOnToSingleVarEquation);
$(".btn-section3")[0].addEventListener("click", writeToFirebaseAndMoveOnToTwoVarEquation);

getUUID()
rearrangeButtons()


function getUUID() {
  if (localStorage.getItem("uuid") === null) {
    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
  } else {
    uuid = localStorage.getItem("uuid")
  }
}

function rearrangeButtons() {
  console.log("rearrangeButtons")
  let grade = localStorage.getItem("grade");
  console.log("grade is", grade)
  if (grade == "A" || grade == "B"){
    btn1.style.display = "none"
    const newBtn = document.createElement("button");
    newBtn.innerHTML = "Algebra Foundation"
    let classes = "btn btn-lg btn-section btn-section1 col-lg-5 col-md-4 col-sm-4 col-4"
    let classArray = classes.split(" ");
    for(var i=0; i<classArray.length; i++) {
      newBtn.classList.add(classArray[i])
    }
    btnsDiv.appendChild(newBtn);
    newBtn.addEventListener("click", writeToFirebaseAndMoveOnToFoundation);
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
  // window.location.href="study.html?0|0|0|1";
  if (next == 'foundation') {
    window.location.href="study.html?0|0|0|1"
  } else if (next == 'singleVarEquation'){
    window.location.href="study.html?1|0|0|1"
  } else if (next == "twoVarEquation") {
    window.location.href="study.html?2|0|0|1"
  }
}
