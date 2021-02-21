//Prepare data
let queryString = location.search.substring(1);
let data = queryString.split("|");
let chapterNumText = data[0]; // can be "checkUp"
let chapterNum = parseInt(chapterNumText)
let smallChapterNumText = data[1];
let smallChapterNum = parseInt(smallChapterNumText);
let conceptNumText = data[2];
let conceptNum = parseInt(conceptNumText);
let isDontGetIt = data[3];
let dontGetItNumText = data[4];
let dontGetItNum = parseInt(dontGetItNumText)

var uuid;

var questionID = ""
var isRight = false;
var answer = 0;
var answerSubmited = false;
var whatToShow;

var smallChapter = "";
var concept = "";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const body = document.getElementById("body");
const text1 = document.getElementById("text1");
const btnNo = document.getElementById("btn-1");
const btnYes = document.getElementById("btn-2");
const btnsDiv = document.getElementById("btns");
const questionText = document.getElementById("question-text");
const answerAText = document.getElementById("answer-A");
const answerBText = document.getElementById("answer-B");
const answer1btn = document.getElementById("answer-btn-1");
const answer2btn = document.getElementById("answer-btn-2");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const answerBtnDiv = document.getElementById("answer-btn-div");
const stress = document.getElementById("stress");

// Question
const questionModal = document.getElementById("question-modal");
const email = document.getElementById("email");
const userQuestion = document.getElementById("comments");

// Get the modal
var modal = document.getElementById("myModal");
var modalText = document.getElementById("modal-text");
var modalBtn1 = document.getElementById("modal-btn1");
var modalBtn2 = document.getElementById("modal-btn2");
var modalBtn3 = document.getElementById("modal-btn3");

$(".askBtn")[0].addEventListener("click", writeQuestionToFirebaseAndShowPopUp);
$(".question-close")[0].addEventListener("click", closeQuestionModal);
$(".question-modal-btn")[0].addEventListener("click", sendQuestion);

$(".btn-2")[0].addEventListener("click", writeYesToFirebaseAndMoveOn);
$(".btn-1")[0].addEventListener("click", writeNoToFirebaseAndMoveOn);

$(".answer-btn-1")[0].addEventListener("click", writeAnswer1);
$(".answer-btn-2")[0].addEventListener("click", writeAnswer2);
$(".submit-btn")[0].addEventListener("click", writeAnswerToFirebase);
$(".next-btn")[0].addEventListener("click", questionMoveOn);

$(".close")[0].addEventListener("click", closeModal);
$(".modal-btn2")[0].addEventListener("click", modalBtn2Tapped);
$(".modal-btn1")[0].addEventListener("click", modalBtn1Tapped);
$(".modal-btn3")[0].addEventListener("click", modalBtn3Tapped);

getUUID()
getText()

$(document).ready(function() {

});

function getUUID() {
  if (localStorage.getItem("uuid") === null) {
    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
  } else {
    uuid = localStorage.getItem("uuid")
  }
}

