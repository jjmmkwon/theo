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
const submitBtn = document.getElementById("submit-btn");
const skipBtn = document.getElementById("skip-btn");

$(".pre-test-submit-btn")[0].addEventListener("click", writeTest3AnswerToFirebase);
$(".pre-test-skip-btn")[0].addEventListener("click", skipAndProceed);

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  submitBtn.classList.remove("col-md-3");
  submitBtn.classList.add("col-md-5");
  submitBtn.style.height = "140px";
  submitBtn.style.fontSize = "40px";
  skipBtn.classList.remove("col-md-3");
  skipBtn.classList.add("col-md-5");
  skipBtn.style.height = "140px";
  skipBtn.style.fontSize = "40px";
  skipBtn.style.margin = "30px";

  questionImage.style.width = "700px";
  questionImage.style.height = "180px";

  questionText.style.fontSize = "45px"
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

function writeTest3AnswerToFirebase() {
  console.log("writeTest3AnswerToFirebase")
  for (var i = 0; i < answerButtonsTest3.length; i++) {
    if (answerButtonsTest3[i].checked == true) {
      var answer = answerButtonsTest3[i].value;
      if (answer == "2") {
        gotPreTest3 = 1;
      } else {
        gotPreTest3 = 0;
      }
      writePreTest3AnswerData(answer);
      break;
    } else if (i == answerButtonsTest3.length - 1) {
      alert("Select an answer to proceed");
    }
  };
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
