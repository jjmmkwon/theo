// Prepare data
var queryString = location.search.substring(1);
var data = queryString.split("|");
var uuid = data[0];
var gotPreTest1 = 0
var preTestTimeTaken = 0.0

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var dataExist = false;

////////////Mark: Pre-Test1//////////
var answerButtonsTest1 = document.getElementsByName("pre-test1");
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

$(".answer_A")[0].addEventListener("click", writeBtn1ToFirebaseAndMoveOn);
$(".answer_B")[0].addEventListener("click", writeBtn2ToFirebaseAndMoveOn);
$(".answer_C")[0].addEventListener("click", writeBtn3ToFirebaseAndMoveOn);
$(".answer_D")[0].addEventListener("click", writeBtn4ToFirebaseAndMoveOn);


// const submitBtn = document.getElementById("submit-btn");
// const skipBtn = document.getElementById("skip-btn");

// $(".pre-test-submit-btn")[0].addEventListener("click", writeTest1AnswerToFirebase);
// $(".pre-test-skip-btn")[0].addEventListener("click", skipAndProceed);

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  questionImage.style.width = "500px";
  questionImage.style.height = "500px";
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
}

$(document).ready(function() {
  checkForLogIn();
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
  writeTest1AnswerToFirebase("1")
}
function writeBtn2ToFirebaseAndMoveOn() {
  writeTest1AnswerToFirebase("2")
}
function writeBtn3ToFirebaseAndMoveOn() {
  writeTest1AnswerToFirebase("3")
}
function writeBtn4ToFirebaseAndMoveOn() {
  writeTest1AnswerToFirebase("4")
}

function writeTest1AnswerToFirebase(answer) {
  if (answer == "1") {
    gotPreTest1 = 1;
  } else {
    gotPreTest1 = 0;
  }
  writePreTest1AnswerData(answer);
};

function skipAndProceed() {
  localStorage.setItem("pre-test1", "wrong")
  gotPreTest1 = 0;
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  preTestTimeTaken = Math.floor(timeSpentOnPage)
  firebase.database().ref('users/' + uuid + '/' + 'pre-test1').set({
    userAnswer: "skip",
    correctAnswer: 2,
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      present();
    } else {
      present();
    }
  });
};

function writePreTest1AnswerData(answer) {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  preTestTimeTaken = Math.floor(timeSpentOnPage)
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  if (answer == 2) {
    localStorage.setItem("pre-test1", "right")
  } else {
    localStorage.setItem("pre-test1", "wrong")
  }
  firebase.database().ref('users/' + uuid + '/' + 'pre-test1').set({
    userAnswer: answer,
    correctAnswer: 2,
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      present();
    } else {
      present();
    }
  });
}

function checkExistingData() {
  return firebase.database().ref('users/' + uuid + '/' + 'pre-test1').once('value').then(function(snapshot) {
    if (snapshot.val() != null) {
      dataExist = true
    } else {
      dataExist = false
    }
  });
}

function present() {
  const gotPreTest1String = gotPreTest1.toString();
  const preTestTimeTakenString = preTestTimeTaken.toString();
  var url = "pre-test2.html?" + queryString + "|" + gotPreTest1String;
  window.location.href = url;
}
