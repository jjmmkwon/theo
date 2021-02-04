// Prepare data
var queryString = location.search.substring(1);
var data = queryString.split("|");
var uuid = data[0];
var digQNum = data[1];
var digQCount = 8;

var prevAnswer;
var subject = "";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theoLink = document.getElementById("brand-link");
const signInAndOut = document.getElementById("signInAndOut");

////////////Contents//////////
const question = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const referenceImage = document.getElementById("reference-image");
const buttonsDiv = document.getElementById("buttons");
const answerTextA = document.getElementById("answer_text_A");
const answerTextB = document.getElementById("answer_text_B");
const answerTextC = document.getElementById("answer_text_C");
const answerTextD = document.getElementById("answer_text_D");
const answerTextE = document.getElementById("answer_text_E");
const answerA = document.getElementById("answer_A");
const answerB = document.getElementById("answer_B");
const answerC = document.getElementById("answer_C");
const answerD = document.getElementById("answer_D");
const nextBtnDiv = document.getElementById("next-button");

$(".answer_A")[0].addEventListener("click", writeBtn1ToFirebaseAndMoveOn);
$(".answer_B")[0].addEventListener("click", writeBtn2ToFirebaseAndMoveOn);
$(".answer_C")[0].addEventListener("click", writeBtn3ToFirebaseAndMoveOn);
$(".answer_D")[0].addEventListener("click", writeBtn4ToFirebaseAndMoveOn);
$(".answer_E")[0].addEventListener("click", writeBtn5ToFirebaseAndMoveOn);

var screenWidth = screen.width;
if(screenWidth < 480) { //mobile
  questionImage.style.height = "70px";
  referenceImage.style.height = "450px";
  adjustAnswerSizes("40px");
}

prepareView();

function prepareView() {
  prevAnswer = localStorage.getItem("subject");
  subject = getSubjectName(prevAnswer)

  if (prevAnswer == 1) { //Algebra1
    prepareAlgebra1()
  } else if (prevAnswer ==2 ) { //Geometry
    prepareGeometry()
  } else if (prevAnswer ==3 ) { //Algebra2
    prepareAlgebra2()
  } else if (prevAnswer ==4) { // pre-cal
    preparePreCal()
  } else if (prevAnswer ==5) { // Cal
    prepareCal()
  }
}

$(document).ready(function() {
  checkForLogIn();
});

function adjustAnswerSizes(size){
  let answerImages = [answerA, answerB, answerC, answerD];
  for (var i=0; i<answerImages.length; i++) {
    answerImages[i].style.height = size
  }
  let answerTexts= [answerTextA, answerTextB, answerTextC, answerTextD, answerTextE];
  for (var i=0; i<answerTexts.length; i++) {
    answerTexts[i].style.fontSize = size
  }
}

function prepareAlgebra1() {
  if (digQNum == 0) {
    questionImage.src = "../images/Diagnostic Questions/Algebra1/1.png"
    referenceImage.style.display = "none";
    answerA.src = "../images/Diagnostic Questions/Algebra1/1_a.png"
    answerB.src = "../images/Diagnostic Questions/Algebra1/1_b.png"
    answerC.src = "../images/Diagnostic Questions/Algebra1/1_c.png"
    answerD.src = "../images/Diagnostic Questions/Algebra1/1_d.png"

    if(screenWidth < 480) { //mobile
      questionImage.style.height = "120px";
      adjustAnswerSizes("80px")
      answerTextE.style.fontSize = "25px";
    } else {
      questionImage.style.height = "80px";
    }
  } else if (digQNum == 1) {
    questionImage.src = "../images/Diagnostic Questions/Algebra1/2.png";
    referenceImage.src = "../images/Diagnostic Questions/Algebra1/2_graph.png";
    answerTextA.innerHTML = "A"
    answerTextB.innerHTML = "B"
    answerTextC.innerHTML = "C"
    answerTextD.innerHTML = "D"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 2) {
    questionImage.src = "../images/Diagnostic Questions/Algebra1/3.png";
    referenceImage.style.display = "none";
    answerTextA.innerHTML = "A: 1"
    answerTextB.innerHTML = "B: 3"
    answerTextC.innerHTML = "C: 0"
    answerTextD.innerHTML = "D: 6"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 3) {
    questionImage.src = "../images/Diagnostic Questions/Algebra1/4.png";
    referenceImage.style.display = "none";
    answerA.src = "../images/Diagnostic Questions/Algebra1/4_a.png"
    answerB.src = "../images/Diagnostic Questions/Algebra1/4_b.png"
    answerC.src = "../images/Diagnostic Questions/Algebra1/4_c.png"
    answerD.src = "../images/Diagnostic Questions/Algebra1/4_d.png"
    answerA.style.height = "140px"
    answerB.style.height = "140px"
    answerC.style.height = "140px"
    answerD.style.height = "140px"
  }
}

