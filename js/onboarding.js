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
const text1 = document.getElementById("text1");
const dateDiv = document.getElementById("date");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const buttonsDiv = document.getElementById("buttons");
const button1 = document.getElementById("btn-1");
const button2 = document.getElementById("btn-2");
const button3 = document.getElementById("btn-3");
const button4 = document.getElementById("btn-4");
const button5 = document.getElementById("btn-5");
const button6 = document.getElementById("btn-6");
const text2Div = document.getElementById("text2Div");
const text2 = document.getElementById("text2");
const nextBtnDiv = document.getElementById("next-button");
const nextBtn = document.getElementById("onboarding-next-btn");
const dunnoBtn = document.getElementById("onboarding-dunno-btn");

$(".onboarding-next-btn")[0].addEventListener("click", writeAnswerToFirebaseAndMoveOn);
$(".btn-1")[0].addEventListener("click", writeBtn1ToFirebaseAndMoveOn);
$(".btn-2")[0].addEventListener("click", writeBtn2ToFirebaseAndMoveOn);
$(".btn-3")[0].addEventListener("click", writeBtn3ToFirebaseAndMoveOn);
$(".btn-4")[0].addEventListener("click", writeBtn4ToFirebaseAndMoveOn);
$(".btn-5")[0].addEventListener("click", writeBtn5ToFirebaseAndMoveOn);
$(".btn-6")[0].addEventListener("click", writeBtn6ToFirebaseAndMoveOn);

prepareView();

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  enlargeButtons()
  text1.style.fontSize = "45px";
}

