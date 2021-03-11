//Prepare UUID
var uuid = "";

var queryString = location.search.substring(1);
var data = queryString.split("|");
var onboardingNum = data[0];

var city = "undefined";
var country = "undefined";
var timeZone;

var button = "";
const intro = document.getElementById("intro");
const introContentsContainer = document.getElementById("intro-contents");
const text1 = document.getElementById("intro-text");
const button1 = document.getElementById("btn-1");
const button2 = document.getElementById("btn-2");
const button3 = document.getElementById("btn-3");
const button4 = document.getElementById("btn-4");
const button5 = document.getElementById("btn-5");
// const button6 = document.getElementById("btn-6");
// const introText = document.getElementById("intro-text");
// const introBtns = document.getElementById("intro-btns");
// const arrowDiv = document.getElementById("intro-arrow");
// const arrowImage = document.getElementById("arrow-image");
// const btnText1 = document.getElementById("btn-text1");
// const btnText2 = document.getElementById("btn-text2");
// const btnContainer = document.getElementById("continue-button");
// const continueBtn = document.getElementById("intro-continue-btn");

$(".btn-1")[0].addEventListener("click", writeBtn1ToFirebaseAndMoveOn);
$(".btn-2")[0].addEventListener("click", writeBtn2ToFirebaseAndMoveOn);
$(".btn-3")[0].addEventListener("click", writeBtn3ToFirebaseAndMoveOn);
$(".btn-4")[0].addEventListener("click", writeBtn4ToFirebaseAndMoveOn);
$(".btn-5")[0].addEventListener("click", writeBtn5ToFirebaseAndMoveOn);

var dataExist = false;
var is_mobile = false;
var dateAndTime;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create youtube player
// var player;
// const width = "630.0";
// const height = "354.0";

var screenWidth = screen.width;
//document.body.style.backgroundSize = "cover";
//document.body.style.backgroundRepeat = "no-repeat";

if(screenWidth < 480) { //mobile
  // intro.style.textAlign = "center";
  // introContentsContainer.style.position = "relative";
  //
  // //document.body.style.backgroundImage = "url('images/firstpage_test14_mobile.jpg')";
  // introText.style.fontSize = "80px";
  // introText.style.textAlign = "center";
  // introText.innerHTML = "Find out what Theo's AI can do for your Math:"
  // introText.style.marginTop = "200px";
  //
  // introBtns.style.margin = "auto 0";
  // arrowDiv.style.marginTop = "120px";
  // arrowDiv.style.marginBottom = "120px";
  // arrowImage.style.height = "45px";
  //
  // continueBtn.classList.remove("col-md-8");
  // continueBtn.classList.add("col-md-12");
  // continueBtn.style.height = "140px";
  // continueBtn.style.fontSize = "50px";
  is_mobile = true;
} else {
  //document.body.style.backgroundImage = "url('images/firstpage_test11.jpg')";
  //document.body.style.backgroundPosition = "center center";
  is_mobile = false;
}

prepareView();

function prepareView() {
  // const prevAnswer = localStorage.getItem("subject");
  // let subject = getSubjectName(prevAnswer)
  // const struggle = localStorage.getItem("struggle
  if (onboardingNum == 0 || onboardingNum == undefined || onboardingNum == "undefined") {
    onboardingNum = 0
    const image = document.createElement("img");
    let source = "images/intro1.png"
    image.src = source;
    image.classList.add("image");
    text1.appendChild(image);

    button1.innerHTML = "Between A- and A+ (or above 90)"
    button2.innerHTML = "Between B- and B+ (or between 80-89)"
    button3.innerHTML = "Between C- and C+ (or between 60-79)"
    button4.innerHTML = "Between D- and D+ (or between 30-59)"
    button5.innerHTML = "F (or between 0-29)"

  }
  // else if (onboardingNum == 1) {
  //   const image = document.createElement("img");
  //   let source = "images/intro2.png"
  //   image.src = source;
  //   image.classList.add("image");
  //   text1.appendChild(image);
  //
  //   button1.innerHTML = "Between A- and A+ (or above 90)"
  //   button2.innerHTML = "Between B- and B+ (or between 80-89)"
  //   button3.innerHTML = "Between C- and C+ (or between 70-79)"
  //   button4.innerHTML = "Between D- and D+ (or between 60-69)"
  //   button5.innerHTML = "F (or between 0-59)"
  // }
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
  getUUID();
  logVisit();
  handleRegisteredUser();
  timeZone = getTimeZone()
  dateAndTime = new Date().toString();
  getLocation(dateAndTime)
});

function getUUID() {
  if (localStorage.getItem("uuid") === null) {
    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
  } else {
    uuid = localStorage.getItem("uuid")
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getLocation(dateAndTime) {
  jQuery.get("http://ipinfo.io", function(response) {
      city = response.city;
      country = response.country;
  }, "jsonp");
}

function getTimeZone() {
  if (Intl.DateTimeFormat().resolvedOptions().timeZone != undefined) {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } else {
    return "undefined";
  }
}

function handleRegisteredUser() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) { // already a user. Show curriculum.
      console.log("is a user")
      userId = firebase.auth().currentUser.uid;
      signInAndOut.innerHTML = "Sign Out";
      signInAndOut.href = "signInAndOut.html?" + userId + "|1"; // 어차피 아랫줄에서 curriculum으로 넘어감.
      // window.location.href="customCurriculum.html?" + userId;
    } else {
      console.log("not a user")
      //loadYoutube();
    }
  })
}