function prepareGeometry() {
  if (digQNum == 0) {
    questionImage.src = "../images/Diagnostic Questions/Geometry/1.png"
    referenceImage.src = "../images/Diagnostic Questions/Geometry/1_graph.png"
    answerTextA.innerHTML = "A"
    answerTextB.innerHTML = "D"
    answerTextC.innerHTML = "F"
    answerTextD.innerHTML = "H"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 1) {
    questionImage.src = "../images/Diagnostic Questions/Geometry/2.png";
    referenceImage.src = "../images/Diagnostic Questions/Geometry/2_graph.png"
    answerTextA.innerHTML = "A: 60"
    answerTextB.innerHTML = "B: 12"
    answerTextC.innerHTML = "C: 6"
    answerTextD.innerHTML = "D: can't tell"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 2) {
    questionImage.src = "../images/Diagnostic Questions/Geometry/3.png";
    referenceImage.src = "../images/Diagnostic Questions/Geometry/3_graph.png"
    answerTextA.innerHTML = "A: 2/3"
    answerTextB.innerHTML = "B: 1"
    answerTextC.innerHTML = "C: 5/6"
    answerTextD.innerHTML = "D: 4/3"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 3) {
    questionImage.style.height = "170px"
    questionImage.src = "../images/Diagnostic Questions/Geometry/4.png";
    referenceImage.src = "../images/Diagnostic Questions/Geometry/4_graph.png"
    answerTextA.innerHTML = "A:"
    answerTextB.innerHTML = "B:"
    answerTextC.innerHTML = "C:"
    answerTextD.innerHTML = "D:"
    answerA.src = "../images/Diagnostic Questions/Geometry/4_a.png"
    answerB.src = "../images/Diagnostic Questions/Geometry/4_b.png"
    answerC.src = "../images/Diagnostic Questions/Geometry/4_c.png"
    answerD.src = "../images/Diagnostic Questions/Geometry/4_d.png"
    answerA.style.height = "20px"
    answerB.style.height = "20px"
    answerC.style.height = "14px"
    answerD.style.height = "20px"
  }
}

function prepareAlgebra2() {
  if (digQNum == 0) {
    console.log("digQ 0")
    questionImage.src = "../images/Diagnostic Questions/Algebra2/1.png"
    referenceImage.style.display = "none";
    answerA.src = "../images/Diagnostic Questions/Algebra2/1_a.png"
    answerB.src = "../images/Diagnostic Questions/Algebra2/1_b.png"
    answerC.src = "../images/Diagnostic Questions/Algebra2/1_c.png"
    answerD.src = "../images/Diagnostic Questions/Algebra2/1_d.png"
    answerA.style.height = "20px"
    answerB.style.height = "20px"
    answerC.style.height = "20px"
    answerD.style.height = "25px"
  } else if (digQNum == 1) {
    questionImage.src = "../images/Diagnostic Questions/Algebra2/2.png";
    referenceImage.style.display = "none";
    answerTextA.innerHTML = "A: 9"
    answerTextB.innerHTML = "B: 27"
    answerTextC.innerHTML = "C: 21"
    answerTextD.innerHTML = "D: -21"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 2) {
    questionImage.style.height = "100px"
    questionImage.src = "../images/Diagnostic Questions/Algebra2/3.png";
    referenceImage.src = "../images/Diagnostic Questions/Algebra2/3_graph.png"
    answerTextA.innerHTML = "A: 0"
    answerTextB.innerHTML = "B: -3 and 1"
    answerTextC.innerHTML = "C: -4"
    answerTextD.innerHTML = "D: -1 and 3"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 3) {
    questionImage.src = "../images/Diagnostic Questions/Algebra2/4.png";
    referenceImage.style.display = "none";
    answerTextA.innerHTML = "A: [9  1]"
    answerTextB.innerHTML = "B: [4  5]"
    answerTextC.innerHTML = "C: [1  9]"
    answerTextD.innerHTML = "D: [5  4]"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  }
}

