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

var grade;
var prevGrade;

var isRight = false;
var answer = 0;
var answerSubmited = false;
var whatToShow;

var chapterName = "";
var smallChapter = "";
var concept = "";
var questionID;
var conceptsInSmallChapters;
var isFillInTheBlank = false;
var isDoYouKnow = false

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const body = document.getElementById("body");
const contentsDiv = document.getElementById("contents-div");
const text1 = document.getElementById("text1");
const btnNo = document.getElementById("btn-1");
const btnYes = document.getElementById("btn-2");
const btnsDiv = document.getElementById("btns");
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

// MoveToModal
var moveToModalSingleVar = document.getElementById("moveToModal_singleVar");
var moveToModalTwoVar = document.getElementById("moveToModal_twoVar");
var modalBtns = $(".moveToModal-btn")

// Modal Buttons Pressed
$(".moveToModal-btn")[0].addEventListener("click", moveToSingelVarAddition);
$(".moveToModal-btn")[1].addEventListener("click", moveToSingelVarSubtraction);
$(".moveToModal-btn")[2].addEventListener("click", moveToTwoVarGraph);
$(".moveToModal-btn")[3].addEventListener("click", moveToTwoVarSubstitution);

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

//moveToModal btns
$(".notWhatIWant-btn")[0].addEventListener("click", showAvailable);
$(".close")[1].addEventListener("click", closeShowAvailable);
$(".close")[2].addEventListener("click", closeShowAvailable);


getUUID()
getGrades()
getText()
//localStorage.setItem("questionCount", undefined)
console.log("count", localStorage.getItem("questionCount"))


$(document).ready(function() {
  for (var i = 0; i < modalBtns.length; i++) {
    modalBtns[i].addEventListener("click", function(){
      moveOnTo(modalBtns, i);
    }, false);
  }

});

function moveOnTo(modalBtns, i) {
  var title = modalBtns[0].innerHTML;
}

function getGrades(){
  grade = localStorage.getItem("grade")
  prevGrade = localStorage.getItem("prev-grade")

  console.log("grade is", grade)
}

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
  if (chapterNumText != "checkUp") { // STUDY
    let dataReturned = getData()
    var studyData = dataReturned[0]
    var conceptTitle = dataReturned[1]

    let questionCheck = concept.substring(0, 2);
    if (questionCheck == "Q_") { // QUESTION
      questionID = concept
      isFillInTheBlank = checkIfFillInTheBlank(smallChapter, concept)
      if (isFillInTheBlank) {
        prepareFillInTheBlank(chapterName, smallChapter, concept, studyData)
      } else {
        prepareMultipleChoiceQuestion(concept, studyData)
      }
    } else { // CONCEPT STUDY
      prepareConceptStudy(chapterName, smallChapter, concept, studyData)
    }
    prepareBtns(chapterName, smallChapter, concept, conceptTitle)

  } else { // CHECKUP
    prepareCheckUp()
  }
}

function prepareConceptStudy(chapterName, smallChapter, concept, studyData) {
  //studyData is data array. could be "any text," or "image."
  for (var i = 0; i<studyData.length; i++) {
    let data = studyData[i]
    // add to contents-div
    if (data != "image") { // TEXT
      const p = document.createElement("p");
      p.innerHTML = studyData[i];
      p.classList.add("text1");
      contentsDiv.appendChild(p);
      let check = study_contents[chapterName][smallChapter][concept + "_style"]
      if (check != undefined && check != "undefined") {
        let styleData = check[i]
        if (styleData != undefined && styleData != "undefined" && styleData != "") {
          let styles = styleData.split(" ");
          for (var m=0; m<=styles.length; m++) {
            p.classList.add(styles[m])
          }
        }
      }
    } else { // IMAGE
      const image = document.createElement("img");
      let fileName = study_contents[chapterName][smallChapter][concept + "_img_urls"][i]
      let source = "../images/" + fileName
      let size = study_contents[chapterName][smallChapter][concept + "_img_sizes"][i]
      let width = size[0]
      let height = size[1]
      image.src = source;
      image.classList.add("image");
      image.style.width = width
      image.style.height = height
      contentsDiv.appendChild(image);

    }
  }
}