function writeContinueButtonClick() {
  button = "continue"
  writeDataAndMoveOn()
}

// function writeTestButtonClick() {
//   button = "quiz/test"
//   localStorage.setItem("goal", "test")
//   writeDataAndMoveOn()
// }
//
// function writeSelfStudyButtonClick() {
//   button = "self study"
//   localStorage.setItem("goal", "seflstudy")
//   writeDataAndMoveOn()
// }

function writeLearnMoreClick() {
  button = "Learn More"
  writeDataAndMoveOn()
}

// function showPage() {
//   intro.style.display = "block";
//   startBtn.style.display = "block";
// }


//Handle button tap
// $(".start-btn")[0].addEventListener("click", function() {
//     writeDataAndMoveOn()
// });

function logVisit() {
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/' + 'visit').update({
    cohort: "MarketTest 2.0"
  }, function(error) {
    if (error) {
    } else {
    }
  });
}

function present(){
  // if (onboardingNum != 1 ) {
  //   window.location.href="index.html?1";
  // } else if (onboardingNum == 1) {
  //   window.location.href="html/whatDoYouWannaStudy.html";
  // }
  window.location.href="html/whatDoYouWannaStudy.html";
}

function writeBtn1ToFirebaseAndMoveOn() {
  writeToFirebaseAndMoveOn(uuid, 1);
}
function writeBtn2ToFirebaseAndMoveOn() {
  writeToFirebaseAndMoveOn(uuid, 2);
}
function writeBtn3ToFirebaseAndMoveOn() {
  writeToFirebaseAndMoveOn(uuid, 3);
}
function writeBtn4ToFirebaseAndMoveOn() {
  writeToFirebaseAndMoveOn(uuid, 4);
}
function writeBtn5ToFirebaseAndMoveOn() {
  writeToFirebaseAndMoveOn(uuid, 5);
}

function storeAnswer(num, answer) {
  if (num == 0) {
    localStorage.setItem("grade", answer);
    localStorage.setItem("original-grade", answer);
  } else if (num == 1) {
    localStorage.setItem("prev-grade", answer);
  } else if (num == 2){
  }
}

function writeToFirebaseAndMoveOn(userId, answer) {
  var innerHTML = ""
  if (answer == 1) {
    storeAnswer(onboardingNum, "A")
    innerHTML = button1.innerHTML
  } else if (answer == 2) {
    storeAnswer(onboardingNum, "B")
    innerHTML = button2.innerHTML
  } else if (answer == 3) {
    storeAnswer(onboardingNum, "C")
    innerHTML = button3.innerHTML
  } else if (answer == 4) {
    storeAnswer(onboardingNum, "D")
    innerHTML = button4.innerHTML
  } else if (answer == 5) {
    storeAnswer(onboardingNum, "F")
    innerHTML = button5.innerHTML // E
  }
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();

  if (onboardingNum != "1" && onboardingNum != "2") {
    console.log("onboardingNum is", onboardingNum)
    firebase.database().ref('mvp_1_3/' + 'users/' + userId + '/onboarding/' + onboardingNum).update({
      timeSpent: timeSpentOnPage,
      answer: answer + ' : ' + innerHTML,
      dateAndTime : dateAndTime,
      timeZone : timeZone,
      county: country,
      city: city,
      isMobile: is_mobile
    }, function(error) {
      if (error) {
        present()
      } else {
        present()
      }
    });
  } else {
    firebase.database().ref('mvp_1_3/' + 'users/' + userId + '/onboarding/' + onboardingNum).update({
      timeSpent: timeSpentOnPage,
      question : text1.innerHTML,
      answer: answer + ' : ' + innerHTML
    }, function(error) {
      if (error) {
        present()
      } else {
        present()
      }
    });
  }
}


// function loadYoutube() {
//   var tag = document.createElement('script');
//   tag.src = "https://www.youtube.com/iframe_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// }
//
// function onYouTubePlayerAPIReady() {
//   if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
//     loadYoutube()
//     window.onYouTubePlayerAPIReady = function() {
//       onYoutubePlayer('U-nPd0UWU-w')
//     };
//   } else {
//     onYoutubePlayer('U-nPd0UWU-w')
//   }
// }

// function onYoutubePlayer(videoID) {
//   player = new YT.Player('lecture-video', {
//     width: width,
//     height: height,
//     videoId: videoID,
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     },
//     playerVars: { // documentation: https://developers.google.com/youtube/player_parameters#rel
//       autoplay : 0,
//       rel: 0,
//       showinfo: 1,
//       modestbranding: 0,
//       ecver: 2
//     }
//   });
// }

// function onPlayerReady(event) {
//   event.target.playVideo();
// }
//
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.ENDED) {
//     document.getElementById('video-proceed-btn').disabled = false;
//   }
// }