function getText() {
  if (conceptNum == undefined || conceptNum == "undefined") {
    conceptNum = 0
  }
  if (chapterNumText != "checkUp") {
    let chapterName = chapters[chapterNum]
    console.log("chapterName", chapterName)
    let contentsDict = study_contents[chapterName]
    console.log("contentsDict", contentsDict)
    let smallChapterNamesArray = smallChapters[chapterName]
    console.log("smallChapterNamesArray", smallChapterNamesArray)
    console.log("smallChapterNum", smallChapterNum)
    smallChapter = smallChapterNamesArray[smallChapterNum]
    console.log("smallChapter", smallChapter)
    let conceptsAndTexts = contentsDict[smallChapter]
    console.log("conceptsAndTexts", conceptsAndTexts)
    let concepts = conceptsInSmallChapters[smallChapter]
    console.log("concepts", concepts)
    concept = concepts[conceptNum] //example : "Variable Example"

    var text = "";
    var conceptTitle ="";
    if (isDontGetIt == "1") {
      text = conceptsAndTexts[concept]

    } else {
      conceptTitle = concept + "_" + dontGetItNumText
      text = dontGetItContents[conceptTitle]
    }
    console.log("text", text)

    let questionCheck = concept.substring(0, 2);
    if (questionCheck == "Q_") { // is a question
      let answer1 = questionAnswers[concept][0]
      let answer2 = questionAnswers[concept][1]
      answer1btn.innerHTML = answer1
      answer2btn.innerHTML = answer2
      answerBtnDiv.style.display = "block"
      questionID = concept
      text1.innerHTML = text[0]
      questionText.innerHTML = text[1]
      MathJax.typeset()

      //localStorage.setItem("questionCount", undefined)
      var count = localStorage.getItem("questionCount")
      if (count == undefined || count == "undefined") {
        count = 0
      } else {
        count = parseInt(count)
        count += 1
      }
      localStorage.setItem("questionCount", count)

    } else { // is a concept  study
      text1.innerHTML = text
    }

    prepareBtns(chapterName, smallChapter, concept, conceptTitle)

  } else { // prepare checkUp
    if (smallChapterNum == 0 ) {
      text1.innerHTML = "Okay, so, how are you doing so far?"
      btnYes.innerHTML = "I'M DOING JUST FINE"
      btnNo.innerHTML = "I'M A BIT STRESSED"
    } else if (smallChapterNum == 1 ){// I'm doing okay
      text1.innerHTML = "Great! <br><br> Let's move on."
      btnYes.innerHTML = "NEXT"
      btnNo.style.display = "none"
    } else if (smallChapterNum == 2){ // a bit tired/stressed/anxious
      text1.innerHTML = "<span class='medium'>Got it. No worries!<br><br>Theo will adjust the number of questions and difficulty accordingly."
      btnYes.innerHTML = "OKAY, MOVE ON"
      btnNo.style.display = "none"
      //stress.style.display = "inline-bock"
    }
  }
}

function prepareBtns(chapterName, smallChapterName, conceptName, conceptTitle) {
  if (isDontGetIt == "0") {
    console.log("conceptTitle", conceptTitle)
    let numberOfBtns = dontGetItBtns[conceptTitle]
    console.log("numberOfBtns", numberOfBtns)
    if (numberOfBtns == 1) {
      btnNo.style.display = "none";
    } else {
      btnYes.innerHTML = "Right"
      btnNo.innerHTML = "I STILL DON'T GET IT";
    }
    btnsDiv.style.display = "inline-block";

  } else {
    let btnType = study_btns[chapterName][smallChapterName][conceptName]
    if (btnType == 1) {
      // do nothing (html)
      btnsDiv.style.display = "inline-block";
    } else if (btnType ==2) {
      btnNo.style.display = "none";
      btnsDiv.style.display = "inline-block";
    } else if (btnType ==3) {
      btnNo.style.display = "none";
      btnYes.innerHTML = "GOT IT";
      btnsDiv.style.display = "inline-block";
    } else if (btnType ==0){
      btnsDiv.style.display = "none";
    }
  }
}

function writeYesToFirebaseAndMoveOn() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  if (isDontGetIt == "1") {
    if (chapterNumText == "checkUp") {
      writeCheckUpYesToFireBaseAndMoveOn(timeSpentOnPage)
    } else {
      writeContentsYesToFireBaseAndMoveOn(timeSpentOnPage)
    }

  } else {
    writeIDontGetItBtnYesAnswerToFireBaseAndMoveOn(timeSpentOnPage)
  }
}

function writeIDontGetItBtnYesAnswerToFireBaseAndMoveOn(timeSpentOnPage) {
  var now = new Date().toLocaleString();
  var contentsID = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum + "_dontGetIt_" + dontGetItNum
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + contentsID).update({
    timeSpent: timeSpentOnPage,
    answer : btnYes.innerHTML,
    btnYesTime: now
  }, function(error) {
    if (error) {
      moveOnToNextDontGetIt()
    } else {
      moveOnToNextDontGetIt()
    }
  });
}

function writeContentsYesToFireBaseAndMoveOn(timeSpentOnPage) {
  var now = new Date().toLocaleString();
  var contentsID = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + contentsID).update({
    timeSpent: timeSpentOnPage,
    answer : btnYes.innerHTML,
    btnYesTime: now
  }, function(error) {
    if (error) {
      checkUpOrNextContents()
    } else {
      checkUpOrNextContents()
    }
  });
}

