// Prepare data
var queryString = location.search.substring(1);
var data = queryString.split("|");
var uuid = data[0];
var onboardingNum = data[1];
var onboardingCount = 6;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theoLink = document.getElementById("brand-link");
const signInAndOut = document.getElementById("signInAndOut");

// CONTENTS
const questionNum = document.getElementById("questionNum")
const text1 = document.getElementById("text1");
const buttonsDiv = document.getElementById("buttons");
const button1 = document.getElementById("btn-1");
const button2 = document.getElementById("btn-2");
const button3 = document.getElementById("btn-3");
const button4 = document.getElementById("btn-4");
const button5 = document.getElementById("btn-5");
const text2Div = document.getElementById("text2Div");
const text2 = document.getElementById("text2");
const nextBtnDiv = document.getElementById("next-button");
const nextBtn = document.getElementById("onboarding-next-btn");

$(".onboarding-next-btn")[0].addEventListener("click", writeAnswerToFirebaseAndMoveOn);
$(".btn-1")[0].addEventListener("click", writeBtn1ToFirebaseAndMoveOn);
$(".btn-2")[0].addEventListener("click", writeBtn2ToFirebaseAndMoveOn);
$(".btn-3")[0].addEventListener("click", writeBtn3ToFirebaseAndMoveOn);
$(".btn-4")[0].addEventListener("click", writeBtn4ToFirebaseAndMoveOn);
$(".btn-5")[0].addEventListener("click", writeBtn5ToFirebaseAndMoveOn);

prepareView();

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  enlargeButtons()
  text1.style.fontSize = "45px";
  if (onboardingNum == 2) {
    text1.style.fontSize = "45px";
    small.style.color = "grey";
    small.style.fontSize = "25px";
  }
}

function enlargeButtons() {
  let buttons = [button1, button2, button3, button4, button5];
  for (var i=0; i<buttons.length; i++){
    buttons[i].classList.remove("col-md-7");
    buttons[i].classList.add("col-md-12");
    buttons[i].style.height = "140px";
    buttons[i].style.fontSize = "40px";
    buttons[i].style.marginBottom = "30px";
  }

  nextBtn.classList.remove("col-md-3");
  nextBtn.classList.add("col-md-12");
  nextBtn.style.height = "140px";
  nextBtn.style.fontSize = "40px";
}