function checkIfFillInTheBlank(smallChapterTitle, questionID) {
  var fillIntheBlankQuestionIDs = fillInTheBlank[smallChapterTitle];
  if (fillIntheBlankQuestionIDs == undefined || fillIntheBlankQuestionIDs == "undefined") {
    return false
  } else {
    var isFillInTheBlank = fillIntheBlankQuestionIDs.includes(questionID)
    return isFillInTheBlank
  }
}

function getData() {
  console.log("getData")
  chapterName = chapters[chapterNum]
  let contentsDict = study_contents[chapterName]
  let smallChapterNamesArray = smallChapters[chapterName]
  smallChapter = smallChapterNamesArray[smallChapterNum]
  let conceptsAndTexts = contentsDict[smallChapter]
  getConceptsInSmallChapters()
  let concepts = conceptsInSmallChapters[smallChapter]
  concept = concepts[conceptNum] //example : "Variable Example"
  console.log("concepts", concepts)
  console.log("conceptNum", conceptNum)
  let firstWord = concept.split("_")[0];
  if (firstWord == "DoYouKnow"){
    isDoYouKnow = true
  }
  var data = getTextData(conceptsAndTexts)
  return data
}

function getConceptsInSmallChapters() {
  if (grade == "A") {
    conceptsInSmallChapters = conceptsInSmallChaptersForB
  } else if (grade == "B") {
    conceptsInSmallChapters = conceptsInSmallChaptersForB
  } else if (grade == "C") {
    conceptsInSmallChapters = conceptsInSmallChaptersForD
  } else if (grade == "D") {
    conceptsInSmallChapters = conceptsInSmallChaptersForD
  }
}

function getTextData(conceptsAndTexts) {
  var conceptTitle = ""
  var text = ""
  if (isDontGetIt == "1") {
    //console.log("conceptsAndTexts", conceptsAndTexts)
    text = conceptsAndTexts[concept]
  } else {
    conceptTitle = concept + "_" + dontGetItNumText
    text = dontGetItContents[conceptTitle]
  }
  return [text, conceptTitle]
}

function prepareCheckUp() {
  const text1 = document.createElement("text1");
  text1.classList.add("text1");
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
  contentsDiv.appendChild(text1);
  btnsDiv.style.display = "inline-block";
}

function prepareFillInTheBlank(chapterName, smallChapter, questionID, studyData) {
  var data = studyData["Q"]

  const text1 = document.createElement("p");
  text1.classList.add("text1");
  text1.innerHTML = data[0];
  contentsDiv.appendChild(text1);

  const questionText = document.createElement("p");
  questionText.classList.add("question-text");
  questionText.innerHTML = data[1];
  questionText.style.textAlign ="left"
  answerBtnDiv.appendChild(questionText);
  answerBtnDiv.insertBefore(questionText, answerAText);

  answerBtnDiv.classList.add("col-8")
  answerBtnDiv.style.display = "inline-block"
  answer1btn.style.display = "none"
  answer2btn.style.display = "none"
  answerAText.style.display = "none"
  answerBText.style.display = "none"

  var data = study_contents[chapterName][smallChapter][questionID]
  var numberOfsteps = data["numberOfSteps"]

  for (var i=1; i <= numberOfsteps; i++) {
    // Add text
    const div = document.createElement("div");
    if (data[i + "_txt"] != "undefined" && data[i + "_txt"] != undefined) {
      const stepTxt = "<span class='bold'>Step" + i + "</span>: " + data[i + "_txt"]
      const stepTxtNode = document.createElement("p");
      stepTxtNode.style.textAlign ="left"
      stepTxtNode.innerHTML = stepTxt
      stepTxtNode.classList.add("stepTxtNode");
      div.appendChild(stepTxtNode);
      answerBtnDiv.insertBefore(div, submitBtn);
    }

    // Add input
    const inputDiv = document.createElement("div");
    inputDiv.style.textAlign = "left"
    inputDiv.classList.add("inputDiv");
    const fillData = data[i + "_fill"]

    for (var m=0; m<fillData.length; m++) {
      const content = fillData[m];
      if (content != "input") {
        const inputText = document.createElement("p");
        inputText.innerHTML =  fillData[m]
        inputText.classList.add("inputText");
        inputDiv.appendChild(inputText);
      } else {
        const input = document.createElement("input");
        const size = data[i + "_fill_size"][m]
        input.classList.add("input");
        input.style.width = size + "px";
        inputDiv.appendChild(input);
      }
    }
    answerBtnDiv.insertBefore(inputDiv, submitBtn);
  }

  MathJax.typeset()
}