function writeCheckUpYesToFireBaseAndMoveOn(timeSpentOnPage) {
  var now = new Date().toLocaleString();
  var nextConceptNum = localStorage.getItem("nextConceptNum")
  var prevConceptNum = parseInt(nextConceptNum) - 1
  var contentsID = "Q_0_0_" + prevConceptNum + "_" + chapterNumText + "_" + smallChapterNum
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + contentsID).update({
    timeSpent: timeSpentOnPage,
    answer : btnYes.innerHTML,
    btnYesTime: now
  }, function(error) {
    if (error) {
      checkUpOrNextContents()
    } else {
      checkUpOrNextContents()
    }
  });
}

function checkUpOrNextContents() {
  if (chapterNumText == "checkUp" && smallChapterNum == 0) {
    nextCheckUpPage()
  } else if (chapterNumText == "checkUp" && smallChapterNum !=0 ) { // moveon from checkUpToNextContents
    var nextConceptNum = localStorage.getItem("nextConceptNum")
    window.location.href="study.html?" + "0|0" + "|" + nextConceptNum + "|1";
  } else {
    moveOn()
  }
}

function nextCheckUpPage() {
  window.location.href="study.html?checkUp|1|0|1";
}

function nextChekcUpPageWithNotOkay(timeSpentOnPage) {
  var now = new Date().toLocaleString();
  var nextConceptNum = localStorage.getItem("nextConceptNum")
  var prevConceptNum = parseInt(nextConceptNum) - 1
  var contentsID = "Q_0_0_" + prevConceptNum + "_" + chapterNumText + "_" + smallChapterNum

  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + contentsID).update({
    timeSpent: timeSpentOnPage,
    answer : btnNo.innerHTML,
    btnNoTime: now
  }, function(error) {
    if (error) {
      window.location.href="study.html?checkUp|2|0|1";
    } else {
      window.location.href="study.html?checkUp|2|0|1";
    }
  });
}

function writeNoToFirebaseAndMoveOn() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  if (isDontGetIt == "1") {
    if (chapterNumText == "checkUp" && smallChapterNum == 0) {
      nextChekcUpPageWithNotOkay(timeSpentOnPage)
    } else {
      writeContentsBtnNoAnswerToFirebaseAndMoveOn(timeSpentOnPage)
    }
  } else {
    if (chapterNumText == "checkUp" && smallChapterNum == 0) {
      nextChekcUpPageWithNotOkay()
    } else {
      writeDontGetItBtnNoAnswerToFirebaseAndMoveOn(timeSpentOnPage)
    }
  }
}

function writeDontGetItBtnNoAnswerToFirebaseAndMoveOn(timeSpentOnPage) {
  var now = new Date().toLocaleString();
  var contentsID = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + contentsID + '_dontGetIt_' + dontGetItNum).update({
    didPressStillDontGetIt : true,
    stillDontGetItTime: now
  }, function(error) {
    if (error) {
      showQuestionPopUp()
    } else {
      showQuestionPopUp()
    }
  });
}

function writeContentsBtnNoAnswerToFirebaseAndMoveOn(timeSpentOnPage) {
  var now = new Date().toLocaleString();
  var contentsID = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + contentsID).update({
    timeSpent: timeSpentOnPage,
    answer : btnNo.innerHTML,
    btnNoTime: now
  }, function(error) {
    if (error) {
      moveOnToDontGetIt()
      if (chapterNumText == "checkUp" && smallChapterNum == 0) {
        nextCheckUpPage()
      }
    } else {
      moveOnToDontGetIt()

    }
  });
}

function writeAnswer1() {
  answer = 1
  answer1btn.style.backgroundColor = "#E4E6EB"
  answer2btn.style.backgroundColor = ""
  if (correctAnswers[questionID] ==1 ) {
    isRight = true
  } else {
    isRight = false
  }
}

function writeAnswer2() {
  answer = 2
  answer1btn.style.backgroundColor = ""
  answer2btn.style.backgroundColor = "#E4E6EB"
  if (correctAnswers[questionID] ==2) {
    isRight = true
  } else {
    isRight = false
  }
}

