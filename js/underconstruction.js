
// Prepare data
const queryString = location.search.substring(1);
const data = queryString.split("|");

const theoLink = document.getElementById("brand-link");
const signInAndOut = document.getElementById("signInAndOut");

const comments = document.getElementById("comments");

var uuid;

getUUID()
function getUUID() {
  if (localStorage.getItem("uuid") === null) {
    uuid = uuidv4()
    localStorage.setItem("uuid", uuid)
  } else {
    uuid = localStorage.getItem("uuid")
  }
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
$(".comments-submit-btn")[0].addEventListener("click", submit);


function submit() {
  var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
  const input = comments.value
  firebase.database().ref('mvp_1_3/' + 'users/' + uuid + '/under construction comments').update({
    timeSpent: timeSpentOnPage,
    comments: input
  }, function(error) {
    if (error) {
      moveOn()
    } else {
      moveOn()
    }
  });
}

function moveOn() {
  alert("Thank you for submission. We will get back to you asap!");
}
