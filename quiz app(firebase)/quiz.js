
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBQ84Ovw9nJymhmsTDmbgaWALacsc7Hld0",
  authDomain: "quizapp-ea135.firebaseapp.com",
  projectId: "quizapp-ea135",
  storageBucket: "quizapp-ea135.appspot.com",
  messagingSenderId: "783850293864",
  appId: "1:783850293864:web:82feea4c84048c6ebf09dd"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
var DATABASE = getDatabase(app);
var arr = []
var Start = document.getElementById("Start")
var timer = document.getElementById("timer")
var time = 30;
var interval;

var questions = document.getElementById("questions")
var options = document.getElementById("options")
var questionIndex = 0;
var score = 0;
var totalScore = 0;
var scoreHtml = document.getElementById("scoreHtml")
var isStart = false


function nextQuestion() {
  questionIndex++;
  renderData();
}
window.checkAnswer = function (userAnswer, answer) {
  // console.log(userAnswer)
  // console.log(answer)
  if (userAnswer == answer) {
    // console.log("correct answer")
    score++;
    scoreHtml.innerHTML = "SCORE : 5/" + score
  } else if (questionIndex == 4) {
    questions.innerHTML = ""
    options.innerHTML = ""
    timer.innerHTML = ""
    Start.innerHTML = ""
  }
  else {
    console.log("wrongAnswer")
  }
  totalScore++
  nextQuestion();
  // console.log(score)

}

window.start = function () {
  isStart = true
  Start.innerHTML = ""
  interval = setInterval(startTimer, 1000)
  // list.innerHTML = "";
  var reference = ref(DATABASE, `quizs`);
  onChildAdded(reference, function (data) {
    if (data) {
      arr.push(data.val());
      // console.log(data.val())
      renderData()
    }
  });

  console.log(arr)

}
function renderData() {

  if (isStart && questionIndex < arr.length) {

    questions.innerHTML = arr[questionIndex].quiz
    options.innerHTML = ""
    options.innerHTML += `<div class = "col-md-6">
            <button onclick="checkAnswer('${arr[questionIndex].option1}','${arr[questionIndex].correctAnswer}')" class = "btn rounded shadow-lg px-5 py-2 mt-5">
            ${arr[questionIndex].option1}
            </button>
            </div>
            <div>
            <button onclick="checkAnswer('${arr[questionIndex].option2}','${arr[questionIndex].correctAnswer}')" class = "btn rounded shadow-lg px-5 py-2 mt-5">
            ${arr[questionIndex].option2}
            </button>
            </div>
            <div>
            <button onclick="checkAnswer('${arr[questionIndex].option3}','${arr[questionIndex].correctAnswer}')" class = "btn rounded shadow-lg px-5 py-2 mt-5">
            ${arr[questionIndex].option3}
            </button>
            </div>
            <div>
            <button onclick="checkAnswer('${arr[questionIndex].option4}','${arr[questionIndex].correctAnswer}')" class = "btn rounded shadow-lg px-5 py-2 mt-5">
            ${arr[questionIndex].option4}
            </button>
            </div>`
  }
}
function startTimer() {
  Start.style.display = "none"
  time--;
  timer.innerHTML = time
  if (time == 0) {
    clearInterval(interval)
    timer.innerHTML = ""
    timer = "";
    options.innerHTML = ""
    questions.innerHTML = ""
    options.innerHTML = ""
  }
  else if (totalScore == 5) {
    timer.innerHTML = ""
    Start.style.display = "none"
    questions.innerHTML = ""
    options.innerHTML = ""
  }
}



