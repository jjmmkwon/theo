// Prepare data
var queryString = location.search.substring(1);
var data = queryString.split("|");
var uuid = data[0];

var subject;
var prevAnswer;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theoLink = document.getElementById("brand-link");
const signInAndOut = document.getElementById("signInAndOut");

// CONTENTS
// const theGoal = document.getElementById("theGoal");
const summary = document.getElementById("the-thing");
// const subjectText = document.getElementById("subject");
const nextBtnDiv = document.getElementById("next-button-div");
const nextBtn = document.getElementById("study-hour-next-btn");

const prepDiv = document.getElementById("prep");
const basicDiv = document.getElementById("basic");
const intermediateDiv = document.getElementById("intermediate");
const advancedDiv = document.getElementById("advanced");

const prepTitle = document.getElementById("prep-title");
const basicTitle = document.getElementById("basic-title");
const intermediateTitle = document.getElementById("intermediate-title");
const advancedTitle = document.getElementById("advanced-title");

const basicText = document.getElementById("basic-text");

$(".study-hour-next-btn")[0].addEventListener("click", writeTimeToFirebaseAndMoveOn);

prepareView();

function prepareView() {
  prevAnswer = localStorage.getItem("subject");
  subject = getSubjectName(prevAnswer)

  prepareTexts()
  summary.innerHTML = "Based on your answers, <br>here's the path that Theo's AI thinks would work best for you :";
}

$(document).ready(function() {
  checkForLogIn();
});

function prepareTexts() {
  let subjectLevel = getSubjectLevel()
  let iqLevel = localStorage.getItem("level");

  console.log("iqLevel is", iqLevel)
  console.log("subjectLevel is", subjectLevel)
  console.log("subject is", subject)
  iqLevel = 3
  subjectLevel = 3

  if (iqLevel == 3 && subjectLevel == 3) { // logic : 하 || 과목: 하
    //start from logic
    console.log("place : 1")
    prepDiv.innerHTML = "<span class='big'>1. Mathmatical thinking </span><br>for solid foundation</p>"
    basicTitle.innerHTML = "<span class='big'>2. Foundation for " + subject; + "</span><br>so that you never have to go back</p>"
    intermediateTitle.innerHTML = "<span class='big'>3. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big'>4. Advanced " + subject + "</span><br>to excel in class"
    basicText.innerHTML = "• Daily bite-size questions to review concepts <br> • Get fully ready for " + subject

  } else if (iqLevel == 2 && subjectLevel == 3) { // logic : 중 && 과목 : 하
    // start from basic
    console.log("place : 2")
    prepDiv.style.display = "none";
    basicTitle.innerHTML = "<span class='big'> 1. Foundation for " + subject;
    intermediateTitle.innerHTML = "<span class='big'>2. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big'>3. Advanced " + subject + "</span><br>to excel in class"
    basicText.innerHTML = "• Daily bite-size questions to review concepts <br> • Get fully ready for " + subject
  } else if ((iqLevel == 2 || subjectLevel == 2) && subjectLevel != 1) { // logic : 중 || 과목 : 중 && 과목 : 상 아님
    // start from intermediate
    console.log("place : 3")
    prepDiv.style.display = "none";
    basicDiv.style.display = "none";
    intermediateTitle.innerHTML = "<span class='big'>1. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big'>2. Advanced " + subject + "</span><br>to excel in class"
  } else if (subjectLevel == 1){ // 과목 : 상
    // start from intermediate
    console.log("place : 4")
    prepDiv.style.display = "none";
    basicDiv.style.display = "none";
    intermediateTitle.innerHTML = "<span class='big'>1. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big'>2. Advanced " + subject + "</span><br>to excel in class"
  } else { // default
    // start from basic
    console.log("place : 5")
    prepDiv.style.display = "none";
    basicTitle.innerHTML = "<span class='big'>2. Foundation for " + subject; + "</span><br>so that you never have to go back</p>"
    intermediateTitle.innerHTML = "<span class='big'>1. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big'>3. Advanced " + subject + "</span><br>to excel in class"
    basicText.innerHTML = "• Daily bite-size questions to review concepts <br> • Get fully ready for " + subject
  }
}

// function determineWhatsImportant() {
//   let subjectLevel = getSubjectLevel()
//   let iqLevel = localStorage.getItem("level");
//
//   console.log("iqLevel is", iqLevel)
//   console.log("subjectLevel is", subjectLevel)
//
//   if (iqLevel == 3 || subjectLevel == 3) { // logic : 하 || 과목: 하
//     return "Based on your answers, you need : Thinking Mathmatically"
//   } else if (iqLevel == 2 || subjectLevel == 3) { // logic : 중 || 과목 : 하
//     return "Based on your answers, you need : Foundataion for " + subject
//   } else if ((iqLevel == 2 || subjectLevel == 2) && subjectLevel != 1) { // logic : 중 || 과목 : 중 || 과목 : 상 아님
//     return "<span class= 'smaller'>Based on your answers, you need to : </span><br>Solidify basic concepts"
//   } else if (subjectLevel == 1){ // 과목 : 상
//     return "Advanced problems for " + subject
//   } else { // default
//     return "Enough Practice for " + subject + " basics"
//   }
// }

function getSubjectLevel() {
  var wrongCount = 0
  let q1 = localStorage.getItem(subject + "-0")
  let q2 = localStorage.getItem(subject + "-1")
  let q3 = localStorage.getItem(subject + "-2")
  let q4 = localStorage.getItem(subject + "-3")

  if (q1 == "false") {
    wrongCount += 1
  } else if (q2 == "false") {
    wrongCount += 1
  } else if (q3 == "false") {
    wrongCount += 1
  } else if (q4 == "false") {
    wrongCount += 1
  }

  if (wrongCount >= 2) {
    return 3
  } else if (wrongCount == 1) {
    return 2
  } else if (wrongCount == 0) {
    return 1
  }
}

function getSubjectName(answer) {
  answer = parseInt(answer)
  switch(answer) {
  case 1:
    return "Algebra1"
    break;
  case 2:
    return "Geometry"
    break;
  case 3:
    return "Algebra2"
    break;
  case 4:
    return "Pre-Calulus"
    break;
  case 5:
    return "Calculus"
    break;
  case 6:
    return "Other"
    break;
  default:
  }
}

function checkForLogIn() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) { // already a user. change button.
      console.log("is user")
      theoLink.href = "customCurriculum.html";
      signInAndOut.innerHTML = "Sign Out";
      userId = firebase.auth().currentUser.uid;
      signInAndOut.href = "signInAndOut.html?" + userId + "|1"; // 어차피 아랫줄에서 curriculum으로 넘어감.

    } else {
      console.log("not a user")
      checkForData()
    }
  });
}

function checkForData() {
  if (uuid == undefined || uuid == "") {
    window.location.href="index.html"
  } else {
    console.log("uuid is", uuid)
  }
}

function moveOn() {
  window.location.href = "signUp.html?" + uuid;
}

function writeTimeToFirebaseAndMoveOn() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  firebase.database().ref('users/' + uuid + '/study hour').update({
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      moveOn()
    } else {
      moveOn()
    }
  });
}
