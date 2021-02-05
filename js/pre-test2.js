// Prepare data
var queryString = location.search.substring(1);
var data = queryString.split("|");
var uuid = data[0];
// PreTestResults
const gotPreTest1String = data[1]; // string
var gotPreTest2 = 0;
var timeSpentOnPage = 0;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var dataExist = false;

var answerButtonsTest2 = document.getElementsByName("pre-test2");
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

// $(".pre-test-submit-btn")[0].addEventListener("click", writeTest2AnswerToFirebase);
// $(".pre-test-skip-btn")[0].addEventListener("click", skipAndProceed);

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  // submitBtn.classList.remove("col-md-3");
  // submitBtn.classList.add("col-md-5");
  // submitBtn.style.height = "140px";
  // submitBtn.style.fontSize = "40px";
  // skipBtn.classList.remove("col-md-3");
  // skipBtn.classList.add("col-md-5");
  // skipBtn.style.height = "140px";
  // skipBtn.style.fontSize = "40px";
  // skipBtn.style.margin = "30px";

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
  writeTest2AnswerToFirebase("1")
}
function writeBtn2ToFirebaseAndMoveOn() {
  writeTest2AnswerToFirebase("2")
}
function writeBtn3ToFirebaseAndMoveOn() {
  writeTest2AnswerToFirebase("3")
}
function writeBtn4ToFirebaseAndMoveOn() {
  writeTest2AnswerToFirebase("4")
}

function writeTest2AnswerToFirebase(answer){
  if (answer == "4") {
    gotPreTest2 = 1;
  } else {
    gotPreTest2 = 0;
  }
  writePreTest2AnswerData(uuid, answer);
};

function writePreTest2AnswerData(userId, answer) {
  timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = Math.round(timeSpentOnPage)
  if (answer == 4) {
    localStorage.setItem("pre-test2", "right")
  } else {
    localStorage.setItem("pre-test2", "wrong")
  }
  firebase.database().ref('users/' + userId + '/' + 'pre-test2').set({
    userAnswer: answer,
    correctAnswer: 4,
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      presentPreTest3();
    } else {
      presentPreTest3();
    }
  });
}

function skipAndProceed() {
  localStorage.setItem("pre-test2", "wrong")
  gotPreTest2 = 0;
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = Math.round(timeSpentOnPage);
  firebase.database().ref('users/' + uuid + '/' + 'pre-test2').set({
    userAnswer: "skip",
    correctAnswer: 2,
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      presentPreTest3();
    } else {
      presentPreTest3();
    }
  });
};

function checkExistingData(userId) {
  return firebase.database().ref('users/' + userId + '/' + 'pre-test2').once('value').then(function(snapshot) {
    if (snapshot.val() != null) {
      dataExist = true
    } else {
      dataExist = false
    }
  });
}

function presentPreTest3(){
  const gotPreTest2String = gotPreTest2.toString()
  var url = "pre-test3.html?" + queryString + "|" + gotPreTest2String + "|" + timeSpentOnPage;
  window.location.href = url;
}
