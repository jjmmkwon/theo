// Prepare data
var queryString = location.search.substring(1);
var data = queryString.split("|");
var uuid = data[0];
// PreTestResults
const gotPreTest1String = data[1]; // string
const gotPreTest2String = data[2]; // string
const preTest2TimeTakenString = data[3]; // string
var gotPreTest3 = 0;
var level = 3;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var dataExist = false;

var answerButtonsTest3 = document.getElementsByName("pre-test3");
const theoLink = document.getElementById("brand-link");
const signInAndOut = document.getElementById("signInAndOut");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");

const btnA = document.getElementById("answer_text_A");
const btnB = document.getElementById("answer_text_B");
const btnC = document.getElementById("answer_text_C");
const btnD = document.getElementById("answer_text_D");

const imgA = document.getElementById("answerImgA");
const imgB = document.getElementById("answerImgB");
const imgC = document.getElementById("answerImgC");
const imgD = document.getElementById("answerImgD");

const answerbtnA = document.getElementById("answer_btnA");
const answerbtnB = document.getElementById("answer_btnB");
const answerbtnC = document.getElementById("answer_btnC");
const answerbtnD = document.getElementById("answer_btnD");

$(".answer_A")[0].addEventListener("click", writeBtn1ToFirebaseAndMoveOn);
$(".answer_B")[0].addEventListener("click", writeBtn2ToFirebaseAndMoveOn);
$(".answer_C")[0].addEventListener("click", writeBtn3ToFirebaseAndMoveOn);
$(".answer_D")[0].addEventListener("click", writeBtn4ToFirebaseAndMoveOn);

// const submitBtn = document.getElementById("submit-btn");
// const skipBtn = document.getElementById("skip-btn");

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  questionImage.style.width = "700px";
  questionImage.style.height = "180px";

  questionText.style.fontSize = "45px"

  btnA.style.fontSize = "40px"
  btnB.style.fontSize = "40px"
  btnC.style.fontSize = "40px"
  btnD.style.fontSize = "40px"

  imgA.style.height = "100px"
  imgA.style.width = "100px"
  imgB.style.height = "100px"
  imgB.style.width = "100px"
  imgC.style.height = "100px"
  imgC.style.width = "100px"
  imgD.style.height = "100px"
  imgD.style.width = "100px"

  // submitBtn.classList.remove("col-md-3");
  // submitBtn.classList.add("col-md-5");
  // submitBtn.style.height = "140px";
  // submitBtn.style.fontSize = "40px";
  // skipBtn.classList.remove("col-md-3");
  // skipBtn.classList.add("col-md-5");
  // skipBtn.style.height = "140px";
  // skipBtn.style.fontSize = "40px";
  // skipBtn.style.margin = "30px";
}

$(document).ready(function() {
  checkForLogIn();
  if( $('#for-mobile-detecttion').css('display')=='none') {
  } else {
    answerbtnA.style.width = "1.5em";
    answerbtnA.style.height = "1.5em";
    answerbtnB.style.width = "1.5em";
    answerbtnB.style.height = "1.5em";
    answerbtnC.style.width = "1.5em";
    answerbtnC.style.height = "1.5em";
    answerbtnD.style.width = "1.5em";
    answerbtnD.style.height = "1.5em";
  }
});

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

function writeBtn1ToFirebaseAndMoveOn() {
  writeTest3AnswerToFirebase("1")
}
function writeBtn2ToFirebaseAndMoveOn() {
  writeTest3AnswerToFirebase("2")
}
function writeBtn3ToFirebaseAndMoveOn() {
  writeTest3AnswerToFirebase("3")
}
function writeBtn4ToFirebaseAndMoveOn() {
  writeTest3AnswerToFirebase("4")
}

function writeTest3AnswerToFirebase(answer) {
  if (answer == "2") {
    gotPreTest3 = 1;
  } else {
    gotPreTest3 = 0;
  }
  writePreTest3AnswerData(answer);
};

function writePreTest3AnswerData(answer) {
  determineLevel();
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();

  if (answer == 2) {
    localStorage.setItem("pre-test3", "right")
  } else {
    localStorage.setItem("pre-test3", "wrong")
  }

  firebase.database().ref('users/' + uuid + '/' + 'level').set({
    level: level,
  }, function(error) {});

  firebase.database().ref('users/' + uuid + '/' + 'pre-test3').set({
    userAnswer: answer,
    correctAnswer: 2,
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      moveOn()
    } else {
      moveOn()
    }
  });
}

function skipAndProceed() {
  localStorage.setItem("pre-test3", "wrong")
  gotPreTest3 = 0;
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  preTestTimeTaken = Math.floor(timeSpentOnPage)
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  firebase.database().ref('users/' + uuid + '/' + 'pre-test3').set({
    userAnswer: "skip",
    correctAnswer: 2,
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      moveOn()
    } else {
      moveOn()
    }
  });
};

function checkExistingData() {
  return firebase.database().ref('users/' + uuid + '/' + 'pre-test3').once('value').then(function(snapshot) {
    if (snapshot.val() != null) {
      dataExist = true
    } else {
      dataExist = false
    }
  });
}

function moveOn(){
  const url = "psyc-intro.html?" + uuid;
  window.location.href = url;
}

function determineLevel() {
  const gotPreTest1 = parseInt(gotPreTest1String);
  const preTest2TimeTaken = parseInt(preTest2TimeTakenString);
  const gotPreTest2 = parseInt(gotPreTest2String)

  console.log("data", gotPreTest1, gotPreTest2, preTest2TimeTaken)

  if (gotPreTest1 == 1 && gotPreTest2 == 1 && preTest2TimeTaken < 13 ){
    level = 1; // High
  } else if ((gotPreTest1 == 1 && gotPreTest2 == 1 && preTest2TimeTaken >= 13) || (gotPreTest1 == 1 && gotPreTest3 == 1 && preTest2TimeTaken >= 13)){
    level = 2; // Middle
  } else {
    level = 3; // Low
  }

  localStorage.setItem("level", level);
}