function writeAnswerToFirebase() {
  answerSubmited = true;

  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);

  var questionSolvedInThisSession = localStorage.getItem("numQSolved");
  questionSolvedInThisSession += 1
  localStorage.setItem("numQSolved", questionSolvedInThisSession);

  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + questionID).update({
    timeSpent: timeSpentOnPage,
    answer : answer,
    isRight: isRight
  }, function(error) {
    if (error) {
      showAnswer(answer)
    } else {
      showAnswer(answer)
    }
  });
}

function showAnswer() {
  let correctAnswer = correctAnswers[questionID]
  if (correctAnswer == 1){
    answerAText.style.backgroundColor = "green";
    answerAText.style.color = "white";
    answer1btn.style.backgroundColor = "green";

    answerBText.style.backgroundColor = "red";
    answer2btn.style.backgroundColor = "red";
    answerBText.style.color = "white";

    answerAText.innerHTML = "v"
    answerBText.innerHTML = "x"
  } else {
    answerAText.style.backgroundColor = "red";
    answerAText.style.color = "white";
    answer1btn.style.backgroundColor = "red";

    answerBText.style.backgroundColor = "green";
    answerBText.style.color = "white";
    answer2btn.style.backgroundColor = "green";

    answerAText.innerHTML = "x"
    answerBText.innerHTML = "v"
  }

  submitBtn.style.display = "none"
  nextBtn.style.display = "inline-block"
}

function questionMoveOn() {
  let checkUpRule = checkForCheckUp()
  let timeToSignUp = checkForSignUp()

  var nextConceptNum = parseInt(conceptNum) + 1
  localStorage.setItem("nextConceptNum", nextConceptNum)
  localStorage.setItem("chapterNum", chapterNum)

  if (checkUpRule) {
    localStorage.setItem("checkUpShownBefore", true)
    moveOnToCheckUp()
  } else {
    if (timeToSignUp) {
      moveOnToSignUp()
    } else {
      moveOn()
    }
  }
}

function moveOnToSignUp() {
  var url = "signUp.html";
  window.location.href = url;
}

function moveOnToCheckUp() {
  window.location.href="study.html?checkUp|0|0|1";
}

function checkForCheckUp() {
  var questionCount = localStorage.getItem("questionCount")
  if (questionCount != undefined && questionCount != "undefined") {
    questionCount = parseInt(questionCount)
    if (questionCount == 3) {
      return true
    }
  } else {
    return false
  }
}

function checkForSignUp() {
  var questionCount = localStorage.getItem("questionCount")
  console.log("qcount", questionCount)
  if (questionCount != undefined && questionCount != "undefined") {
    questionCount = parseInt(questionCount)
    if (questionCount == 6) {
      return true
    }
  } else {
    return false
  }
}

// function showStressPopUp() {
//   modal.style.display = "inline-block"
//   modalText.innerHTML = "You are slowing down a bit. <br><br>Do you feel stressed now?<br>If you are, Theo's AI will see what it can do"
//   modalBtn1.innerHTML = "NO, I'M DOING OKAY"
//   modalBtn2.innerHTML = "YES, I FEEL STRESSED"
// }
//
// function showSlowPopUp() {
//   modal.style.display = "inline-block"
//   modalText.innerHTML = "You are doing great, but that was a bit slow. <br><br>Was the question too difficult?<br>If it was, Theo's AI will adjust the difficulty"
//   modalBtn1.innerHTML = "NO, IT'S OKAY"
//   modalBtn2.innerHTML = "YES, IT WAS DIFFICULT"
// }
//
// function showFastPopUp() {
//   modal.style.display = "inline-block"
//   modalText.innerHTML = "Wow! that was fast. <br>Was the question too easy?<br><br>If you feel so, Theo's AI will adjust the difficulty"
//   modalBtn1.innerHTML = "NO, IT'S OKAY"
//   modalBtn2.innerHTML = "YES, IT WAS TOO EASY"
// }

function closeModal() {
  modal.style.display = "none"
}

function closeQuestionModal() {
  questionModal.style.display = "none"
}

