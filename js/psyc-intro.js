// Prepare data
var queryString = location.search.substring(1);
var data = queryString.split("|");
var uuid = data[0];

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theoLink = document.getElementById("brand-link");
const signInAndOut = document.getElementById("signInAndOut");

// CONTENTS
const text1 = document.getElementById("text1-text");
const nextBtnDiv = document.getElementById("next-button-div");
const nextBtn = document.getElementById("pre-test-intro-next-btn");

$(".pre-test-intro-next-btn")[0].addEventListener("click", writeTimeToFirebaseAndMoveOn);

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  text1.style.fontSize = "45px";
  text1.style.fontWeight = "300"

  nextBtn.classList.remove("col-md-3");
  nextBtn.classList.add("col-md-5");
  nextBtn.style.height = "140px";
  nextBtn.style.fontSize = "40px";

}

prepareView();

function prepareView() {
  prevAnswer = localStorage.getItem("subject");
  subject = getSubjectName(prevAnswer)
  text1.innerHTML = "Now, the last step! <br><br> We have questions about <br>your motivation, sleep, and how you feel about yourself. <br><br> Answers will be used to fine-tune<br>the difficulty & frequency of practice questions.";
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

function moveOn() {
  window.location.href = "psyc.html?" + uuid + "|0";
}

function writeTimeToFirebaseAndMoveOn() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  firebase.database().ref('users/' + uuid + '/pre-test-intro').update({
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      moveOn()
    } else {
      moveOn()
    }
  });
}