function prepareMultipleChoiceQuestion(questionID, studyData) {
  let answer1 = questionAnswers[questionID][0]
  let answer2 = questionAnswers[questionID][1]
  answer1btn.innerHTML = answer1
  answer2btn.innerHTML = answer2
  answerBtnDiv.style.display = "block"
  questionID = concept
  localStorage.setItem("questionID", questionID)

  let answerImageUrlID = questionID + "_answer_img_urls"
  let answerUrls = study_contents[chapterName][smallChapter][answerImageUrlID]
  if (answerUrls != undefined && answerUrls != "undefined") {
    prepareQuestionAnswerImage(questionID, answerUrls, [answer1btn, answer2btn])
  }

  const text1 = document.createElement("p");
  text1.classList.add("text1");
  text1.innerHTML = studyData[0]
  contentsDiv.appendChild(text1);

  const questionText = document.createElement("p");
  questionText.classList.add("question-text");
  questionText.innerHTML = studyData[1]
  answerBtnDiv.appendChild(questionText);
  answerBtnDiv.insertBefore(questionText, answerAText);

  let imageUrlID = questionID + "_img_url"
  let url = study_contents[chapterName][smallChapter][imageUrlID]
  if (url != undefined && url != "undefined") {
    prepareQuestionImage(questionID, url)
  }

  MathJax.typeset()

  recordQuestionCount()
}

function prepareQuestionAnswerImage(questionID, urls, btns) {
  let sizes = study_contents[chapterName][smallChapter][questionID + "_answer_img_sizes"]
  let width = sizes[0]
  let height = sizes[1]

  for (var i = 0; i<btns.length; i++){
    let url = urls[i];
    let source = "../images/" + url
    console.log("source is", source)
    btns[i].innerHTML = '<img src=' + source + '>';
    btns[i].style.width = width
  }
}

function prepareQuestionImage(questionID, url) {
  let sizes = study_contents[chapterName][smallChapter][questionID + "_img_sizes"]
  let width = sizes[0]
  let height = sizes[1]

  const image = document.createElement("img");
  let source = "../images/" + url
  image.classList.add(".image-ctr");
  image.src = source;
  image.style.width = width
  image.style.height = height
  contentsDiv.appendChild(image);
}

function recordQuestionCount() {
  var count = localStorage.getItem("questionCount")
  if (count == undefined || count == "undefined") {
    count = 0
  } else {
    count = parseInt(count)
    count += 1
  }
  localStorage.setItem("questionCount", count)
}

function prepareBtns(chapterName, smallChapterName, conceptName, conceptTitle) {
  if (isDontGetIt == "0") {
    let numberOfBtns = dontGetItBtns[conceptTitle]
    if (numberOfBtns == 1) {
      btnNo.style.display = "none";
    } else {
      btnYes.innerHTML = "Right"
      btnNo.innerHTML = "I STILL DON'T GET IT";
    }
    btnsDiv.style.display = "inline-block";

  } else {
    let btnDict = study_btns[chapterName]
    if (btnDict == "undefined" || btnDict == undefined) {
      if (isDoYouKnow) { // yes and no btns
        btnNo.innerHTML = "I don't think so";
        btnYes.innerHTML = "Yes";
        btnsDiv.style.display = "inline-block";
      } else { // type 2
        btnNo.style.display = "none";
        btnsDiv.style.display = "inline-block";
      }
    } else {
      let data = btnDict[smallChapterName]
      if (data != undefined && data != "undefined"){
        let btnType = data[conceptName]
        if (btnType == 1) {
          // do nothing (html)
          btnNo.style.display = "none";////////////// delete i don't get it button
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
        } else { // byntype undefined
          btnNo.style.display = "none";
          btnsDiv.style.display = "inline-block";
        }
      } else {
        btnNo.style.display = "none";
        btnsDiv.style.display = "inline-block";
      }
    }
  }
}