function preparePreCal() {
  if (digQNum == 0) {
    questionImage.src = "../images/Diagnostic Questions/PreCal/0.png";
    referenceImage.style.display = "none"
    answerA.src = "../images/Diagnostic Questions/PreCal/0_a.png"
    answerB.src = "../images/Diagnostic Questions/PreCal/0_b.png"
    answerC.src = "../images/Diagnostic Questions/PreCal/0_c.png"
    answerD.src = "../images/Diagnostic Questions/PreCal/0_d.png"
    answerA.style.height = "50px"
    answerB.style.height = "20px"
    answerC.style.height = "20px"
    answerD.style.height = "20px"
  } else if (digQNum == 1) {
    questionImage.style.height = "80px"
    questionImage.src = "../images/Diagnostic Questions/PreCal/1.png"
    referenceImage.style.display = "none"
    answerA.src = "../images/Diagnostic Questions/PreCal/1_a.png"
    answerB.src = "../images/Diagnostic Questions/PreCal/1_b.png"
    answerC.src = "../images/Diagnostic Questions/PreCal/1_c.png"
    answerD.src = "../images/Diagnostic Questions/PreCal/1_d.png"
    answerA.style.height = "140px"
    answerB.style.height = "140px"
    answerC.style.height = "140px"
    answerD.style.height = "140px"
  } else if (digQNum == 2) {
    questionImage.style.height = "80px"
    questionImage.src = "../images/Diagnostic Questions/PreCal/2.png";
    referenceImage.src = "../images/Diagnostic Questions/PreCal/2_graph.png"
    answerTextA.innerHTML = "A: 1"
    answerTextB.innerHTML = "B: 2"
    answerTextC.innerHTML = "C: 3"
    answerTextD.innerHTML = "D: 4"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 3) {
    questionImage.src = "../images/Diagnostic Questions/PreCal/3.png";
    referenceImage.style.display = "none"
    answerTextA.innerHTML = "A: i"
    answerTextB.innerHTML = "B: 1"
    answerTextC.innerHTML = "C: 0"
    answerTextD.innerHTML = "D: -1"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  }
}

function prepareCal() {
  if (digQNum == 0) {
    questionImage.src = "../images/Diagnostic Questions/Cal/1.png"
    referenceImage.style.display = "none"
    answerTextA.innerHTML = "A: 5"
    answerTextB.innerHTML = "D: -5"
    answerTextC.innerHTML = "F: 0"
    answerTextD.innerHTML = "H: 1"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  } else if (digQNum == 1) {
    questionImage.style.height = "100px"
    questionImage.src = "../images/Diagnostic Questions/Cal/2.png";
    referenceImage.style.display = "none"
    answerA.src = "../images/Diagnostic Questions/Cal/2_a.png"
    answerB.src = "../images/Diagnostic Questions/Cal/2_b.png"
    answerC.src = "../images/Diagnostic Questions/Cal/2_c.png"
    answerD.src = "../images/Diagnostic Questions/Cal/2_d.png"
    answerA.style.height = "20px"
    answerB.style.height = "20px"
    answerC.style.height = "20px"
    answerD.style.height = "20px"
  } else if (digQNum == 2) {
    questionImage.src = "../images/Diagnostic Questions/Cal/3.png";
    referenceImage.src = "../images/Diagnostic Questions/Cal/3_graph.png"
    answerA.src = "../images/Diagnostic Questions/Cal/3_a.png"
    answerB.src = "../images/Diagnostic Questions/Cal/3_b.png"
    answerC.src = "../images/Diagnostic Questions/Cal/3_c.png"
    answerD.src = "../images/Diagnostic Questions/Cal/3_d.png"
    answerA.style.height = "40px"
    answerB.style.height = "40px"
    answerC.style.height = "40px"
    answerD.style.height = "40px"
  } else if (digQNum == 3) {
    questionImage.style.height = "100px"
    questionImage.src = "../images/Diagnostic Questions/Cal/4.png";
    referenceImage.style.display = "none"
    answerTextA.innerHTML = "A: 2x"
    answerTextB.innerHTML = "B: 1"
    answerTextC.innerHTML = "C: 4"
    answerTextD.innerHTML = "D: 2"
    answerA.style.display = "none"
    answerB.style.display = "none"
    answerC.style.display = "none"
    answerD.style.display = "none"
  }
}

