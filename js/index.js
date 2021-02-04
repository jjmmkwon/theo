//Prepare UUID
var uuid = "";

var button = "";
const intro = document.getElementById("intro");
const introContentsContainer = document.getElementById("intro-contents");
const introText = document.getElementById("intro-text");
const introBtns = document.getElementById("intro-btns");
const btnText1 = document.getElementById("btn-text1");
const btnText2 = document.getElementById("btn-text2");
const startBtn = document.getElementById("start-btn-container");

$(".intro-continue-btn")[0].addEventListener("click", writeContinueButtonClick);
// $(".intro-goal1-btn")[0].addEventListener("click", writeTestButtonClick);
// $(".intro-goal2-btn")[0].addEventListener("click", writeSelfStudyButtonClick);

var dataExist = false;
var is_mobile = false;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create youtube player
// var player;
// const width = "630.0";
// const height = "354.0";

var screenWidth = screen.width;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

if(screenWidth < 480) {
  intro.style.textAlign = "center";
  introContentsContainer.style.position = "relative";

  document.body.style.backgroundImage = "url('images/firstpage_test14_mobile.jpg')";
  introText.style.fontSize = "70px";
  introText.style.textAlign = "center";
  introText.innerHTML = "Find out how Theo can help you with Math <br><br>I need help with:"
  introText.style.marginTop = "150px";

  introBtns.style.margin = "auto 0";
  btnText1.style.fontSize = "40px";
  btnText2.style.fontSize = "40px";
} else {
  document.body.style.backgroundImage = "url('images/firstpage_test11.jpg')";
  document.body.style.backgroundPosition = "center center";
}

$(document).ready(function() {
  getUUID();
  handleRegisteredUser();
  logIndexVisit()
  if( $('#for-mobile-detecttion').css('display')=='none') {
    is_mobile = true;
  }
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

function logIndexVisit() {
  firebase.database().ref('users/' + uuid + '/' + 'index').update({
    visit: true
  }, function(error) {
    if (error) {
    }
  });
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

async function writeDataAndMoveOn() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  firebase.database().ref('users/' + uuid + '/' + 'index').update({
    timeSpent: timeSpentOnPage,
    cohort: "MarketTest 1.0",
    button: button,
    isMobile: is_mobile
  }, function(error) {
    if (error) {
      present()
    } else {
      present()
    }
  });
}

function present(){
  window.location.href="../main/html/onboarding.html?" + uuid + "|0";
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