function enlargeButtons() {
  let buttons = [button1, button2, button3, button4, button5, button6];
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
  const prevAnswer = localStorage.getItem("subject");
  let subject = getSubjectName(prevAnswer)
  const struggle = localStorage.getItem("struggle")

  if (onboardingNum == 0) {
    console.log("onboarding 2")
    text1.innerHTML = "What is the subject you need help with?"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = getSubjectName(1)
    button2.innerHTML = getSubjectName(2)
    button3.innerHTML = getSubjectName(3)
    button4.innerHTML = getSubjectName(4)
    button5.innerHTML = getSubjectName(5)
    button6.innerHTML = getSubjectName(6)

    if (typeof prevAnswer !== undefined && prevAnswer !== null) {
      const string = prevAnswer.toString()
      const btnToColor = document.getElementById("btn-" + string);
      btnToColor.style.backgroundColor = "#403ca6";
      btnToColor.style.color = "white";
    }

    // text1.innerHTML = "When is your next quiz or test?"
    // dateDiv.style.display = "inline-block";
    // dunnoBtn.style.display = "inline-block"
  } else if (onboardingNum == 1) {
    console.log("onboarding 2")
    text1.innerHTML = "What describes your difficulty the best?"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "I feel like I'm not ready for " + subject
    button2.innerHTML = "Abstract names and notations like x, y, f(x), g(h) confuse me"
    button3.innerHTML = "Graphs and transformations are hard"
    button4.innerHTML = "I make small mistakes, but I'm okay with the concepts in general"
    button5.innerHTML = "I want to self-study " + subject + " in advance, but can't find the right way";
    button6.innerHTML = "Other"

  } else if (onboardingNum == 2) {
    console.log("onboarding 2")
    var text = ""
    if (struggle == 1) {
      text = "Got it. <br><br> All you need to do is to spend <br>some time on the appropriate exercises to fill the gap. <br><br>And after a few questions, <br>Theo will be able to custom design<br> the most efficient way to do it for you."
    } else if (struggle == 2 ){
      text = "Many students find them confusing.<br><br>But with the right amount <br>of practice, you can easily get used to them. <br><br>And after a few questions, <br>Theo will be able to custom design<br> the most efficient way to practice."
    } else if (struggle == 3 ){
      text = "Many students struggle with graphs, especially <br>the transformation part. <br><br> And all you need is just <br>the right type of practice questions.<br><br> And after a few questions, <br>Theo will be able to custom design<br> them for you."
    } else if (struggle == 4) {
      text = "We've met so many students struggling with small mistakes. <br>And we understand that it is frustrating. <br><br>And after a few questions, <br>Theo will be able to custom design<br> the most efficient way to train you to minimize mistakes."
    } else if (struggle == 5) {
      text = "We know that there are not enough <br>self-study guides and practice questions out there. <br><br>After a few questions, <br>Theo will pick you up from where you are,<br> and guide you to your goal with<br> plenty of exercises and resources <br>that suit your level."
    } else {
      text = "Got it. <br> From now on, we will ask you a few questions so that <br>we better understand about your needs. <br><br>And at the end of the questions, we will give you a summary <br>of the customized path to boost your " + subject + " skills"
    }
    text1.style.fontWeight = "300";
    text1.innerHTML = text
    nextBtn.innerHTML = "Next"

  } else if (onboardingNum == 3) {
    text1.innerHTML = "So, what is your grade for " + subject + " so far? (approximation is okay)"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "Between A- and A+ (or above 90)"
    button2.innerHTML = "Between B- and B+ (or between 80-89)"
    button3.innerHTML = "Between C- and C+ (or between 60-79)"
    button4.innerHTML = "Between D- and D+ (or between 30-59)"
    button5.innerHTML = "F (or between 0-29)"
    button6.style.display = "none";

  } else if (onboardingNum == 4) {
    text1.innerHTML = "What was your grade from the previous Math subject you took right before " + subject + "?"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "Between A- and A+ (or above 90)"
    button2.innerHTML = "Between B- and B+ (or between 80-89)"
    button3.innerHTML = "Between C- and C+ (or between 70-79)"
    button4.innerHTML = "Between D- and D+ (or between 60-69)"
    button5.innerHTML = "F (or between 0-59)"
    button6.style.display = "none";

  } else if (onboardingNum == 5) {
    text1.innerHTML = "What is your target grade for " + subject + "?"

    nextBtnDiv.style.display = "none";
    buttonsDiv.style.display = "inline-block";
    button1.innerHTML = "A or above (or above 93)"
    button2.innerHTML = "A- (or between 90 - 92)"
    button3.innerHTML = "B+ (or between 87 - 89)"
    button4.innerHTML = "B (or between 83 - 86)"
    button5.innerHTML = "B- (or between 80 - 82)"
    button6.innerHTML = "C+ (or between 77 - 79)"

  } else if (onboardingNum == 100) { // subject not availble
    text1.innerHTML = "Theo will provide custom curriculums for other Math subjects soon, <br>but at this moment, <br>Algebra, Geometry and Calculus are the only subjects covered."
    dateDiv.style.display = "none";
    nextBtn.innerHTML = "Back"
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
  writeTimeToFirebaseAndMoveOn(uuid)
  // if (onboardingNum == 0) {
  //   const month = monthInput.value;
  //   const year = yearInput.value;
  //   storeDaysInPlan(month, year);
  //   writePlanToFirebaseAndMoveOn(uuid, month, year)
  // } else {
  //   writeTimeToFirebaseAndMoveOn(uuid)
  // }
}

function moveOn(answer) {
  if (onboardingCount - 1 == parseInt(onboardingNum)) { // done
    window.location.href = "offer.html?" + uuid;
  } else { // next Q
    if (onboardingNum == 0 && answer == "6") { // not availbl
      var nextNum = 100 // subject not available
      window.location.href = "onboarding.html?" + uuid + "|" + nextNum;
    } else if(onboardingNum == 100) { // going back to onboarding 2
      var nextNum = 0;
      window.location.href = "onboarding.html?" + uuid + "|" + nextNum;
    } else {
      var nextNum = parseInt(onboardingNum) + 1;
      window.location.href = "onboarding.html?" + uuid + "|" + nextNum;
    }
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
function writeBtn6ToFirebaseAndMoveOn() {
  storeAnswer(6);
  writeToFirebaseAndMoveOn(uuid, 6);
}

function storeAnswer(answer) {
  if (onboardingNum == 0) {
    localStorage.setItem("subject", answer);
  } else if (onboardingNum == 1) {
    localStorage.setItem("struggle", answer);
  } else if (onboardingNum == 3){// current grade
    localStorage.setItem("grade", answer);
  } else if (onboardingNum == 4){// prev grade
    localStorage.setItem("prevGrade", answer);
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
  firebase.database().ref('test1_3/' + 'users/' + userId + '/onboarding/' + onboardingNum).update({
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

// function writePlanToFirebaseAndMoveOn(userId, month, year) {
//   var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
//   timeSpentOnPage = timeSpentOnPage.toFixed(1);
//   firebase.database().ref('users/' + userId + '/onboarding/' + onboardingNum).update({
//     timeSpent: timeSpentOnPage,
//     plan: month + "/" + year
//   }, function(error) {
//     if (error) {
//       moveOn("")
//     } else {
//       moveOn("")
//     }
//   });
// }

function writeTimeToFirebaseAndMoveOn(userId) {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  firebase.database().ref('test1_2/' + 'users/' + userId + '/onboarding/' + onboardingNum).update({
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      moveOn("")
    } else {
      moveOn("")
    }
  });
}
