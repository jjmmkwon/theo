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

const prepUnit = document.getElementById("prep-unit");
const basicUnit = document.getElementById("basic-unit");
const intermediateUnit= document.getElementById("intermediate-unit");
const advancedUnit = document.getElementById("advanced-unit");

const prepText = document.getElementById("prep-text");
const basicText = document.getElementById("basic-text");
const intermediateText = document.getElementById("intermediate-text");
const advancedText = document.getElementById("advanced-text");

$(".study-hour-next-btn")[0].addEventListener("click", writeTimeToFirebaseAndMoveOn);

prepareView();

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  summary.style.fontSize = "50px";
  summary.style.fontWeight = "300";
  textSizeUp()
  nextBtn.classList.remove("col-md-3");
  nextBtn.classList.add("col-md-12");
  nextBtn.style.height = "140px";
  nextBtn.style.fontSize = "40px";
} else {
  summary.style.fontSize = "25px";
}

function textSizeUp(){
  const prepBig = document.getElementById("prepBig");
  const basicBig = document.getElementById("basicBig");
  const interBig = document.getElementById("interBig");
  const adBig = document.getElementById("adBig");
  prepBig.style.fontSize = "45px";
  basicBig.style.fontSize = "45px";
  interBig.style.fontSize = "45px";
  adBig.style.fontSize = "45px";

  prepTitle.style.fontSize = "25px";
  basicTitle.style.fontSize = "25px";
  intermediateTitle.style.fontSize = "25px";
  advancedTitle.style.fontSize = "25px";

  prepUnit.style.fontSize = "40px";
  prepUnit.style.color = "grey";
  prepUnit.style.fontWeight = "300";

  basicUnit.style.fontSize = "40px";
  basicUnit.style.color = "grey";
  basicUnit.style.fontWeight = "300";

  intermediateUnit.style.fontSize = "40px";
  intermediateUnit.style.color = "grey";
  intermediateUnit.style.fontWeight = "300";

  advancedUnit.style.fontSize = "40px";
  advancedUnit.style.color = "grey";
  advancedUnit.style.fontWeight = "300";

  prepText.style.fontSize = "25px";
  prepText.style.color = "black";
  prepText.style.fontWeight = "300";

  basicText.style.fontSize = "25px";
  basicText.style.color = "black";
  basicText.style.fontWeight = "300";

  intermediateText.style.fontSize = "25px";
  intermediateText.style.color = "black";
  intermediateText.style.fontWeight = "300";

  advancedText.style.fontSize = "25px";
  advancedText.style.color = "black";
  advancedText.style.fontWeight = "300";


}

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

  if (iqLevel == 3 && subjectLevel == 3) { // logic : 하 || 과목: 하
    //start from logic
    console.log("place : 1")
    prepTitle.innerHTML = "<span class='big' id ='prepBig'>1. Mathmatical thinking </span><br>for solid foundation</p>"
    basicTitle.innerHTML = "<span class='big' id ='basicBig'>2. Foundation for " + subject; + "</span><br>so that you never have to go back</p>"
    intermediateTitle.innerHTML = "<span class='big' id ='interBig'>3. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big' id ='adBig'>4. Advanced " + subject + "</span><br>to excel in class"
    basicText.innerHTML = "• Daily bite-size questions to review concepts <br> • Get fully ready for " + subject

  } else if (iqLevel == 2 && subjectLevel == 3) { // logic : 중 && 과목 : 하
    // start from basic
    console.log("place : 2")
    prepDiv.style.display = "none";
    basicTitle.innerHTML = "<span class='big' id ='basicBig'> 1. Foundation for " + subject;
    intermediateTitle.innerHTML = "<span class='big' id ='interBig'>2. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big' id ='adBig' >3. Advanced " + subject + "</span><br>to excel in class"
    basicText.innerHTML = "• Daily bite-size questions to review concepts <br> • Get fully ready for " + subject
  } else if ((iqLevel == 2 || subjectLevel == 2) && subjectLevel != 1) { // logic : 중 || 과목 : 중 && 과목 : 상 아님
    // start from intermediate
    console.log("place : 3")
    prepDiv.style.display = "none";
    basicDiv.style.display = "none";
    intermediateTitle.innerHTML = "<span class='big' id ='interBig'>1. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big' id ='adBig'>2. Advanced " + subject + "</span><br>to excel in class"
  } else if (subjectLevel == 1){ // 과목 : 상
    // start from intermediate
    console.log("place : 4")
    prepDiv.style.display = "none";
    basicDiv.style.display = "none";
    intermediateTitle.innerHTML = "<span class='interBig'>1. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='adBig'>2. Advanced " + subject + "</span><br>to excel in class"
  } else { // default
    // start from basic
    console.log("place : 5")
    prepDiv.style.display = "none";
    basicTitle.innerHTML = "<span class='big' id ='basicBig'>2. Foundation for " + subject; + "</span><br>so that you never have to go back</p>"
    intermediateTitle.innerHTML = "<span class='big' id ='interBig'>1. Basics of " + subject + "</span><br>to get you on the right track"
    advancedTitle.innerHTML = "<span class='big' id ='adBig'>3. Advanced " + subject + "</span><br>to excel in class"
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