function modalBtn1Tapped() { // no okay
  console.log("modalBtn1Tapped")
  modalBtn1.style.display = "none"
  modalBtn2.style.display = "none"
  modalBtn3.style.display = "inline-block"
  modalBtn3.innerHTML = "Next"
  modalText.innerHTML = "Great then, let's continue"

  saveModalAnswerToFB(whatToShow, "No")
}

function modalBtn2Tapped() {// yes adjust
  modalBtn1.style.display = "none"
  modalBtn2.style.display = "none"
  modalBtn3.style.display = "inline-block"
  if (whatToShow == "stress") {
    modalText.innerHTML = "Got it <br> Theo's AI will keep that in mind and prepare the next contents"
  } else if (whatToShow == "slow") {
    modalText.innerHTML = "Got it! <br> Difficulty fot the next contents will be adjusted"
  } else if (whatToShow == "fast") {
    modalText.innerHTML = "Got it! <br> Difficulty fot the next contents will be adjusted"
  }

  saveModalAnswerToFB(whatToShow, "Yes")
}

function modalBtn3Tapped() {
  modal.style.display = "none"
  moveOn()
}

function saveModalAnswerToFB(modalContents, answer) {
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + questionID).update({
    modalContents: modalContents,
    modalAnswer: answer
  }, function(error) {
    if (error) {
      showAnswer(answer)
    } else {
      showAnswer(answer)
    }
  });
}

function moveOn() {
  let availableNum = conceptsInSmallChapters[smallChapter].length - 1
  let nextSmallChapterNum = smallChapterNum + 1
  let nextConceptNum = conceptNum + 1
  if (availableNum >= nextConceptNum) {
    window.location.href="study.html?" + chapterNum + "|" + smallChapterNum + "|" + nextConceptNum + "|1"; // 1 is false for DontGetIt // 0 is true
  } else {
    if (nextSmallChapterNum == 2) { // no more concnets
      // move on to sign in
      window.location.href="underconstruction.html"
    } else {
      window.location.href="study.html?" + chapterNum + "|" + nextSmallChapterNum + "|0" + "|1"; // 1 is false for DontGetIt // 0 is true
    }
  }
}

function moveOnToDontGetIt() {
  if (isDontGetIt == "1") {
    window.location.href="study.html?" + chapterNum + "|" + smallChapterNum + "|" + conceptNum + "|0|0";
  } else {
    moveOnToNextDontGetIt()
  }
}

function moveOnToNextDontGetIt() {
  var nextDontGetItNum = dontGetItNum + 1
  var nextDontGetItTitle = concept + "_" + nextDontGetItNum.toString()
  var text = dontGetItContents[nextDontGetItTitle]
  console.log("text", text)
  if (text == "undefined" || text == undefined){
    moveBackToContentsFromDontGetIt()
  } else {
    window.location.href="study.html?" + chapterNum + "|" + smallChapterNum + "|" + conceptNum + "|0|" + nextDontGetItNum;
  }
}

function moveBackToContentsFromDontGetIt() {
  let nextSmallChapterNum = smallChapterNum + 1
  let nextConceptNum = conceptNum + 1
  window.location.href="study.html?" + chapterNum + "|" + smallChapterNum + "|" + nextConceptNum + "|1";
}

function writeQuestionToFirebaseAndShowPopUp() {
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + chapterNum + '/'  + smallChapterNum).update({
    questionButtonTapped : true
  }, function(error) {
    if (error) {
      showQuestionPopUp()
    } else {
      showQuestionPopUp()
    }
  });
}

function showQuestionPopUp() {
  questionModal.style.display = "inline-block"
}

function sendQuestion() {
  var now = new Date().toLocaleString();
  var contentsID = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum + "_dontGetIt_" + dontGetItNum
  firebase.database().ref('mvp_1_0/' + 'users/' + uuid + '/' + contentsID).update({
    question : userQuestion.value,
    email: email.value,
    questionSubmissionTime: now
  }, function(error) {
    if (error) {
      showQuestionSentMessage()
    } else {
      showQuestionSentMessage()
    }
  });
}

function showQuestionSentMessage() {
  alert("I got your question 😊 I will respond you asap -LJ")
  questionModal.style.display = "none"
}
