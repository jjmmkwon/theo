//Prepare data
let queryString = location.search.substring(1);
let data = queryString.split("|");

var uuid;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(".next-btn")[0].addEventListener("click", writeToFirebaseAndMoveOn);

getUUID()

function getUUID() {
  if (localStorage.getItem("uuid") === null) {
    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
  } else {
    uuid = localStorage.getItem("uuid")
  }
}

function writeToFirebaseAndMoveOn() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  timeSpentOnPage = timeSpentOnPage.toFixed(1);
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/tutor-intro').update({
    timeSpent: timeSpentOnPage
  }, function(error) {
    if (error) {
      moveOn()
    } else {
      moveOn()
    }
  });
}

function moveOn() {
  window.location.href="whatDoYouWannaStudy.html";
}