function writeYesToFirebaseAndMoveOn() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = Math.round(timeSpentOnPage)
  //timeSpentOnPage = timeSpentOnPage.toFixed(1);
  if (isDontGetIt == "1") {
    if (chapterNumText == "checkUp") {
      writeCheckUpYesToFireBaseAndMoveOn(timeSpentOnPage)
    } else {
      writeContentsYesToFireBaseAndMoveOn(timeSpentOnPage)
    }

  } else {
    if (isDoYouKnow) {

    } else {
      writeIDontGetItBtnYesAnswerToFireBaseAndMoveOn(timeSpentOnPage)
    }
  }
}

function writeIDontGetItBtnYesAnswerToFireBaseAndMoveOn(timeSpentOnPage) {
  var now = new Date().toLocaleString();
  var contentsID = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum + "_dontGetIt_" + dontGetItNum
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + contentsID).update({
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
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + contentsID).update({
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
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + contentsID).update({
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
    var currentChapterNum = localStorage.getItem("chapterNum")
    window.location.href="study.html?" + currentChapterNum + "|0" + "|" + nextConceptNum + "|1";
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

  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + contentsID).update({
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
  timeSpentOnPage = Math.round(timeSpentOnPage)
  //timeSpentOnPage = timeSpentOnPage.toFixed(1);
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
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + contentsID + '_dontGetIt_' + dontGetItNum).update({
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
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + contentsID).update({
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
  let questionID = localStorage.getItem("questionID")
  if (correctAnswers[questionID] == 1 ) {
    isRight = true
  } else {
    isRight = false
  }
}

function writeAnswer2() {
  answer = 2
  answer1btn.style.backgroundColor = ""
  answer2btn.style.backgroundColor = "#E4E6EB"
  let questionID = localStorage.getItem("questionID")
  if (correctAnswers[questionID] ==2) {
    isRight = true
  } else {
    isRight = false
  }
}

function writeAnswerToFirebase() {
  answerSubmited = true;

  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = Math.round(timeSpentOnPage)
  //timeSpentOnPage = timeSpentOnPage.toFixed(1);

  var questionSolvedInThisSession = localStorage.getItem("numQSolved");
  questionSolvedInThisSession += 1
  localStorage.setItem("numQSolved", questionSolvedInThisSession);

  if (isFillInTheBlank) {
    writeFillInTheBlankToFirebase(timeSpentOnPage)
  } else {
    writeMultipleChoiceToFirebase(timeSpentOnPage)
  }
}

function writeMultipleChoiceToFirebase(timeSpentOnPage) {
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + questionID).update({
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

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function writeFillInTheBlankToFirebase(timeSpentOnPage) {
  let userAnswers = getUserAnswers();
  let results = checkAnswer(userAnswers)
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + questionID).update({
    timeSpent: timeSpentOnPage,
    answer: userAnswers,
    isRight: results
  }, function(error) {
    if (error) {
      showFillInTheBlankAnswers(results, userAnswers)
    } else {
      showFillInTheBlankAnswers(results, userAnswers)
    }
  });
}

function showFillInTheBlankAnswers(results, userAnswers) {
  let inputs = $(".input")
  for (var i = 0; i< results.length; i++) {
    if (results[i] != true) {
      console.log("wrong")
      inputs[i].style.backgroundColor = "red";
      inputs[i].style.color = "white"
    } else {
      inputs[i].style.backgroundColor = "green";
      inputs[i].style.color = "white"
    }
  }

  var rightAnswers = study_contents[chapterName][smallChapter][questionID]["answer"] // array
  const p = document.createElement("p");
  p.innerHTML = "Answers: " + rightAnswers
  p.classList.add("correctAnswer");

  let inputDiv = $(".inputDiv")[i]
  answerBtnDiv.appendChild(p);
  answerBtnDiv.insertBefore(p, submitBtn);

  submitBtn.style.display = "none"
  nextBtn.style.display = "inline-block"
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
  localStorage.setItem("chapterNum", chapterNum)
  localStorage.setItem("smallChapterNum", smallChapterNum)
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
    if (questionCount == 2) {
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
    if (questionCount == 5) {
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
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + questionID).update({
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
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + chapterNum + '/'  + smallChapterNum).update({
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
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + contentsID).update({
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

function showAvailable() {
  writeJumpOpen()
  if (chapterNumText == "1") {
    moveToModalSingleVar.style.display = "inline-block"
    moveToModalTwoVar.style.display = "none"
  } else if (chapterNumText == "2") {
    moveToModalTwoVar.style.display = "inline-block"
  }
}

function closeShowAvailable() {
  if (chapterNumText == "1") {
    moveToModalSingleVar.style.display = "none"
  } else if (chapterNumText == "2") {
    moveToModalTwoVar.style.display = "none"
  }
}

/////////////// CHECK ANSWER ////////////////
function checkAnswer(userAnswers) {
  var results = []
  for (var i = 0; i<userAnswers.length; i++) {
    let answerWithOutSpace = handleBlankSpace(userAnswers[i]) //true or false
    const isRight = checkMatch(answerWithOutSpace, i)
    results.push(isRight)
  }
  return results
}

function getUserAnswers() {
  var answers =[];
  $(".input").each(function(){
    answers.push(this.value)
  });
  return answers
}

function handleBlankSpace(userAnswer) {
  var answer = "";
  for (var m=0; m<userAnswer.length; m++) {
    answer += userAnswer[m];
  }
  answer = answer.replace(/\s/g, "");
  return answer
}

function checkMatch(userAnswerStr, i){
  var rightAnswers = study_contents[chapterName][smallChapter][questionID]["answer"] // array
  var rightAnswerStr = handleBlankSpace(rightAnswers[i])

  //compare
  var right = false;
  if (userAnswerStr == rightAnswerStr) {
    right = true
  } else {
    right = false
  }

  return right
}

function moveToSingelVarAddition() {
  let url ="study.html?" + "1|0|0|1";
  writeJumpToFirebase("moveToSingelVarAddition", url)
}

function moveToSingelVarSubtraction() {
  let url = "study.html?" + "1|1|0|1";
  writeJumpToFirebase("moveToSingelVarSubtraction", url)
}

function moveToTwoVarGraph() {
  let url ="study.html?" + "2|0|0|1";
  writeJumpToFirebase("moveToTwoVarGraph", url)
}

function moveToTwoVarSubstitution() {
  let url = "study.html?" + "2|1|0|1";
  writeJumpToFirebase("moveToTwoVarSubstitution", url)
}

function writeJumpOpen() {
  var id = "_"
  let questionCheck = concept.substring(0, 2);
  if (questionCheck == "Q_") { // QUESTION
    id = questionID
  } else {
    id = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum
  }
  console.log("id is", id)
  var now = new Date().toLocaleString();
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + id + '/jumpToOpen').update({
    jumpBtnOpen: true,
    jumpBtnOpenTime: now
  }, function(error) {
    if (error) {
    } else {
    }
  });
}

function writeJumpToFirebase(jumpTo, url) {
  var id = "_"
  let questionCheck = concept.substring(0, 2);
  if (questionCheck == "Q_") { // QUESTION
    id = questionID
  } else {
    id = "C_" + chapterNum + "_" + smallChapterNum + "_" + conceptNum
  }

  var now = new Date().toLocaleString();
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + id + '/jumpTo').update({
    jumpTo: jumpTo,
    jumpTime: now
  }, function(error) {
    if (error) {
      window.location.href = url
    } else {
      window.location.href = url
    }
  });
}