function prepareView() {
  let num = parseInt(onboardingNum) + 1
  questionNum.innerHTML = "Question " + num + " of 6"
  const prevAnswer = localStorage.getItem("subject");
  let subject = getSubjectName(prevAnswer)
  const struggle = localStorage.getItem("struggle")

  if (onboardingNum == 4) {
    text1.innerHTML = "How many hours do you usually sleep?"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "More than 10 hours"
    button2.innerHTML = "8-10 hours"
    button3.innerHTML = "6-8 hours"
    button4.innerHTML = "4-6 hours"
    button5.innerHTML = "less than 4 hours"

  } else if (onboardingNum == 5) {
    text1.innerHTML = "How motivated are you about " + subject

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "5: very motivated"
    button2.innerHTML = "4"
    button3.innerHTML = "3"
    button4.innerHTML = "2"
    button5.innerHTML = "1: not motivated at all"

  } else if (onboardingNum == 0) {
    text1.innerHTML = "<span class='small' id='small'>Following statements may or may not apply to you. <br>There are no right or wrong answers, <br>so just answer honestly!</span><br><br>Setbacks don't discourage me"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "Very much like me"
    button2.innerHTML = "Mostly like me"
    button3.innerHTML = "Somewhat like me"
    button4.innerHTML = "Not much like me"
    button5.innerHTML = "Not like me at all"

  } else if (onboardingNum == 1) {
    text1.innerHTML = "I finish whatever I begin"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "Very much like me"
    button2.innerHTML = "Mostly like me"
    button3.innerHTML = "Somewhat like me"
    button4.innerHTML = "Not much like me"
    button5.innerHTML = "Not like me at all"

  } else if (onboardingNum == 2) {
    text1.innerHTML = "I couldn't find something because my desk, locker, or bedroom was mess"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "Almost never"
    button2.innerHTML = "About once a month"
    button3.innerHTML = "About 2-3 times a month"
    button4.innerHTML = "About once a week"
    button5.innerHTML = "At least once a day"

  } else if (onboardingNum == 3) {
    text1.innerHTML = "I did not remember what my teacher told me to do"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "Almost never"
    button2.innerHTML = "About once a month"
    button3.innerHTML = "About 2-3 times a month"
    button4.innerHTML = "About once a week"
    button5.innerHTML = "At least once a day"
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

function storeDaysInPlan(month, year) {
  const numberOfDays = calculateNumberOfDays(month, year) // if the date is invalid, it could be undefined
  localStorage.setItem("numberOfDays", numberOfDays);
}

function calculateNumberOfDays(mm, yy) {
  const current = getCurrentDate();
  const goal = getMidDate(mm, yy);
  var difference_In_Time = goal.getTime() - current.getTime();
  var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
  // console.log("numOfDays", difference_In_Days)
  // console.log("numberInMonth", difference_In_Days/30)
  return difference_In_Days
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

function getCurrentDate() {
  var d = new Date()
  var cYY = d.getFullYear()
  var cMM = d.getMonth() + 1;
  var cDD = d.getDate()
  var toString =  cMM.toString() + "/" + cDD.toString() + "/" + cYY.toString();
  var current = new Date(toString);

  return current
}

function getMidDate(mm, yy) {
  var toString =  mm.toString() + "/15/" + yy.toString();
  var date = new Date(toString);
  return date
}

function writeAnswerToFirebaseAndMoveOn() {
  if (onboardingNum == 0) {
    const month = monthInput.value;
    const year = yearInput.value;
    storeDaysInPlan(month, year);
    writePlanToFirebaseAndMoveOn(uuid, month, year)
  } else {
    writeTimeToFirebaseAndMoveOn(uuid)
  }
}

function moveOn(answer) {
  if (onboardingCount - 1 == parseInt(onboardingNum)) { // done
    window.location.href = "offer.html?" + uuid+ "|0";
  } else { // next Q
    var nextNum = parseInt(onboardingNum) + 1;
    window.location.href = "psyc.html?" + uuid + "|" + nextNum;
  }
}

function writeBtn1ToFirebaseAndMoveOn() {
  storeAnswer(1);
  writeToFirebaseAndMoveOn(uuid, 1);
}
function writeBtn2ToFirebaseAndMoveOn() {
  storeAnswer(2);
  writeToFirebaseAndMoveOn(uuid, 2);
}
function writeBtn3ToFirebaseAndMoveOn() {
  storeAnswer(3);
  writeToFirebaseAndMoveOn(uuid, 3);
}
function writeBtn4ToFirebaseAndMoveOn() {
  storeAnswer(4);
  writeToFirebaseAndMoveOn(uuid, 4);
}
function writeBtn5ToFirebaseAndMoveOn() {
  storeAnswer(5);
  writeToFirebaseAndMoveOn(uuid, 5);
}

function storeAnswer(answer) {
  if (onboardingNum == 0) {
    localStorage.setItem("sleep", answer);
  } else if (onboardingNum == 1) {
    localStorage.setItem("motivation", answer);
  } else if (onboardingNum == 2){
    localStorage.setItem("grit1", answer);
  } else if (onboardingNum == 3){
    localStorage.setItem("grit2", answer);
  } else if (onboardingNum == 4){
    localStorage.setItem("per1", answer);
  } else if (onboardingNum == 5){
    localStorage.setItem("per2", answer);
  }
}

function writeToFirebaseAndMoveOn(userId, answer) {
  var innerHTML = ""
  if (answer == 1) {
    innerHTML = button1.innerHTML
  } else if (answer == 2) {
    innerHTML = button2.innerHTML
  } else if (answer == 3) {
    innerHTML = button3.innerHTML
  } else if (answer == 4) {
    innerHTML = button4.innerHTML
  } else if (answer == 5) {
    innerHTML = button5.innerHTML
  } else if (answer == 6) {
    innerHTML = button6.innerHTML
  }

  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  firebase.database().ref('users/' + userId + '/psyc/' + onboardingNum).update({
    timeSpent: timeSpentOnPage,
    question : text1.innerHTML,
    answer: answer + ' : ' + innerHTML
  }, function(error) {
    if (error) {
      moveOn(answer)
    } else {
      moveOn(answer)
    }
  });
}

function writePlanToFirebaseAndMoveOn(userId, month, year) {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  firebase.database().ref('users/' + userId + '/onboarding/' + onboardingNum).update({
    timeSpent: timeSpentOnPage,
    plan: month + "/" + year
  }, function(error) {
    if (error) {
      moveOn("")
    } else {
      moveOn("")
    }
  });
}

function writeTimeToFirebaseAndMoveOn(userId) {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  firebase.database().ref('users/' + userId + '/onboarding/' + onboardingNum).update({
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      moveOn("")
    } else {
      moveOn("")
    }
  });
}