function checkForLogIn() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) { // already a user. change button.
      console.log("is user")
      theoLink.href = "customCurriculum.html";
      signInAndOut.innerHTML = "Sign Out";
      const userId = firebase.auth().currentUser.uid;
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

function moveOn(answerNum) {
  if (digQNum == 0) {
    window.location.href = "diagnosticQuestion.html?" + uuid + "|1";
  } else if (digQNum == 1) {
    let goOn = checkIfUserCanGoOn()
    if (goOn == false) {
      window.location.href = "pre-test-intro.html?" + uuid;
    } else {
      window.location.href = "diagnosticQuestion.html?" + uuid + "|2";
    }
  } else if (digQNum == 2) {
    let goOn = checkIfUserCanGoOn()
    if (goOn == false) {
      window.location.href = "pre-test-intro.html?" + uuid;
    } else {
      window.location.href = "diagnosticQuestion.html?" + uuid + "|3";
    }
  } else if (digQNum == 3) {
    window.location.href = "pre-test-intro.html?" + uuid;
  }
}

function checkIfUserCanGoOn() {
  if (digQNum == 1) { // second question
    let answerTo1 = localStorage.getItem(subject + "-0")
    let answerTo2 = localStorage.getItem(subject + "-1")
    if (answerTo1 == "false" && answerTo2 == "false") {
      return false
    } else {
      return true
    }
  } else if (digQNum == 2) { // third question
    var count = 0
    if (localStorage.getItem(subject + "-0") == "false") {
      count += 1
    }
    if (localStorage.getItem(subject + "-1") == "false") {
      count += 1
    }
    if (localStorage.getItem(subject + "-2") == "false") {
      count += 1
    }
    if (count >= 2) {
      return false
    } else {
      return true
    }
  }
}

function isRight(answer) {
  let correctAnswers = {
    1 : [3, 3, 4, 4], // algebra1
    2 : [4, 2, 1, 4], //geometry
    3 : [3, 2, 2, 1], //algebra2
    4 : [1, 3, 3, 4], //precal
    5 : [2, 3, 1, 4] //cal
  }

  let correctAnswer = correctAnswers[prevAnswer][digQNum]
  if (answer == correctAnswer) {
    console.log("true")
    return true
  } else {
    console.log("false")
    return false
  }
}

function writeBtn1ToFirebaseAndMoveOn() {
  saveAnswerAndMoveOn(1)
}
function writeBtn2ToFirebaseAndMoveOn() {
  saveAnswerAndMoveOn(2)
}
function writeBtn3ToFirebaseAndMoveOn() {
  saveAnswerAndMoveOn(3)
}
function writeBtn4ToFirebaseAndMoveOn() {
  saveAnswerAndMoveOn(4)
}
function writeBtn5ToFirebaseAndMoveOn() {
  saveAnswerAndMoveOn(5)
}

function saveAnswerAndMoveOn(answer) {
  // const question = "diagnosticQ_" + digQNum
  //setNextQuestionsFalse()
  // localStorage.setItem(question, isRight)
  writeToFirebaseAndMoveOn(uuid, answer)
}

// function setNextQuestionsFalse() {
//   console.log("setNextQuestionsFalse")
//   nextNum = parseInt(digQNum) + 1
//   console.log("next is", nextNum)
//   for (i = nextNum; i < 8; i++) {
//     console.log("i is", i)
//     const qNum = "diagnosticQ_" + i.toString()
//     localStorage.setItem(qNum, false)
//   }
// }

function writeToFirebaseAndMoveOn(userId, answer) {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  let right = isRight(answer)
  localStorage.setItem(subject + "-"  + digQNum, right)
  firebase.database().ref('users/' + userId + '/diagnostic questions/' + digQNum).update({
    timeSpent: timeSpentOnPage,
    answer: answer,
    isRight: right
  }, function(error) {
    if (error) {
      moveOn(answer)
    } else {
      moveOn(answer)
    }
  });
}
